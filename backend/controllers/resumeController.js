const pool = require("../db");
const { emptyData, getResumeData, saveResumeData, getResumeRecord } = require("../services/resumeData");

const sections = {
  personal: "personal", summary: "summary", education: "education", experience: "experience", projects: "projects",
  skills: "skills", certifications: "certifications", achievements: "achievements", languages: "languages",
  "custom-sections": "customSections", "section-order": "sectionOrder",
};

async function ownedResume(resumeId, userId, connection = pool, lock = false) {
  const [rows] = await connection.execute(`SELECT id, user_id, title, template_id FROM resumes WHERE id = ? AND user_id = ? LIMIT 1${lock ? " FOR UPDATE" : ""}`, [resumeId, userId]);
  return rows[0] || null;
}

async function withTransaction(work) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await work(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

function parseId(value) {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

async function listResumes(req, res, next) {
  try {
    const [rows] = await pool.execute("SELECT id, user_id, title, template_id, created_at, updated_at FROM resumes WHERE user_id = ? ORDER BY updated_at DESC, id DESC", [req.user.id]);
    const resumes = await Promise.all(rows.map((row) => getResumeRecord(row.id)));
    res.json({ success: true, resumes });
  } catch (error) { next(error); }
}

async function getResume(req, res, next) {
  const id = parseId(req.params.id);
  if (!id) return res.status(404).json({ success: false, error: "Resume not found." });
  try {
    const row = await ownedResume(id, req.user.id);
    if (!row) return res.status(404).json({ success: false, error: "Resume not found." });
    res.json({ success: true, resume: await getResumeRecord(id) });
  } catch (error) { next(error); }
}

async function createResume(req, res, next) {
  const title = typeof req.body.title === "string" && req.body.title.trim() ? req.body.title.trim() : "Untitled Resume";
  const requestedTemplate = req.body.templateId || req.body.template_id;
  const templateId = typeof requestedTemplate === "string" && requestedTemplate.trim() ? requestedTemplate.trim() : "classic";
  if (title.length > 200 || templateId.length > 50) return res.status(400).json({ success: false, error: "Resume title or template is too long." });
  let data = req.body.resumeData;
  try {
    const id = await withTransaction(async (connection) => {
      if (!data || typeof data !== "object") {
        const [users] = await connection.execute("SELECT name, email FROM users WHERE id = ? LIMIT 1", [req.user.id]);
        data = emptyData({ fullName: users[0]?.name || "", email: users[0]?.email || "" });
      }
      const [result] = await connection.execute("INSERT INTO resumes (user_id, title, template_id) VALUES (?, ?, ?)", [req.user.id, title, templateId]);
      const resumeId = result.insertId;
      await saveResumeData(connection, resumeId, data);
      return resumeId;
    });
    res.status(201).json({ success: true, message: "Resume created successfully!", resume: await getResumeRecord(id) });
  } catch (error) { next(error); }
}

async function updateResume(req, res, next) {
  const id = parseId(req.params.id);
  if (!id) return res.status(404).json({ success: false, error: "Resume not found." });
  try {
    const exists = await ownedResume(id, req.user.id);
    if (!exists) return res.status(404).json({ success: false, error: "Resume not found." });
    await withTransaction(async (connection) => {
      const updates = [];
      const values = [];
      if (typeof req.body.title === "string") { updates.push("title = ?"); values.push(req.body.title.trim() || "Untitled Resume"); }
      const templateId = req.body.templateId ?? req.body.template_id;
      if (typeof templateId === "string") { updates.push("template_id = ?"); values.push(templateId); }
      if (updates.length) await connection.execute(`UPDATE resumes SET ${updates.join(", ")} WHERE id = ? AND user_id = ?`, [...values, id, req.user.id]);
      if (req.body.resumeData && typeof req.body.resumeData === "object") await saveResumeData(connection, id, req.body.resumeData);
      if (!updates.length && req.body.resumeData) await connection.execute("UPDATE resumes SET updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?", [id, req.user.id]);
    });
    res.json({ success: true, message: "Resume saved successfully!", resume: await getResumeRecord(id) });
  } catch (error) { next(error); }
}

async function deleteResume(req, res, next) {
  const id = parseId(req.params.id);
  if (!id) return res.status(404).json({ success: false, error: "Resume not found." });
  try {
    const [result] = await pool.execute("DELETE FROM resumes WHERE id = ? AND user_id = ?", [id, req.user.id]);
    if (!result.affectedRows) return res.status(404).json({ success: false, error: "Resume not found." });
    res.json({ success: true, message: "Resume deleted successfully." });
  } catch (error) { next(error); }
}

async function duplicateResume(req, res, next) {
  const id = parseId(req.params.id);
  if (!id) return res.status(404).json({ success: false, error: "Resume not found." });
  try {
    const duplicateId = await withTransaction(async (connection) => {
      const source = await ownedResume(id, req.user.id, connection, true);
      if (!source) return null;
      const data = await getResumeData(id, connection);
      const [result] = await connection.execute("INSERT INTO resumes (user_id, title, template_id) VALUES (?, ?, ?)", [req.user.id, `${source.title} (Copy)`, source.template_id]);
      await saveResumeData(connection, result.insertId, data);
      return result.insertId;
    });
    if (!duplicateId) return res.status(404).json({ success: false, error: "Resume not found." });
    res.status(201).json({ success: true, message: "Resume duplicated successfully!", resume: await getResumeRecord(duplicateId) });
  } catch (error) { next(error); }
}

async function getSection(req, res, next) {
  const id = parseId(req.params.id);
  const key = sections[req.params.section];
  if (!id || !key) return res.status(404).json({ success: false, error: "Resume section not found." });
  try {
    if (!(await ownedResume(id, req.user.id))) return res.status(404).json({ success: false, error: "Resume not found." });
    if (key === "skills") {
      const [rows] = await pool.execute("SELECT id, category, skill_name AS name FROM skills WHERE resume_id = ? ORDER BY id", [id]);
      return res.json(rows);
    }
    const data = await getResumeData(id);
    res.json(data[key]);
  } catch (error) { next(error); }
}

async function mutateSection(req, res, next) {
  const id = parseId(req.params.id);
  const key = sections[req.params.section];
  if (!id || !key) return res.status(404).json({ success: false, error: "Resume section not found." });
  try {
    const result = await withTransaction(async (connection) => {
      if (!(await ownedResume(id, req.user.id, connection, true))) return { missing: true };

      if (key === "skills") {
        const skillId = parseId(req.params.itemId);
        if (req.method === "PUT" && !req.params.itemId) {
          const list = Array.isArray(req.body) ? req.body : (req.body.skills || []);
          await connection.execute("DELETE FROM skills WHERE resume_id = ?", [id]);
          for (const skill of list) {
            const name = String(skill.name || skill.skill || "").trim();
            if (name) await connection.execute("INSERT INTO skills (resume_id, category, skill_name) VALUES (?, ?, ?)", [id, String(skill.category || "other"), name]);
          }
          await connection.execute("UPDATE resumes SET updated_at = CURRENT_TIMESTAMP WHERE id = ?", [id]);
          const [rows] = await connection.execute("SELECT id, category, skill_name AS name FROM skills WHERE resume_id = ? ORDER BY id", [id]);
          return { value: rows };
        }
        if (req.method === "POST") {
          const category = String(req.body.category || "other");
          const name = String(req.body.name || req.body.skill || "").trim();
          if (!name) return { status: 400, error: "Skill name is required." };
          const [insert] = await connection.execute("INSERT INTO skills (resume_id, category, skill_name) VALUES (?, ?, ?)", [id, category, name]);
          await connection.execute("UPDATE resumes SET updated_at = CURRENT_TIMESTAMP WHERE id = ?", [id]);
          return { value: { id: insert.insertId, category, name } };
        }
        if (req.method === "PUT" && skillId) {
          const name = String(req.body.name || req.body.skill || "").trim();
          const category = String(req.body.category || "other");
          const [updated] = await connection.execute("UPDATE skills SET category = ?, skill_name = ? WHERE id = ? AND resume_id = ?", [category, name, skillId, id]);
          if (updated.affectedRows) await connection.execute("UPDATE resumes SET updated_at = CURRENT_TIMESTAMP WHERE id = ?", [id]);
          return { missing: !updated.affectedRows, value: { id: skillId, category, name } };
        }
        if (req.method === "DELETE" && skillId) {
          const [deleted] = await connection.execute("DELETE FROM skills WHERE id = ? AND resume_id = ?", [skillId, id]);
          if (deleted.affectedRows) await connection.execute("UPDATE resumes SET updated_at = CURRENT_TIMESTAMP WHERE id = ?", [id]);
          return { missing: !deleted.affectedRows };
        }
      }

      const data = await getResumeData(id, connection);
      if (key === "sectionOrder") {
        data.sectionOrder = Array.isArray(req.body) ? req.body : (req.body.sectionOrder || []);
      } else if (key === "personal" || key === "summary") {
        data[key] = req.body[key] ?? req.body;
      } else if (Array.isArray(data[key])) {
        const items = data[key];
        if (req.method === "PUT" && !req.params.itemId) data[key] = Array.isArray(req.body) ? req.body : (req.body[key] || []);
        else if (req.method === "POST") data[key] = [...items, req.body];
        else {
          const index = items.findIndex((item) => String(item.id) === String(req.params.itemId));
          if (index < 0) return { missing: true };
          if (req.method === "DELETE") data[key] = items.filter((_, itemIndex) => itemIndex !== index);
          else if (req.method === "PUT") data[key] = items.map((item, itemIndex) => itemIndex === index ? { ...item, ...req.body } : item);
        }
      } else {
        return { status: 405, error: "This section does not support this operation." };
      }

      await saveResumeData(connection, id, data);
      await connection.execute("UPDATE resumes SET updated_at = CURRENT_TIMESTAMP WHERE id = ?", [id]);
      return { value: data[key] };
    });
    if (result.missing) return res.status(404).json({ success: false, error: "Resume or section item not found." });
    if (result.status) return res.status(result.status).json({ success: false, error: result.error });
    res.json({ success: true, value: result.value });
  } catch (error) { next(error); }
}

async function downloadAuthorizedResume(req, res, next) {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ success: false, error: "Valid resume ID is required." });

  try {
    const row = await ownedResume(id, req.user.id);
    if (!row) return res.status(404).json({ success: false, error: "Resume not found or access denied." });

    // Step 11: Backend Authorization Check - Must have verified SUCCESS payment of ₹99.00
    const [payments] = await pool.execute(
      "SELECT id FROM payments WHERE resume_id = ? AND user_id = ? AND status = 'SUCCESS' AND amount = 99.00 LIMIT 1",
      [id, req.user.id]
    );

    const isPaid = row.is_paid || payments.length > 0;

    if (!isPaid) {
      return res.status(403).json({
        success: false,
        error: "Payment required. You must pay ₹99 to unlock and download this resume.",
        paymentRequired: true,
        amount: 99.00,
      });
    }

    // Step 11: Authorization passed! Return resume data
    const record = await getResumeRecord(id);
    res.json({
      success: true,
      downloadAllowed: true,
      resume: record,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { listResumes, getResume, createResume, updateResume, deleteResume, duplicateResume, getSection, mutateSection, downloadAuthorizedResume };

