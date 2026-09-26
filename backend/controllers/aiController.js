async function generate(instructions, input) {
  const key = process.env.OPENAI_API_KEY;
  if (!key || key === "YOUR_OPENAI_API_KEY") return null;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      messages: [
        { role: "system", content: instructions },
        { role: "user", content: input },
      ],
      max_tokens: 400,
      temperature: 0.7,
    }),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body?.error?.message || `OpenAI returned ${response.status}`);
  return body.choices?.[0]?.message?.content?.trim() || null;
}

async function respond(prompt, req, res, fallback) {
  try {
    const improved = await generate(prompt.instructions, prompt.input);
    if (improved) return res.json({ improved, source: "ai", note: "Review and edit before applying." });
  } catch (error) {
    console.warn("OpenAI resume improvement failed:", error.message);
  }
  res.json({ improved: fallback, source: "rule-based", note: "AI is enabled when OPENAI_API_KEY is configured on the backend." });
}

async function improveSummary(req, res) {
  const { summary = "", role, skills } = req.body;
  if (!summary.trim()) return res.status(400).json({ success: false, error: "Please provide an initial summary to improve." });
  let fallback = summary.trim();
  if (!fallback.endsWith(".")) fallback += ".";
  return respond({
    instructions: "Improve a resume summary for ATS readability. Never invent experience, skills, or degrees. Keep it to 2 to 4 concise sentences. Output only the improved paragraph.",
    input: `Target role: ${role || "Software Engineer"}\nSkills: ${skills || ""}\nCurrent summary: ${summary}`,
  }, req, res, fallback);
}

async function improveBulletPoint(req, res) {
  const { bullet = "", context = "" } = req.body;
  if (!bullet.trim()) return res.status(400).json({ success: false, error: "Bullet point text is required." });
  let fallback = bullet.trim();
  if (/^(worked on|responsible for|helped with)\s*/i.test(fallback)) fallback = fallback.replace(/^(worked on|responsible for|helped with)\s*/i, "Developed ");
  if (!/[.!?]$/.test(fallback)) fallback += ".";
  return respond({
    instructions: "Improve a resume bullet with a strong action verb. Do not invent facts or statistics. Keep it to 1 or 2 concise lines and output only the bullet text without a bullet symbol.",
    input: `Context: ${context}\nOriginal bullet: ${bullet}`,
  }, req, res, fallback);
}

async function improveProjectDescription(req, res) {
  const { description = "", projectName = "", techStack = "" } = req.body;
  if (!description.trim()) return res.status(400).json({ success: false, error: "Project description is required." });
  return respond({
    instructions: "Improve a technical resume project description. Do not invent features or capabilities. Keep it under 60 words and output only the description.",
    input: `Project: ${projectName}\nTechnologies: ${techStack}\nDescription: ${description}`,
  }, req, res, description.trim());
}

async function generateTemplateLayout(req, res) {
  const { resumeData = {}, targetRole = "" } = req.body;

  const personal = resumeData.personal || {};
  const hasPhoto = Boolean(personal.photo && personal.photo.trim().length > 0);
  const expList = Array.isArray(resumeData.experience) ? resumeData.experience : [];
  const eduList = Array.isArray(resumeData.education) ? resumeData.education : [];
  const projList = Array.isArray(resumeData.projects) ? resumeData.projects : [];
  
  const roleText = (targetRole || personal.title || "").toLowerCase();
  const isStudentOrFresher = expList.length <= 1 || /student|intern|fresher|graduate|mca|btech|entry/i.test(roleText);

  let templateId = 'classic';
  let templateName = 'Classic ATS Single-Column';
  let sectionOrder = ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'achievements', 'languages', 'custom'];
  let rationale = '';
  let atsScoreEstimate = 98;
  let highlights = [];

  if (hasPhoto) {
    templateId = 'photo';
    templateName = 'Profile Photo Template';
    sectionOrder = isStudentOrFresher
      ? ['summary', 'education', 'skills', 'projects', 'certifications', 'experience', 'achievements', 'languages', 'custom']
      : ['summary', 'skills', 'experience', 'projects', 'education', 'certifications', 'achievements', 'languages', 'custom'];
    rationale = `Detected student profile picture. Selected Profile Photo layout with high-impact single-column hierarchy for maximum recruiter engagement.`;
    atsScoreEstimate = 94;
    highlights = ['Circular photo header', 'Clean semantic hierarchy', 'Education & project highlights'];
  } else if (isStudentOrFresher) {
    templateId = 'student';
    templateName = 'Student & Intern Special';
    sectionOrder = ['summary', 'education', 'skills', 'projects', 'certifications', 'experience', 'achievements', 'languages', 'custom'];
    rationale = `Detected entry-level/student profile. Prioritizing academic degrees, coursework, skills, and technical projects to ensure ATS algorithms find key competencies first.`;
    atsScoreEstimate = 97;
    highlights = ['Education & GPA prioritized', 'Coursework & tech stack callout', 'GitHub & project repository links'];
  } else if (/frontend|full.?stack|devops|react|cloud|ui/i.test(roleText)) {
    templateId = 'modern';
    templateName = 'Modern Tech Stack';
    sectionOrder = ['summary', 'skills', 'projects', 'experience', 'education', 'certifications', 'achievements', 'languages', 'custom'];
    rationale = `Tailored for tech & engineering roles. Structured with high-density skill tags and project bullet points favored by technical recruiters.`;
    atsScoreEstimate = 96;
    highlights = ['Categorized technical skills', 'Project impact bullets', 'Modern developer layout'];
  } else if (/lead|manager|consultant|architect|director/i.test(roleText) || expList.length >= 3) {
    templateId = 'professional';
    templateName = 'Corporate Executive';
    sectionOrder = ['summary', 'experience', 'skills', 'projects', 'education', 'certifications', 'achievements', 'languages', 'custom'];
    rationale = `Engineered for established industry professionals with deep work experience and corporate milestones.`;
    atsScoreEstimate = 98;
    highlights = ['Prominent company & role hierarchy', 'Action-oriented achievement bullets', 'Enterprise ATS compatibility'];
  } else if (/backend|data|qa|systems|python|java|database/i.test(roleText)) {
    templateId = 'minimal';
    templateName = 'Clean Minimalist';
    sectionOrder = ['summary', 'skills', 'experience', 'projects', 'education', 'certifications', 'achievements', 'languages', 'custom'];
    rationale = `High-density linear formatting designed for backend, data, and systems engineers to ensure fast automated parsing.`;
    atsScoreEstimate = 98;
    highlights = ['Zero decorative clutter', 'Rapid 6-second recruiter scanning', 'Maximum content density'];
  } else {
    templateId = 'classic';
    templateName = 'Classic ATS Single-Column';
    sectionOrder = ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'achievements', 'languages', 'custom'];
    rationale = `Standard universal layout compliant with all applicant tracking engines across Fortune 500 and enterprise firms.`;
    atsScoreEstimate = 99;
    highlights = ['100% ATS parser safe', 'Universal typography', 'Clean chronological ordering'];
  }

  // Attempt OpenAI enrichment if available
  try {
    const aiPrompt = `Analyze this candidate profile for resume layout selection:
Target Role: ${targetRole || personal.title || 'Software Developer'}
Has Photo: ${hasPhoto}
Student/Fresher: ${isStudentOrFresher}
Experience count: ${expList.length}
Education count: ${eduList.length}
Projects count: ${projList.length}
Recommended Template: ${templateId}

In 2 short sentences, explain why this layout and section ordering gives this candidate the highest competitive advantage for recruiters and ATS.`;

    const aiExplanation = await generate(
      "You are a top technical recruiter and resume layout architect. Give concise, encouraging advice.",
      aiPrompt
    );

    if (aiExplanation) {
      rationale = aiExplanation;
    }
  } catch (err) {
    console.warn("AI layout reasoning failed:", err.message);
  }

  return res.json({
    success: true,
    templateId,
    templateName,
    sectionOrder,
    rationale,
    atsScoreEstimate,
    highlights,
    source: process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'YOUR_OPENAI_API_KEY' ? 'ai' : 'rule-based'
  });
}

module.exports = {
  improveSummary,
  improveBulletPoint,
  improveProjectDescription,
  generateTemplateLayout
};
