import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext.js';
import { User, FileText, GraduationCap, Briefcase, FolderGit2, Wrench, Award, Trophy, Languages, Layers, ArrowUp, ArrowDown, RotateCcw, Sparkles, } from 'lucide-react';
const SECTION_DEFS = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'summary', label: 'Professional Summary', icon: FileText },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'languages', label: 'Languages', icon: Languages },
    { id: 'custom', label: 'Custom Section', icon: Layers },
];
export const BuilderSidebar = () => {
    const { activeSection, setActiveSection, resumeData, setSectionOrder, loadSampleData, clearResumeData, } = useResume();
    const [isReorderingMode, setIsReorderingMode] = useState(false);
    // Check completion status for indicators
    const getSectionStatus = (type) => {
        switch (type) {
            case 'personal':
                if (resumeData.personal.fullName && resumeData.personal.email && resumeData.personal.phone)
                    return 'complete';
                if (resumeData.personal.fullName || resumeData.personal.email)
                    return 'partial';
                return 'empty';
            case 'summary':
                if (resumeData.summary.trim().length > 60)
                    return 'complete';
                if (resumeData.summary.trim().length > 0)
                    return 'partial';
                return 'empty';
            case 'education':
                if (resumeData.education.length > 0)
                    return 'complete';
                return 'empty';
            case 'experience':
                if (resumeData.experience.length > 0)
                    return 'complete';
                return 'empty';
            case 'projects':
                if (resumeData.projects.length > 0)
                    return 'complete';
                return 'empty';
            case 'skills': {
                const total = Object.values(resumeData.skills).reduce((acc, curr) => acc + curr.length, 0);
                if (total >= 6)
                    return 'complete';
                if (total > 0)
                    return 'partial';
                return 'empty';
            }
            case 'certifications':
                return resumeData.certifications.length > 0 ? 'complete' : 'empty';
            case 'achievements':
                return resumeData.achievements.length > 0 ? 'complete' : 'empty';
            case 'languages':
                return resumeData.languages.length > 0 ? 'complete' : 'empty';
            case 'custom':
                return resumeData.customSections.length > 0 ? 'complete' : 'empty';
            default:
                return 'empty';
        }
    };
    const handleMoveSection = (index, direction) => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= resumeData.sectionOrder.length)
            return;
        const updated = [...resumeData.sectionOrder];
        const [moved] = updated.splice(index, 1);
        updated.splice(newIndex, 0, moved);
        setSectionOrder(updated);
    };
    return (_jsxs("aside", { className: "w-full lg:w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 no-print", children: [_jsxs("div", { className: "p-3.5 border-b border-slate-100 flex items-center justify-between", children: [_jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-700", children: "Resume Sections" }), _jsx("button", { type: "button", onClick: () => setIsReorderingMode(!isReorderingMode), className: `text-[11px] font-semibold px-2 py-0.5 rounded transition-colors ${isReorderingMode
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`, children: isReorderingMode ? 'Done Reordering' : 'Reorder Layout' })] }), _jsx("div", { className: "flex-1 overflow-y-auto py-2 px-2.5 space-y-1", children: isReorderingMode ? (_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-[11px] text-slate-500 px-2 py-1 italic", children: "Move sections up or down to adjust your PDF layout:" }), resumeData.sectionOrder.map((secId, idx) => {
                            const meta = SECTION_DEFS.find((s) => s.id === secId);
                            if (!meta)
                                return null;
                            const Icon = meta.icon;
                            return (_jsxs("div", { className: "flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Icon, { className: "w-4 h-4 text-slate-500" }), _jsx("span", { children: meta.label })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("button", { type: "button", disabled: idx === 0, onClick: () => handleMoveSection(idx, 'up'), className: "p-1 hover:bg-slate-200 rounded disabled:opacity-30", children: _jsx(ArrowUp, { className: "w-3.5 h-3.5" }) }), _jsx("button", { type: "button", disabled: idx === resumeData.sectionOrder.length - 1, onClick: () => handleMoveSection(idx, 'down'), className: "p-1 hover:bg-slate-200 rounded disabled:opacity-30", children: _jsx(ArrowDown, { className: "w-3.5 h-3.5" }) })] })] }, secId));
                        })] })) : (SECTION_DEFS.map(({ id, label, icon: Icon }) => {
                    const isActive = activeSection === id;
                    const status = getSectionStatus(id);
                    return (_jsxs("button", { type: "button", onClick: () => setActiveSection(id), className: `w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${isActive
                            ? 'bg-indigo-50 text-indigo-900 font-semibold border-l-3 border-indigo-600'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`, children: [_jsxs("div", { className: "flex items-center space-x-2.5 truncate", children: [_jsx(Icon, { className: `w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}` }), _jsx("span", { className: "truncate", children: label })] }), _jsxs("div", { className: "shrink-0 ml-2", children: [status === 'complete' && (_jsx("span", { className: "text-emerald-600 text-xs font-bold", title: "Completed", children: "\u2713" })), status === 'partial' && (_jsx("span", { className: "text-amber-500 text-xs font-bold", title: "Partially filled", children: "\u25CF" })), status === 'empty' && (_jsx("span", { className: "text-slate-300 text-xs", title: "Empty", children: "\u25CB" }))] })] }, id));
                })) }), _jsxs("div", { className: "p-3 border-t border-slate-100 bg-slate-50/50 space-y-1.5", children: [_jsxs("button", { type: "button", onClick: loadSampleData, className: "w-full flex items-center justify-center space-x-1.5 text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50/80 font-medium py-1.5 px-2 rounded-md transition-colors", children: [_jsx(Sparkles, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Load Fresher Sample" })] }), _jsxs("button", { type: "button", onClick: clearResumeData, className: "w-full flex items-center justify-center space-x-1 text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50/60 py-1 px-2 rounded-md transition-colors", children: [_jsx(RotateCcw, { className: "w-3 h-3" }), _jsx("span", { children: "Clear All Data" })] })] })] }));
};
