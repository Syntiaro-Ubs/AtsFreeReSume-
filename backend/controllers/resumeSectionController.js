const pool = require("../db");
const { getResumeData, saveResumeData } = require("../services/resumeData");

const parseId = (value) => /^\d+$/.test(String(value)) && Number(value) > 0 ? Number(value) : null;

async function withOwnedResume(req, res, next, callback) {
  const resumeId = parseId(req.params.id);
  const itemId = parseId(req.params.itemId);
  if (!resumeId || !itemId) return res.status(404).json({ success: false, error: "Resume section not found." });
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [owned] = await connection.execute("SELECT id FROM resumes WHERE id = ? AND user_id = ? FOR UPDATE", [resumeId, req.user.id]);
    if (!owned[0]) {
      await connection.rollback();
      return res.status(404).json({ success: false, error: "Resume not found." });
    }
    const result = await callback(connection, resumeId, itemId);
    if (result?.missing) {
      await connection.rollback();
      return res.status(404).json({ success: false, error: "Resume section item not found." });
    }
    await connection.execute("UPDATE resumes SET updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?", [resumeId, req.user.id]);
    await connection.commit();
    res.json({ success: true, value: result?.value });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally { connection.release(); }
}

async function getBullets(req, res, next) {
  const resumeId = parseId(req.params.id);
  const itemId = parseId(req.params.itemId);
  const table = req.params.section === "experience" ? "experience" : req.params.section === "projects" ? "projects" : null;
  const bulletTable = table === "experience" ? "experience_bullets" : table === "projects" ? "project_bullets" : null;
  const foreignKey = table === "experience" ? "experience_id" : "project_id";
  if (!resumeId || !itemId || !table) return res.status(404).json({ success: false, error: "Resume section not found." });
  try {
    const [owner] = await pool.execute(`SELECT item.id FROM ${table} item INNER JOIN resumes r ON r.id = item.resume_id WHERE item.id = ? AND item.resume_id = ? AND r.user_id = ?`, [itemId, resumeId, req.user.id]);
    if (!owner.length) return res.status(404).json({ success: false, error: "Resume section item not found." });
    const [rows] = await pool.execute(`SELECT id, bullet_text AS text, display_order AS displayOrder FROM ${bulletTable} WHERE ${foreignKey} = ? ORDER BY display_order, id`, [itemId]);
    res.json(rows);
  } catch (error) { next(error); }
}

async function mutateBullet(req, res, next) {
  const section = req.params.section;
  if (section !== "experience" && section !== "projects") return res.status(404).json({ success: false, error: "Resume section not found." });
  const bulletTable = section === "experience" ? "experience_bullets" : "project_bullets";
  const foreignKey = section === "experience" ? "experience_id" : "project_id";
  const index = req.params.bulletIndex === undefined ? null : Number(req.params.bulletIndex);
  return withOwnedResume(req, res, next, async (connection, resumeId, itemId) => {
    const [parent] = await connection.execute(`SELECT id FROM ${section} WHERE id = ? AND resume_id = ?`, [itemId, resumeId]);
    if (!parent.length) return { missing: true };
    if (req.method === "POST") {
      const text = String(req.body.text ?? req.body.bullet ?? "");
      const [rows] = await connection.execute(`SELECT COALESCE(MAX(display_order), -1) + 1 AS nextOrder FROM ${bulletTable} WHERE ${foreignKey} = ?`, [itemId]);
      const [insert] = await connection.execute(`INSERT INTO ${bulletTable} (${foreignKey}, bullet_text, display_order) VALUES (?, ?, ?)`, [itemId, text, rows[0].nextOrder]);
      return { value: { id: insert.insertId, text, displayOrder: rows[0].nextOrder } };
    }
    const [rows] = await connection.execute(`SELECT id FROM ${bulletTable} WHERE ${foreignKey} = ? ORDER BY display_order, id`, [itemId]);
    if (!Number.isInteger(index) || index < 0 || index >= rows.length) return { missing: true };
    const bulletId = rows[index].id;
    if (req.method === "DELETE") {
      await connection.execute(`DELETE FROM ${bulletTable} WHERE id = ?`, [bulletId]);
      return { value: null };
    }
    if (req.method === "PUT") {
      const text = String(req.body.text ?? req.body.bullet ?? "");
      await connection.execute(`UPDATE ${bulletTable} SET bullet_text = ? WHERE id = ?`, [text, bulletId]);
      return { value: { id: bulletId, text, displayOrder: index } };
    }
    return { missing: true };
  });
}

module.exports = { getBullets, mutateBullet };
