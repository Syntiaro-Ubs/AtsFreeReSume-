import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Modal } from '../common/Modal.js';
import { analyzeJobDescription } from '../../utils/atsEngine.js';
import { Search, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
const SAMPLE_JOB_DESCRIPTION = `We are seeking an Associate Full-Stack Software Engineer (Freshers / 0-2 Years) to join our engineering team.
Requirements:
• Strong programming fundamentals in JavaScript (ES6+), TypeScript, and Python or Java.
• Hands-on experience building web applications using React.js and Tailwind CSS.
• Solid understanding of Node.js, Express.js, and developing secure REST APIs.
• Relational database design with MySQL or PostgreSQL, indexing, and query optimization.
• Familiarity with version control using Git, GitHub, and Docker containerization.
• Knowledge of AWS cloud infrastructure and CI/CD pipelines is a strong plus.
• Strong problem-solving, data structures & algorithms proficiency.`;
export const JobDescriptionModal = ({ isOpen, onClose, resumeData, }) => {
    const [jobText, setJobText] = useState('');
    const [result, setResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const handleAnalyze = () => {
        if (!jobText.trim())
            return;
        setIsAnalyzing(true);
        setTimeout(() => {
            const res = analyzeJobDescription(jobText, resumeData);
            setResult(res);
            setIsAnalyzing(false);
        }, 300);
    };
    const handleLoadSample = () => {
        setJobText(SAMPLE_JOB_DESCRIPTION);
    };
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: "Job Description Keyword Matcher", subtitle: "Paste a job description to check keyword alignment and find missing technical terms.", maxWidth: "2xl", children: _jsxs("div", { className: "space-y-5", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [_jsx("label", { htmlFor: "jd-textarea", className: "text-xs font-bold uppercase tracking-wider text-slate-700", children: "Paste Target Job Description" }), _jsxs("button", { type: "button", onClick: handleLoadSample, className: "text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center space-x-1", children: [_jsx(Sparkles, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Load Sample Developer Posting" })] })] }), _jsx("textarea", { id: "jd-textarea", rows: 5, value: jobText, onChange: (e) => setJobText(e.target.value), placeholder: "Paste requirements, skills, and qualifications from LinkedIn, Indeed, or company career portal...", className: "w-full text-xs font-mono-clean p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 bg-slate-50/50" }), _jsx("div", { className: "mt-2 flex justify-end", children: _jsxs("button", { type: "button", onClick: handleAnalyze, disabled: !jobText.trim() || isAnalyzing, className: "inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xs transition-colors", children: [_jsx(Search, { className: "w-4 h-4" }), _jsx("span", { children: isAnalyzing ? 'Analyzing Terms...' : 'Compare Against My Resume' })] }) })] }), result && (_jsx("div", { className: "space-y-4 pt-3 border-t border-slate-200 animate-in fade-in duration-200", children: result.matchedKeywords.length === 0 && result.missingKeywords.length === 0 ? (_jsxs("div", { className: "p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-2 font-bold", children: [_jsx(AlertCircle, { className: "w-4 h-4 text-amber-600 shrink-0" }), _jsx("span", { children: "No Job Requirements Detected" })] }), _jsxs("p", { className: "text-slate-600", children: ["We couldn't identify recognizable technical skills or job requirements from the pasted text. Please paste the specific ", _jsx("strong", { children: "\"Requirements\"" }), " or ", _jsx("strong", { children: "\"Qualifications\"" }), " bullet points from the job posting."] })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wider", children: "Keyword Match Rate" }), _jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded-full border ${result.matchPercentage >= 75
                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                                            : result.matchPercentage >= 45
                                                                ? 'bg-amber-50 text-amber-700 border-amber-300'
                                                                : 'bg-rose-50 text-rose-700 border-rose-300'}`, children: result.matchPercentage >= 75
                                                            ? 'Strong Match'
                                                            : result.matchPercentage >= 45
                                                                ? 'Moderate Match'
                                                                : result.matchPercentage > 0
                                                                    ? 'Low Match'
                                                                    : 'No Match (0%)' })] }), _jsxs("div", { className: "flex items-baseline space-x-2 mt-0.5", children: [_jsxs("span", { className: `text-2xl font-bold ${result.matchPercentage >= 75
                                                            ? 'text-emerald-700'
                                                            : result.matchPercentage >= 45
                                                                ? 'text-amber-700'
                                                                : 'text-rose-700'}`, children: [result.matchPercentage, "%"] }), _jsxs("span", { className: "text-xs text-slate-600 font-medium", children: ["(", result.matchedKeywords.length, " of ", result.matchedKeywords.length + result.missingKeywords.length, " keywords matched)"] })] })] }), _jsx("div", { className: "w-full sm:w-40 bg-slate-200 rounded-full h-2.5 overflow-hidden", children: _jsx("div", { className: `h-2.5 rounded-full transition-all duration-300 ${result.matchPercentage >= 75
                                                ? 'bg-emerald-500'
                                                : result.matchPercentage >= 45
                                                    ? 'bg-amber-500'
                                                    : 'bg-rose-500'}`, style: { width: `${Math.max(result.matchPercentage, 4)}%` } }) })] }), _jsxs("div", { children: [_jsxs("h4", { className: "text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center space-x-1.5", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-600" }), _jsxs("span", { children: ["Found in Your Resume (", result.matchedKeywords.length, ")"] })] }), result.matchedKeywords.length === 0 ? (_jsx("div", { className: "p-2.5 bg-rose-50/70 border border-rose-200 rounded-lg text-xs text-rose-800", children: "Zero matching keywords found. None of the required skills in this job description are present in your resume." })) : (_jsx("div", { className: "flex flex-wrap gap-1.5", children: result.matchedKeywords.map((kw, i) => (_jsxs("span", { className: "inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200", children: [_jsx("span", { children: kw.keyword }), _jsxs("span", { className: "text-[9px] text-emerald-600 opacity-80", children: ["(", kw.foundIn, ")"] })] }, i))) }))] }), _jsxs("div", { children: [_jsxs("h4", { className: "text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center space-x-1.5", children: [_jsx(AlertCircle, { className: "w-4 h-4 text-amber-600" }), _jsxs("span", { children: ["Potentially Missing Keywords (", result.missingKeywords.length, ")"] })] }), result.missingKeywords.length === 0 ? (_jsx("p", { className: "text-xs text-emerald-700 font-medium", children: "\u2713 All detected job requirements are present in your resume!" })) : (_jsx("div", { className: "flex flex-wrap gap-1.5", children: result.missingKeywords.map((kw, i) => (_jsxs("span", { className: `inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium border ${kw.importance === 'high'
                                                ? 'bg-rose-50 text-rose-800 border-rose-200'
                                                : 'bg-amber-50 text-amber-800 border-amber-200'}`, children: [_jsx("span", { children: kw.keyword }), kw.importance === 'high' && (_jsx("span", { className: "text-[9px] font-bold text-rose-600 uppercase", children: "High Priority" }))] }, i))) }))] }), _jsxs("div", { className: "p-3 bg-slate-50 rounded-lg border border-slate-200", children: [_jsx("h5", { className: "text-xs font-bold text-slate-800 mb-1", children: "Tailoring Advice:" }), _jsx("ul", { className: "text-xs text-slate-600 space-y-1 list-disc list-inside", children: result.recommendedActions.map((act, i) => (_jsx("li", { children: act }, i))) })] })] })) }))] }) }));
};
