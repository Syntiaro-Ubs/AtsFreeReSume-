import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext.js';
import { Plus, Trash2, Briefcase, Sparkles } from 'lucide-react';
import { api } from '../../../services/api.js';
export const ExperienceForm = () => {
    const { resumeData, addExperience, updateExperience, deleteExperience } = useResume();
    const { experience } = resumeData;
    const [improvingIdx, setImprovingIdx] = useState(null);
    const handleAddNew = () => {
        addExperience({
            jobTitle: '',
            company: '',
            location: '',
            employmentType: 'Full-time',
            startDate: '',
            endDate: '',
            isCurrent: false,
            bullets: [''],
        });
    };
    const handleAddBullet = (expId, currentBullets) => {
        updateExperience(expId, { bullets: [...currentBullets, ''] });
    };
    const handleUpdateBullet = (expId, currentBullets, idx, value) => {
        const updated = [...currentBullets];
        updated[idx] = value;
        updateExperience(expId, { bullets: updated });
    };
    const handleDeleteBullet = (expId, currentBullets, idx) => {
        const updated = currentBullets.filter((_, i) => i !== idx);
        updateExperience(expId, { bullets: updated.length ? updated : [''] });
    };
    const handleImproveBullet = async (expId, currentBullets, idx, jobTitle) => {
        const bulletText = currentBullets[idx];
        if (!bulletText.trim())
            return;
        setImprovingIdx({ expId, bulletIdx: idx });
        try {
            const res = await api.improveBullet(bulletText, jobTitle);
            if (res.improved) {
                handleUpdateBullet(expId, currentBullets, idx, res.improved);
            }
        }
        catch (err) {
            console.warn('Could not enhance bullet:', err);
        }
        finally {
            setImprovingIdx(null);
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-bold uppercase tracking-wider text-slate-900 mb-1", children: "Work & Internship Experience" }), _jsx("p", { className: "text-xs text-slate-500", children: "Detail your relevant work history, internships, or freelance roles with action-driven bullet points." })] }), _jsxs("button", { type: "button", onClick: handleAddNew, className: "inline-flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors", children: [_jsx(Plus, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Add Experience" })] })] }), experience.length === 0 ? (_jsxs("div", { className: "text-center py-8 px-4 border border-dashed border-slate-300 rounded-xl bg-slate-50/50", children: [_jsx(Briefcase, { className: "w-8 h-8 text-slate-400 mx-auto mb-2" }), _jsx("p", { className: "text-xs font-semibold text-slate-700", children: "No work experience entries added yet." }), _jsx("p", { className: "text-[11px] text-slate-500 mb-3", children: "Add full-time jobs, summer internships, or freelancing." }), _jsxs("button", { type: "button", onClick: handleAddNew, className: "inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800", children: [_jsx(Plus, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Add Experience Entry" })] })] })) : (_jsx("div", { className: "space-y-4", children: experience.map((exp, expIdx) => (_jsxs("div", { className: "p-4 border border-slate-200 rounded-xl bg-white space-y-3 shadow-2xs hover:border-slate-300 transition-colors", children: [_jsxs("div", { className: "flex items-center justify-between pb-2 border-b border-slate-100", children: [_jsxs("span", { className: "text-xs font-bold text-slate-800 flex items-center space-x-1.5", children: [_jsx(Briefcase, { className: "w-4 h-4 text-indigo-600" }), _jsx("span", { children: exp.jobTitle ? `${exp.jobTitle} at ${exp.company || 'Company'}` : `Experience #${expIdx + 1}` })] }), _jsx("button", { type: "button", onClick: () => deleteExperience(exp.id), className: "p-1 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50", title: "Delete experience entry", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-[11px] font-semibold text-slate-700 mb-1", children: ["Job Title ", _jsx("span", { className: "text-rose-500", children: "*" })] }), _jsx("input", { type: "text", value: exp.jobTitle, onChange: (e) => updateExperience(exp.id, { jobTitle: e.target.value }), placeholder: "e.g. Associate Software Developer", className: "w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-[11px] font-semibold text-slate-700 mb-1", children: ["Company / Organization ", _jsx("span", { className: "text-rose-500", children: "*" })] }), _jsx("input", { type: "text", value: exp.company, onChange: (e) => updateExperience(exp.id, { company: e.target.value }), placeholder: "e.g. ABC Technologies", className: "w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-700 mb-1", children: "Location" }), _jsx("input", { type: "text", value: exp.location, onChange: (e) => updateExperience(exp.id, { location: e.target.value }), placeholder: "e.g. Pune, India or Remote", className: "w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-700 mb-1", children: "Employment Type" }), _jsxs("select", { value: exp.employmentType, onChange: (e) => updateExperience(exp.id, { employmentType: e.target.value }), className: "w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white", children: [_jsx("option", { value: "Full-time", children: "Full-time" }), _jsx("option", { value: "Internship", children: "Internship" }), _jsx("option", { value: "Part-time", children: "Part-time" }), _jsx("option", { value: "Contract", children: "Contract" }), _jsx("option", { value: "Freelance", children: "Freelance" })] })] }), _jsxs("div", { className: "sm:col-span-2 grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-700 mb-1", children: "Start Date" }), _jsx("input", { type: "text", value: exp.startDate, onChange: (e) => updateExperience(exp.id, { startDate: e.target.value }), placeholder: "e.g. Jan 2024", className: "w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-700 mb-1", children: "End Date" }), _jsx("input", { type: "text", disabled: exp.isCurrent, value: exp.isCurrent ? 'Present' : exp.endDate, onChange: (e) => updateExperience(exp.id, { endDate: e.target.value }), placeholder: "e.g. Jun 2024", className: "w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white disabled:bg-slate-100" })] })] }), _jsx("div", { className: "sm:col-span-2", children: _jsxs("label", { className: "inline-flex items-center space-x-2 text-xs text-slate-700 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: exp.isCurrent, onChange: (e) => updateExperience(exp.id, { isCurrent: e.target.checked }), className: "rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5" }), _jsx("span", { children: "Currently working in this role" })] }) }), _jsxs("div", { className: "sm:col-span-2 space-y-2 pt-2 border-t border-slate-100", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-700", children: "Accomplishment Bullet Points (Use action verbs & metrics)" }), _jsxs("button", { type: "button", onClick: () => handleAddBullet(exp.id, exp.bullets), className: "text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1", children: [_jsx(Plus, { className: "w-3 h-3" }), _jsx("span", { children: "Add Bullet" })] })] }), exp.bullets.map((bullet, bIdx) => {
                                            const isBusy = improvingIdx?.expId === exp.id && improvingIdx.bulletIdx === bIdx;
                                            return (_jsxs("div", { className: "flex items-start space-x-1.5", children: [_jsx("span", { className: "text-slate-400 mt-2 text-xs", children: "\u2022" }), _jsx("div", { className: "flex-1", children: _jsx("textarea", { rows: 2, value: bullet, onChange: (e) => handleUpdateBullet(exp.id, exp.bullets, bIdx, e.target.value), placeholder: "e.g. Developed responsive web applications using React and integrated REST APIs, reducing response latency by 28%.", className: "w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 text-slate-900 bg-white" }) }), _jsxs("div", { className: "flex flex-col space-y-1 mt-1", children: [_jsx("button", { type: "button", onClick: () => handleImproveBullet(exp.id, exp.bullets, bIdx, exp.jobTitle), disabled: isBusy || !bullet.trim(), className: "p-1 text-indigo-600 hover:text-indigo-800 rounded hover:bg-indigo-50 disabled:opacity-40", title: "Improve bullet with action verb & ATS structure", children: _jsx(Sparkles, { className: `w-3.5 h-3.5 ${isBusy ? 'animate-spin' : ''}` }) }), exp.bullets.length > 1 && (_jsx("button", { type: "button", onClick: () => handleDeleteBullet(exp.id, exp.bullets, bIdx), className: "p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100", title: "Remove bullet", children: _jsx(Trash2, { className: "w-3.5 h-3.5" }) }))] })] }, bIdx));
                                        })] })] })] }, exp.id))) }))] }));
};
