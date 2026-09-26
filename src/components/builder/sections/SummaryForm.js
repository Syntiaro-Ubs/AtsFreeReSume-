import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext.js';
import { Sparkles, Check } from 'lucide-react';
import { api } from '../../../services/api.js';
export const SummaryForm = () => {
    const { resumeData, updateSummary } = useResume();
    const { summary, personal } = resumeData;
    const [isImproving, setIsImproving] = useState(false);
    const [aiSuggestion, setAiSuggestion] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;
    const charCount = summary.length;
    const handleImproveWithAI = async () => {
        if (!summary.trim()) {
            setErrorMsg('Please write a basic summary draft first so the enhancer can refine it.');
            return;
        }
        setErrorMsg(null);
        setIsImproving(true);
        try {
            const skillsStr = Object.values(resumeData.skills).flat().slice(0, 10).join(', ');
            const res = await api.improveSummary(summary, personal.title, skillsStr);
            setAiSuggestion(res.improved);
        }
        catch (err) {
            setErrorMsg(err.message || 'Failed to generate enhancement.');
        }
        finally {
            setIsImproving(false);
        }
    };
    const handleApplySuggestion = () => {
        if (aiSuggestion) {
            updateSummary(aiSuggestion);
            setAiSuggestion(null);
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-bold uppercase tracking-wider text-slate-900 mb-1", children: "Professional Summary / Profile" }), _jsx("p", { className: "text-xs text-slate-500", children: "A concise 2\u20134 sentence overview summarizing your specialization, technical strengths, and career objective." })] }), _jsxs("button", { type: "button", onClick: handleImproveWithAI, disabled: isImproving || !summary.trim(), className: "inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors disabled:opacity-50 shrink-0 self-start sm:self-center", children: [_jsx(Sparkles, { className: "w-3.5 h-3.5 text-indigo-600" }), _jsx("span", { children: isImproving ? 'Refining...' : 'Improve with AI' })] })] }), errorMsg && (_jsx("div", { className: "p-2.5 rounded-lg bg-rose-50 text-rose-700 text-xs border border-rose-200", children: errorMsg })), aiSuggestion && (_jsxs("div", { className: "p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-3 animate-in fade-in duration-200", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center space-x-1", children: [_jsx(Sparkles, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Suggested ATS Improvement" })] }), _jsx("span", { className: "text-[11px] text-slate-500", children: "Review before replacing" })] }), _jsx("p", { className: "text-xs text-slate-800 leading-relaxed bg-white p-3 rounded-lg border border-indigo-100", children: aiSuggestion }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("button", { type: "button", onClick: handleApplySuggestion, className: "inline-flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs", children: [_jsx(Check, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Apply to Resume" })] }), _jsx("button", { type: "button", onClick: () => setAiSuggestion(null), className: "text-xs text-slate-600 hover:text-slate-800 px-2.5 py-1.5", children: "Discard" })] })] })), _jsxs("div", { children: [_jsx("textarea", { rows: 5, value: summary, onChange: (e) => updateSummary(e.target.value), placeholder: "Write a brief professional summary about your background, skills, and career goals. The AI can help improve it once you have a draft.", className: "w-full p-3 text-xs leading-relaxed border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" }), _jsxs("div", { className: "flex items-center justify-between mt-1.5 text-[11px] text-slate-500", children: [_jsxs("div", { className: "flex space-x-3", children: [_jsxs("span", { children: [wordCount, " words"] }), _jsxs("span", { children: [charCount, " characters"] })] }), _jsx("span", { className: wordCount >= 30 && wordCount <= 80 ? 'text-emerald-600 font-medium' : 'text-slate-400', children: "Optimal: 35\u201375 words (2\u20134 lines)" })] })] })] }));
};
