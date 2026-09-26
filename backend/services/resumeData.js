const pool = require("../db");

const DEFAULT_SECTION_ORDER = ["personal", "summary", "education", "experience", "projects", "skills", "certifications", "achievements", "languages", "custom"];
const emptyData = (personal = {}) => ({
  personal: { fullName: "", title: "", email: "", phone: "", location: "", linkedin: "", github: "", portfolio: "", ...personal },
  summary: "", education: [], experience: [], projects: [], skills: {}, certifications: [], achievements: [], languages: [], customSections: [], sectionOrder: DEFAULT_SECTION_ORDER,
});

function formatSqlDate(value) {
  if (!value) return "";
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function parseDateLabel(label) {
  if (!label || typeof label !== "string") return null;
  const text = label.trim();
  let match = /^(\d{4})$/.exec(text);
  if (match) return `${match[1]}-01-01`;
  match = /^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/.exec(text);
  if (match) return `${match[1]}-${match[2].padStart(2, "0")}-${(match[3] || "01").padStart(2, "0")}`;
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10);
}

function dateLabel(row, labelField, dateField) {
  if (row[labelField]) return row[labelField];
  const date = formatSqlDate(row[dateField]);
  return date ? (date.endsWith("-01-01") ? date.slice(0, 4) : date) : "";
}

async function query(connection, sql, params = []) {
  return connection.execute(sql, params);
}

async function getResumeData(resumeId, connection = pool) {
  const [personalRows] = await query(connection, "SELECT * FROM personal_information WHERE resume_id = ? LIMIT 1", [resumeId]);
  const [summaryRows] = await query(connection, "SELECT summary FROM professional_summaries WHERE resume_id = ? LIMIT 1", [resumeId]);
  const [educationRows] = await query(connection, "SELECT * FROM education WHERE resume_id = ? ORDER BY id", [resumeId]);
  const [experienceRows] = await query(connection, "SELECT * FROM experience WHERE resume_id = ? ORDER BY id", [resumeId]);
  const [projectRows] = await query(connection, "SELECT * FROM projects WHERE resume_id = ? ORDER BY id", [resumeId]);
  const [skillRows] = await query(connection, "SELECT * FROM skills WHERE resume_id = ? ORDER BY id", [resumeId]);
  const [certRows] = await query(connection, "SELECT * FROM certifications WHERE resume_id = ? ORDER BY id", [resumeId]);
  const [achievementRows] = await query(connection, "SELECT * FROM achievements WHERE resume_id = ? ORDER BY id", [resumeId]);
  const [languageRows] = await query(connection, "SELECT * FROM languages WHERE resume_id = ? ORDER BY id", [resumeId]);
  const [customRows] = await query(connection, "SELECT * FROM custom_sections WHERE resume_id = ? ORDER BY id", [resumeId]);
  const [orderRows] = await query(connection, "SELECT section_name FROM resume_section_order WHERE resume_id = ? ORDER BY display_order", [resumeId]);

  const experienceIds = experienceRows.map((row) => row.id);
  const projectIds = projectRows.map((row) => row.id);
  const experienceBullets = new Map();
  const projectBullets = new Map();
  const projectTechnologies = new Map();
  if (experienceIds.length) {
    const [rows] = await query(connection, `SELECT experience_id, bullet_text FROM experience_bullets WHERE experience_id IN (${experienceIds.map(() => "?").join(",")}) ORDER BY display_order, id`, experienceIds);
    for (const row of rows) experienceBullets.set(row.experience_id, [...(experienceBullets.get(row.experience_id) || []), row.bullet_text]);
  }
  if (projectIds.length) {
    const placeholders = projectIds.map(() => "?").join(",");
    const [[bullets], [technologies]] = await Promise.all([
      query(connection, `SELECT project_id, bullet_text FROM project_bullets WHERE project_id IN (${placeholders}) ORDER BY display_order, id`, projectIds),
      query(connection, `SELECT project_id, technology FROM project_technologies WHERE project_id IN (${placeholders}) ORDER BY id`, projectIds),
    ]);
    for (const row of bullets) projectBullets.set(row.project_id, [...(projectBullets.get(row.project_id) || []), row.bullet_text]);
    for (const row of technologies) projectTechnologies.set(row.project_id, [...(projectTechnologies.get(row.project_id) || []), row.technology]);
  }

  const personal = personalRows[0] ? {
    fullName: personalRows[0].full_name || "", title: personalRows[0].professional_title || "", email: personalRows[0].email || "",
    phone: personalRows[0].phone || "", location: personalRows[0].location || "", linkedin: personalRows[0].linkedin || "",
    github: personalRows[0].github || "", portfolio: personalRows[0].portfolio || "",
  } : {};
  const data = emptyData(personal);
  data.summary = summaryRows[0]?.summary || "";
  data.education = educationRows.map((row) => ({
    id: String(row.id), degree: row.degree || "", fieldOfStudy: row.field_of_study || "", institution: row.institution || "", location: row.location || "",
    startDate: dateLabel(row, "start_date_label", "start_date"), endDate: dateLabel(row, "end_date_label", "end_date"), isCurrent: Boolean(row.is_current),
    grade: row.grade || "", description: row.description || "",
  }));
  data.experience = experienceRows.map((row) => ({
    id: String(row.id), jobTitle: row.job_title || "", company: row.company || "", location: row.location || "", employmentType: row.employment_type || "",
    startDate: dateLabel(row, "start_date_label", "start_date"), endDate: row.is_current ? "" : dateLabel(row, "end_date_label", "end_date"), isCurrent: Boolean(row.is_current),
    bullets: experienceBullets.get(row.id) || [],
  }));
  data.projects = projectRows.map((row) => ({
    id: String(row.id), name: row.project_name || "", role: row.role || "", technologies: (projectTechnologies.get(row.id) || []).join(", "),
    githubUrl: row.github_url || "", liveUrl: row.project_url || "", description: row.description || "", bullets: projectBullets.get(row.id) || [],
  }));
  for (const row of skillRows) data.skills[row.category] = [...(data.skills[row.category] || []), row.skill_name];
  data.certifications = certRows.map((row) => ({
    id: String(row.id), name: row.certification_name || "", issuer: row.issuing_organization || "", date: dateLabel(row, "issue_date_label", "issue_date"),
    credentialId: row.credential_id || "", url: row.credential_url || "",
  }));
  data.achievements = achievementRows.map((row) => ({ id: String(row.id), title: row.title || "", description: row.description || "", date: row.achievement_date || "" }));
  data.languages = languageRows.map((row) => ({ id: String(row.id), language: row.language_name || "", proficiency: row.proficiency || "" }));
  data.customSections = customRows.map((row) => {
    let items;
    try { items = JSON.parse(row.content || "[]"); } catch { items = row.content ? [{ id: `${row.id}-item`, title: "", subtitle: "", date: "", description: row.content }] : []; }
    return { id: String(row.id), title: row.section_title || "", items: Array.isArray(items) ? items : [] };
  });
  if (orderRows.length) data.sectionOrder = orderRows.map((row) => row.section_name);
  return data;
}

async function insertMany(connection, sql, rows) {
  for (const values of rows) await query(connection, sql, values);
}

async function saveResumeData(connection, resumeId, input = {}) {
  const data = { ...emptyData(), ...(input || {}) };
  data.personal = { ...emptyData().personal, ...(input?.personal || {}) };
  const p = data.personal;
  await query(connection, `INSERT INTO personal_information (resume_id, full_name, professional_title, email, phone, location, linkedin, github, portfolio)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE full_name=VALUES(full_name), professional_title=VALUES(professional_title), email=VALUES(email), phone=VALUES(phone), location=VALUES(location), linkedin=VALUES(linkedin), github=VALUES(github), portfolio=VALUES(portfolio)`,
  [resumeId, p.fullName || "", p.title || "", p.email || "", p.phone || "", p.location || "", p.linkedin || "", p.github || "", p.portfolio || ""]);
  await query(connection, `INSERT INTO professional_summaries (resume_id, summary) VALUES (?, ?)
    ON DUPLICATE KEY UPDATE summary=VALUES(summary)`, [resumeId, data.summary || ""]);

  for (const table of ["education", "experience", "projects", "skills", "certifications", "achievements", "languages", "custom_sections", "resume_section_order"]) {
    await query(connection, `DELETE FROM ${table} WHERE resume_id = ?`, [resumeId]);
  }

  for (const item of data.education || []) {
    await query(connection, `INSERT INTO education (resume_id, degree, field_of_study, institution, location, start_date, end_date, start_date_label, end_date_label, is_current, grade, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [resumeId, item.degree || "", item.fieldOfStudy || "", item.institution || "", item.location || "", parseDateLabel(item.startDate), parseDateLabel(item.endDate), item.startDate || null, item.endDate || null, Boolean(item.isCurrent), item.grade || "", item.description || ""]);
  }
  for (const item of data.experience || []) {
    const [result] = await query(connection, `INSERT INTO experience (resume_id, job_title, company, location, employment_type, start_date, end_date, start_date_label, end_date_label, is_current)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [resumeId, item.jobTitle || "", item.company || "", item.location || "", item.employmentType || "", parseDateLabel(item.startDate), parseDateLabel(item.endDate), item.startDate || null, item.endDate || null, Boolean(item.isCurrent)]);
    await insertMany(connection, "INSERT INTO experience_bullets (experience_id, bullet_text, display_order) VALUES (?, ?, ?)", (item.bullets || []).map((text, index) => [result.insertId, String(text || ""), index]));
  }
  for (const item of data.projects || []) {
    const [result] = await query(connection, `INSERT INTO projects (resume_id, project_name, role, description, project_url, github_url)
      VALUES (?, ?, ?, ?, ?, ?)`, [resumeId, item.name || "", item.role || "", item.description || "", item.liveUrl || "", item.githubUrl || ""]);
    const technologies = Array.isArray(item.technologies) ? item.technologies : String(item.technologies || "").split(",");
    await insertMany(connection, "INSERT INTO project_technologies (project_id, technology) VALUES (?, ?)", technologies.map((technology) => [result.insertId, String(technology).trim()]).filter(([, technology]) => technology));
    await insertMany(connection, "INSERT INTO project_bullets (project_id, bullet_text, display_order) VALUES (?, ?, ?)", (item.bullets || []).map((text, index) => [result.insertId, String(text || ""), index]));
  }
  const skillRows = Object.entries(data.skills || {}).flatMap(([category, skills]) => (skills || []).map((skill) => [resumeId, category, String(skill)]));
  await insertMany(connection, "INSERT INTO skills (resume_id, category, skill_name) VALUES (?, ?, ?)", skillRows);
  for (const item of data.certifications || []) {
    await query(connection, `INSERT INTO certifications (resume_id, certification_name, issuing_organization, issue_date, issue_date_label, credential_id, credential_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)`, [resumeId, item.name || "", item.issuer || "", parseDateLabel(item.date), item.date || null, item.credentialId || "", item.url || ""]);
  }
  await insertMany(connection, "INSERT INTO achievements (resume_id, title, description, achievement_date) VALUES (?, ?, ?, ?)", (data.achievements || []).map((item) => [resumeId, item.title || "", item.description || "", item.date || null]));
  await insertMany(connection, "INSERT INTO languages (resume_id, language_name, proficiency) VALUES (?, ?, ?)", (data.languages || []).map((item) => [resumeId, item.language || "", item.proficiency || ""]));
  for (const section of data.customSections || []) {
    await query(connection, "INSERT INTO custom_sections (resume_id, section_title, content) VALUES (?, ?, ?)", [resumeId, section.title || "", JSON.stringify(section.items || [])]);
  }
  const order = Array.isArray(data.sectionOrder) ? data.sectionOrder : DEFAULT_SECTION_ORDER;
  await insertMany(connection, "INSERT INTO resume_section_order (resume_id, section_name, display_order) VALUES (?, ?, ?)", order.map((section, index) => [resumeId, section, index]));
}

async function getResumeRecord(resumeId, connection = pool) {
  const [rows] = await query(connection, "SELECT id, user_id, title, template_id, created_at, updated_at FROM resumes WHERE id = ? LIMIT 1", [resumeId]);
  if (!rows[0]) return null;
  return {
    id: rows[0].id,
    userId: rows[0].user_id,
    title: rows[0].title,
    templateId: rows[0].template_id,
    resumeData: await getResumeData(resumeId, connection),
    createdAt: rows[0].created_at,
    updatedAt: rows[0].updated_at,
  };
}

module.exports = { DEFAULT_SECTION_ORDER, emptyData, getResumeData, saveResumeData, getResumeRecord };
