const ACTION_VERBS = [
    'accelerated', 'achieved', 'administered', 'analyzed', 'architected', 'automated',
    'built', 'collaborated', 'constructed', 'coordinated', 'created', 'decreased',
    'delivered', 'deployed', 'designed', 'developed', 'devised', 'directed',
    'eliminated', 'engineered', 'enhanced', 'established', 'executed', 'expanded',
    'expedited', 'facilitated', 'formulated', 'generated', 'guided', 'implemented',
    'improved', 'increased', 'initiated', 'innovated', 'installed', 'instituted',
    'integrated', 'launched', 'led', 'managed', 'maximized', 'migrated', 'minimized',
    'modeled', 'negotiated', 'optimized', 'orchestrated', 'organized', 'overhauled',
    'pioneered', 'planned', 'produced', 'programmed', 'reduced', 'refactored',
    'resolved', 'restructured', 'revamped', 'scaled', 'simplified', 'spearheaded',
    'standardized', 'streamlined', 'strengthened', 'supervised', 'trained', 'transformed',
    'unified', 'upgraded', 'validated',
];
// Comprehensive dictionary of technical and professional keywords across software, data, cloud, and modern engineering
const RECOGNIZED_JOB_KEYWORDS = [
    // Programming Languages
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'c', 'php', 'ruby', 'go', 'golang', 'rust',
    'swift', 'kotlin', 'dart', 'r', 'scala', 'sql', 'html', 'html5', 'css', 'css3', 'bash', 'shell', 'powershell',
    // Frontend Frameworks & UI
    'react', 'react.js', 'react native', 'next.js', 'angular', 'vue', 'vue.js', 'nuxt.js', 'svelte',
    'tailwind', 'tailwind css', 'bootstrap', 'sass', 'scss', 'redux', 'zustand', 'mobx', 'vite', 'webpack',
    'jquery', 'material ui', 'chakra ui', 'responsive design', 'web development',
    // Backend & APIs
    'node', 'node.js', 'express', 'express.js', 'nest.js', 'nestjs', 'fastify', 'django', 'fastapi',
    'flask', 'spring', 'spring boot', 'asp.net', '.net', 'ruby on rails', 'laravel', 'rest', 'rest api',
    'restful', 'graphql', 'grpc', 'microservices', 'websockets', 'trpc', 'serverless',
    // Databases & Caching
    'mysql', 'postgresql', 'postgres', 'mongodb', 'redis', 'sqlite', 'oracle', 'dynamodb', 'cassandra',
    'elasticsearch', 'mariadb', 'prisma', 'typeorm', 'hibernate', 'mongoose', 'sql server',
    // Cloud & DevOps
    'aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s',
    'terraform', 'ansible', 'jenkins', 'ci/cd', 'github actions', 'gitlab ci', 'linux', 'ubuntu',
    'nginx', 'apache', 'server management', 'monitoring', 'cloud computing',
    // AI, Data & Machine Learning
    'machine learning', 'deep learning', 'artificial intelligence', 'data science', 'data analysis',
    'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 'keras', 'opencv', 'nlp', 'llm',
    'computer vision', 'data engineering', 'etl', 'tableau', 'power bi', 'bigquery', 'snowflake', 'kafka', 'spark',
    // Testing & Quality Assurance
    'jest', 'cypress', 'selenium', 'playwright', 'mocha', 'chai', 'junit', 'pytest', 'unit testing',
    'integration testing', 'e2e testing', 'automated testing', 'qa', 'test driven development', 'tdd',
    // Architecture & Engineering Practices
    'data structures', 'algorithms', 'system design', 'object oriented', 'oop', 'mvc', 'design patterns',
    'clean code', 'clean architecture', 'agile', 'scrum', 'kanban', 'jira', 'git', 'github', 'gitlab',
    'version control', 'code review', 'debugging', 'ci/cd pipelines',
    // Security & Authentication
    'jwt', 'oauth', 'authentication', 'authorization', 'rbac', 'cyber security', 'encryption', 'api security',
    // Core Competencies & Soft Skills
    'problem solving', 'leadership', 'team collaboration', 'communication', 'critical thinking',
    'analytical skills', 'cross-functional', 'mentoring', 'troubleshooting', 'time management',
];
const JOB_STOP_WORDS = new Set([
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren',
    'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
    'can', 'cannot', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for',
    'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him',
    'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'isn', 'it', 'its', 'itself', 'just', 'll',
    'm', 'ma', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'o', 'of', 'off', 'on',
    'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 're', 's', 'same',
    'shan', 'she', 'should', 'so', 'some', 'such', 't', 'than', 'that', 'the', 'their', 'theirs', 'them',
    'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under',
    'until', 'up', 've', 'very', 'was', 'wasn', 'we', 'were', 'weren', 'what', 'when', 'where', 'which',
    'while', 'who', 'whom', 'why', 'will', 'with', 'won', 'would', 'y', 'you', 'your', 'yours',
    'yourself', 'yourselves', 'looking', 'seeking', 'work', 'working', 'role', 'team', 'candidate',
    'candidates', 'opportunity', 'company', 'responsibilities', 'qualifications', 'requirements',
    'experience', 'years', 'plus', 'preferred', 'skills', 'ability', 'must', 'strong', 'good',
    'knowledge', 'proficiency', 'proficient', 'familiar', 'familiarity', 'hands-on', 'degree',
    'bachelor', 'master', 'equivalent', 'equal', 'gender', 'salary', 'benefits', 'apply', 'join',
]);
export function analyzeResumeATS(resume) {
    const suggestions = [];
    const personal = resume?.personal || {
        fullName: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        portfolio: '',
    };
    const summary = resume?.summary || '';
    const education = resume?.education || [];
    const experience = resume?.experience || [];
    const projects = resume?.projects || [];
    const skills = resume?.skills || {
        programming: [],
        frontend: [],
        backend: [],
        databases: [],
        tools: [],
        frameworks: [],
        other: [],
    };
    // 1. Contact Info check
    const contactIssues = [];
    let contactScore = 100;
    if (!(personal.fullName || '').trim()) {
        contactIssues.push('Full name is missing.');
        contactScore -= 40;
    }
    if (!(personal.email || '').trim()) {
        contactIssues.push('Email address is missing.');
        contactScore -= 30;
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((personal.email || '').trim())) {
        contactIssues.push('Email format looks invalid.');
        contactScore -= 15;
    }
    if (!(personal.phone || '').trim()) {
        contactIssues.push('Phone number is missing.');
        contactScore -= 20;
    }
    if (!(personal.linkedin || '').trim() && !(personal.github || '').trim()) {
        contactIssues.push('Consider adding LinkedIn or GitHub for technical credibility.');
        contactScore -= 10;
    }
    contactScore = Math.max(0, contactScore);
    // 2. Required sections check
    const sectionIssues = [];
    let sectionScore = 100;
    if (!summary || summary.trim().length < 40) {
        sectionIssues.push('Professional summary is missing or too brief (recommend 2-4 sentences).');
        sectionScore -= 25;
    }
    if (education.length === 0) {
        sectionIssues.push('Education section is missing.');
        sectionScore -= 30;
    }
    const totalSkills = Object.values(skills).reduce((acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0), 0);
    if (totalSkills === 0) {
        sectionIssues.push('No skills listed. Categorized skills are vital for ATS parser matching.');
        sectionScore -= 30;
    }
    if (projects.length === 0 && experience.length === 0) {
        sectionIssues.push('Neither experience nor projects are included. At least one is mandatory.');
        sectionScore -= 35;
    }
    sectionScore = Math.max(0, sectionScore);
    // 3. Action verbs in experience and projects
    const allBullets = [];
    experience.forEach((exp) => {
        (exp.bullets || []).forEach((b) => (b || '').trim() && allBullets.push((b || '').toLowerCase()));
    });
    projects.forEach((proj) => {
        if (proj.bullets && proj.bullets.length > 0) {
            proj.bullets.forEach((b) => (b || '').trim() && allBullets.push((b || '').toLowerCase()));
        }
        else if (proj.description) {
            allBullets.push(proj.description.toLowerCase());
        }
    });
    const foundVerbs = new Set();
    allBullets.forEach((bullet) => {
        const firstWord = bullet.trim().split(/\s+/)[0]?.replace(/[^a-z]/g, '');
        if (firstWord && ACTION_VERBS.includes(firstWord)) {
            foundVerbs.add(firstWord);
        }
        // Also scan whole bullet
        ACTION_VERBS.forEach((v) => {
            if (bullet.includes(` ${v} `) || bullet.startsWith(`${v} `)) {
                foundVerbs.add(v);
            }
        });
    });
    let verbScore = Math.min(100, Math.round((foundVerbs.size / 5) * 100));
    if (allBullets.length === 0)
        verbScore = 0;
    // 4. Quantifiable results (metrics / numbers / percentages)
    const metricRegex = /\b(\d+[%kKmM]?|\$\d+|\d+\+|\d+x)\b/;
    let bulletsWithMetrics = 0;
    allBullets.forEach((b) => {
        if (metricRegex.test(b))
            bulletsWithMetrics++;
    });
    const metricScore = allBullets.length > 0
        ? Math.min(100, Math.round((bulletsWithMetrics / Math.max(1, Math.min(allBullets.length, 4))) * 100))
        : 0;
    // 5. Skills Completeness
    let skillScore = 0;
    if (totalSkills >= 12)
        skillScore = 100;
    else if (totalSkills >= 8)
        skillScore = 85;
    else if (totalSkills >= 4)
        skillScore = 65;
    else if (totalSkills > 0)
        skillScore = 40;
    // 6. Formatting & Length
    let textCorpus = `${personal.fullName || ''} ${summary || ''} `;
    education.forEach((e) => (textCorpus += `${e.degree || ''} ${e.institution || ''} ${e.description || ''} `));
    experience.forEach((e) => (textCorpus += `${e.jobTitle || ''} ${e.company || ''} ${(e.bullets || []).join(' ')} `));
    projects.forEach((p) => (textCorpus += `${p.name || ''} ${p.technologies || ''} ${p.description || ''} ${(p.bullets || []).join(' ')} `));
    const wordCount = textCorpus.trim().split(/\s+/).filter(Boolean).length;
    let lengthScore = 100;
    const lengthIssues = [];
    if (wordCount < 150) {
        lengthIssues.push('Resume content is quite short (<150 words). Aim for 300–600 words for a strong 1-page resume.');
        lengthScore = 50;
    }
    else if (wordCount > 950) {
        lengthIssues.push('Resume may exceed standard length (>950 words). Trim descriptions to keep it concise.');
        lengthScore = 75;
    }
    // Compile overall suggestions
    if (contactScore < 80) {
        suggestions.push({
            type: 'critical',
            message: 'Complete your essential contact details (Email, Phone, Location) so recruiters can reach you.',
            section: 'Personal Information',
        });
    }
    if (!resume.summary || resume.summary.length < 50) {
        suggestions.push({
            type: 'improvement',
            message: 'Add a high-impact 2–3 line summary highlighting your core specialization and ambition.',
            section: 'Professional Summary',
        });
    }
    if (foundVerbs.size < 4 && allBullets.length > 0) {
        suggestions.push({
            type: 'improvement',
            message: `Begin bullet points with strong power action verbs (e.g., Developed, Engineered, Optimized, Delivered) rather than passive voice.`,
            section: 'Experience / Projects',
        });
    }
    if (bulletsWithMetrics === 0 && allBullets.length > 0) {
        suggestions.push({
            type: 'improvement',
            message: 'Include quantifiable impact (e.g., "reduced latency by 28%", "scaled to 1,000+ users", "improved test coverage to 85%").',
            section: 'Experience / Projects',
        });
    }
    if (totalSkills < 8) {
        suggestions.push({
            type: 'improvement',
            message: 'List at least 8–15 distinct skills across languages, frameworks, databases, and developer tools.',
            section: 'Skills',
        });
    }
    if (resume.projects.length === 0) {
        suggestions.push({
            type: 'critical',
            message: 'For freshers and students, 2-3 detailed technical projects are essential for ATS keyword detection.',
            section: 'Projects',
        });
    }
    if (suggestions.length === 0) {
        suggestions.push({
            type: 'positive',
            message: 'Excellent ATS structure! Your resume has clear section headings, measurable bullets, and strong technical density.',
        });
    }
    const overallScore = Math.round(contactScore * 0.2 +
        sectionScore * 0.25 +
        verbScore * 0.15 +
        metricScore * 0.15 +
        skillScore * 0.15 +
        lengthScore * 0.1);
    let grade = 'F';
    if (overallScore >= 90)
        grade = 'A';
    else if (overallScore >= 78)
        grade = 'B';
    else if (overallScore >= 65)
        grade = 'C';
    else if (overallScore >= 50)
        grade = 'D';
    let summaryText = 'Good foundation. A few refinements will elevate your ATS readability score.';
    if (overallScore >= 85)
        summaryText = 'Outstanding! Strong machine-readable formatting, action verbs, and complete sections.';
    else if (overallScore < 60)
        summaryText = 'Several critical sections or contact details require attention before submitting.';
    return {
        overallScore,
        grade,
        summary: summaryText,
        categories: {
            contactInfo: {
                score: contactScore,
                status: contactScore >= 90 ? 'good' : contactScore >= 70 ? 'warning' : 'issue',
                details: contactIssues.length ? contactIssues : ['All primary contact information fields are complete.'],
            },
            requiredSections: {
                score: sectionScore,
                status: sectionScore >= 90 ? 'good' : sectionScore >= 70 ? 'warning' : 'issue',
                details: sectionIssues.length ? sectionIssues : ['Standard essential sections are properly structured.'],
            },
            actionVerbs: {
                score: verbScore,
                count: foundVerbs.size,
                status: verbScore >= 80 ? 'good' : verbScore >= 50 ? 'warning' : 'issue',
                found: Array.from(foundVerbs).slice(0, 8),
                missingTypes: ['Engineered', 'Optimized', 'Automated', 'Collaborated'],
            },
            quantifiableResults: {
                score: metricScore,
                count: bulletsWithMetrics,
                status: metricScore >= 75 ? 'good' : metricScore >= 40 ? 'warning' : 'issue',
                details: [
                    `${bulletsWithMetrics} bullet(s) contain measurable numerical results or percentages.`,
                ],
            },
            skillsCompleteness: {
                score: skillScore,
                count: totalSkills,
                status: skillScore >= 80 ? 'good' : skillScore >= 50 ? 'warning' : 'issue',
                details: [`${totalSkills} categorized skills detected.`],
            },
            formattingLength: {
                score: lengthScore,
                wordCount,
                status: lengthScore >= 80 ? 'good' : 'warning',
                details: lengthIssues.length ? lengthIssues : [`Balanced word count (${wordCount} words) suitable for a 1-page ATS layout.`],
            },
        },
        suggestions,
    };
}
export function analyzeJobDescription(jobText, resume) {
    if (!jobText || !jobText.trim()) {
        return {
            matchPercentage: 0,
            matchedKeywords: [],
            missingKeywords: [],
            recommendedActions: ['Paste a job description to extract relevant keywords and compare match rate.'],
        };
    }
    const normalizedJob = jobText.toLowerCase();
    // 1. Gather all resume text segments with their section origins
    const resumeSkills = Object.values(resume?.skills || {})
        .flat()
        .filter(Boolean)
        .map((s) => s.toLowerCase().trim());
    const projectsText = (resume?.projects || [])
        .map((p) => `${p.name || ''} ${p.technologies || ''} ${p.description || ''} ${(p.bullets || []).join(' ')}`)
        .join(' ')
        .toLowerCase();
    const experienceText = (resume?.experience || [])
        .map((e) => `${e.jobTitle || ''} ${e.company || ''} ${(e.bullets || []).join(' ')}`)
        .join(' ')
        .toLowerCase();
    const educationText = (resume?.education || [])
        .map((e) => `${e.degree || ''} ${e.fieldOfStudy || ''} ${e.institution || ''} ${e.description || ''}`)
        .join(' ')
        .toLowerCase();
    const certsText = (resume?.certifications || [])
        .map((c) => `${c.name || ''} ${c.issuer || ''}`)
        .join(' ')
        .toLowerCase();
    const summaryText = (resume?.summary || '').toLowerCase();
    const candidateTitle = (resume?.personal?.title || '').toLowerCase();
    // 2. Extract candidate keywords from the Job Description
    const candidateKeywords = new Set();
    // A. Check against recognized industry keyword dictionary
    RECOGNIZED_JOB_KEYWORDS.forEach((kw) => {
        // Exact word boundary matching for short terms (<= 4 chars) and multi-words
        const escaped = kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, 'i');
        if (regex.test(normalizedJob)) {
            candidateKeywords.add(kw);
        }
    });
    // B. Dynamic extraction: Capitalized acronyms (e.g., AWS, GCP, SDK, API, ETL, ERP, CRM, CI/CD, SQL, DSA, AI, ML)
    const acronymMatches = jobText.match(/\b[A-Z]{2,6}(?:\/[A-Z]{2,6})*\b/g);
    if (acronymMatches) {
        acronymMatches.forEach((acronym) => {
            const lower = acronym.toLowerCase();
            if (!JOB_STOP_WORDS.has(lower) && lower.length >= 2 && !/^\d+$/.test(lower)) {
                candidateKeywords.add(lower);
            }
        });
    }
    // C. Dynamic extraction from bullet points and requirements lines
    const lines = jobText.split(/\r?\n/);
    lines.forEach((line) => {
        const trimmed = line.trim();
        if (/^[•\-\*–—\d\.]+\s+/.test(trimmed)) {
            const words = trimmed
                .replace(/^[•\-\*–—\d\.]+\s+/, '')
                .split(/[,\/;\(\)\[\]:]+/)
                .map((w) => w.trim().toLowerCase())
                .filter((w) => w.length >= 3 && w.length <= 25 && !JOB_STOP_WORDS.has(w));
            words.forEach((w) => {
                // If it looks like a technical keyword or skill
                if (!/^(the|and|with|must|should|have|will|able|good|strong|years)\b/.test(w)) {
                    if (w.split(/\s+/).length <= 3) {
                        candidateKeywords.add(w);
                    }
                }
            });
        }
    });
    // If no candidate keywords were identified at all
    if (candidateKeywords.size === 0) {
        return {
            matchPercentage: 0,
            matchedKeywords: [],
            missingKeywords: [],
            recommendedActions: [
                'Could not identify recognized technical skills or job requirements in the text provided.',
                'Please paste the "Requirements", "Qualifications", or "Skills" section of the job description for accurate analysis.',
            ],
        };
    }
    // 3. Match candidate keywords against resume sections using strict word boundaries
    const matchedKeywords = [];
    const missingKeywords = [];
    const checkTextContains = (text, kw) => {
        if (!text || !kw)
            return false;
        const escaped = kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, 'i');
        return regex.test(text);
    };
    candidateKeywords.forEach((kw) => {
        let foundLocation = null;
        // Check Skills section first
        const inSkills = resumeSkills.some((s) => {
            if (s === kw)
                return true;
            const escaped = kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
            return new RegExp(`\\b${escaped}\\b`, 'i').test(s);
        });
        if (inSkills) {
            foundLocation = 'Skills section';
        }
        else if (checkTextContains(projectsText, kw)) {
            foundLocation = 'Projects';
        }
        else if (checkTextContains(experienceText, kw)) {
            foundLocation = 'Work Experience';
        }
        else if (checkTextContains(summaryText, kw) || checkTextContains(candidateTitle, kw)) {
            foundLocation = 'Summary';
        }
        else if (checkTextContains(educationText, kw) || checkTextContains(certsText, kw)) {
            foundLocation = 'Education / Certifications';
        }
        const displayKeyword = kw.toUpperCase();
        if (foundLocation) {
            matchedKeywords.push({
                keyword: displayKeyword,
                category: 'Technical',
                foundIn: foundLocation,
            });
        }
        else {
            const isHighPriority = [
                'react', 'node', 'node.js', 'typescript', 'javascript', 'python', 'java', 'sql', 'mysql',
                'postgresql', 'aws', 'docker', 'git', 'ci/cd', 'rest', 'api', 'data structures', 'algorithms'
            ].includes(kw);
            missingKeywords.push({
                keyword: displayKeyword,
                category: 'Technical',
                importance: isHighPriority ? 'high' : 'medium',
            });
        }
    });
    // 4. Calculate strict match percentage
    const totalKeywords = matchedKeywords.length + missingKeywords.length;
    const matchPercentage = totalKeywords > 0 ? Math.round((matchedKeywords.length / totalKeywords) * 100) : 0;
    // 5. Generate contextual tailoring recommendations
    const recommendedActions = [];
    const highPriorityMissing = missingKeywords.filter((m) => m.importance === 'high').map((m) => m.keyword);
    if (matchPercentage === 0) {
        recommendedActions.push('0% Keyword Match: None of the key requirements detected in this posting were found in your resume.');
        recommendedActions.push(`Consider reviewing your skills and projects to see if you can incorporate relevant experience.`);
    }
    else if (matchPercentage < 50) {
        recommendedActions.push(`Low Keyword Alignment (${matchPercentage}%): Your resume may be filtered out by automated ATS scanners for this specific position.`);
        if (highPriorityMissing.length > 0) {
            recommendedActions.push(`High Priority Missing Skills: ${highPriorityMissing.slice(0, 5).join(', ')}. If you have experience with these, add them to your Skills or Projects.`);
        }
        recommendedActions.push('Align terminology in your summary and bullet points directly with terms used in the job posting.');
    }
    else if (matchPercentage < 75) {
        recommendedActions.push(`Moderate Alignment (${matchPercentage}%): Good foundation, but adding a few more matching skills will elevate your ranking.`);
        if (highPriorityMissing.length > 0) {
            recommendedActions.push(`Recommended terms to add: ${highPriorityMissing.slice(0, 4).join(', ')}.`);
        }
        recommendedActions.push('Mention relevant technologies explicitly in your project descriptions to demonstrate practical application.');
    }
    else {
        recommendedActions.push(`High Alignment (${matchPercentage}%): Excellent match! Your resume covers the majority of requirements for this role.`);
        recommendedActions.push('Ensure each matching technical skill in your experience has measurable impact metrics (e.g. latency, scale, efficiency).');
    }
    // Sort missing keywords so high priority items appear first
    missingKeywords.sort((a, b) => (a.importance === 'high' ? -1 : 1));
    return {
        matchPercentage,
        matchedKeywords,
        missingKeywords,
        recommendedActions,
    };
}
