const pool = require("../db");
const { getResumeData } = require("../services/resumeData");

async function getEngine() {
  return import("../../src/utils/atsEngine.js");
}

async function analyzeATS(req, res, next) {
  try {
    const resumeData = req.body.resumeData;
    if (!resumeData) return res.status(400).json({ success: false, error: "Resume data is required." });
    const { analyzeResumeATS } = await getEngine();
    const result = analyzeResumeATS(resumeData);
    const resumeId = Number(req.body.resumeId);
    if (Number.isSafeInteger(resumeId) && resumeId > 0) {
      const [owner] = await pool.execute("SELECT id FROM resumes WHERE id = ? AND user_id = ?", [resumeId, req.user.id]);
      if (owner.length) await pool.execute("INSERT INTO ats_analyses (resume_id, overall_score, grade, result) VALUES (?, ?, ?, ?)", [resumeId, result.overallScore || 0, result.grade || null, JSON.stringify(result)]);
    }
    res.json(result);
  } catch (error) { next(error); }
}

async function matchJobDescription(req, res, next) {
  try {
    const { jobDescription, resumeData } = req.body;
    if (!jobDescription?.trim() || !resumeData) return res.status(400).json({ success: false, error: "Job description and resume data are required." });
    const { analyzeJobDescription } = await getEngine();
    const result = analyzeJobDescription(jobDescription, resumeData);
    const resumeId = Number(req.body.resumeId);
    if (Number.isSafeInteger(resumeId) && resumeId > 0) {
      const [owner] = await pool.execute("SELECT id FROM resumes WHERE id = ? AND user_id = ?", [resumeId, req.user.id]);
      if (owner.length) await pool.execute("INSERT INTO job_description_analyses (resume_id, job_title, job_description, match_percentage, result) VALUES (?, ?, ?, ?, ?)", [resumeId, req.body.jobTitle || null, jobDescription, result.matchPercentage || 0, JSON.stringify(result)]);
    }
    res.json(result);
  } catch (error) { next(error); }
}

module.exports = { analyzeATS, matchJobDescription };
