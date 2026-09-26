import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext.js';
import { Plus, Trash2, FolderGit2, Sparkles } from 'lucide-react';
import { api } from '../../../services/api.js';
export const ProjectsForm = () => {
    const { resumeData, addProject, updateProject, deleteProject } = useResume();
    const { projects } = resumeData;
    const [improvingId, setImprovingId] = useState(null);
    const handleAddNew = () => {
        addProject({
            name: '',
            role: 'Full-Stack Developer',
            technologies: '',
            githubUrl: '',
            liveUrl: '',
            description: '',
            bullets: [''],
        });
    };
    const handleAddBullet = (projId, currentBullets) => {
        const bullets = currentBullets || [];
        updateProject(projId, { bullets: [...bullets, ''] });
    };
    const handleUpdateBullet = (projId, currentBullets, idx, value) => {
        const updated = [...currentBullets];
        updated[idx] = value;
        updateProject(projId, { bullets: updated });
    };
    const handleDeleteBullet = (projId, currentBullets, idx) => {
        const updated = currentBullets.filter((_, i) => i !== idx);
        updateProject(projId, { bullets: updated });
    };
    const handleImproveDescription = async (projId, currentDesc, projName, tech) => {
        if (!currentDesc.trim())
            return;
        setImprovingId(projId);
        try {
            const res = await api.improveProject(currentDesc, projName, tech);
            if (res.improved) {
                updateProject(projId, { description: res.improved });
            }
        }
        catch (err) {
            console.warn('Improve project error:', err);
        }
        finally {
            setImprovingId(null);
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-bold uppercase tracking-wider text-slate-900 mb-1", children: "Technical Projects" }), _jsx("p", { className: "text-xs text-slate-500", children: "Showcase your best academic, open-source, or portfolio projects (crucial for students & freshers)." })] }), _jsxs("button", { type: "button", onClick: handleAddNew, className: "inline-flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors", children: [_jsx(Plus, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Add Project" })] })] }), projects.length === 0 ? (_jsxs("div", { className: "text-center py-8 px-4 border border-dashed border-slate-300 rounded-xl bg-slate-50/50", children: [_jsx(FolderGit2, { className: "w-8 h-8 text-slate-400 mx-auto mb-2" }), _jsx("p", { className: "text-xs font-semibold text-slate-700", children: "No projects added yet." }), _jsx("p", { className: "text-[11px] text-slate-500 mb-3", children: "Highlight apps you built, tools, and technical stacks." }), _jsxs("button", { type: "button", onClick: handleAddNew, className: "inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800", children: [_jsx(Plus, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Add Your First Project" })] })] })) : (_jsx("div", { className: "space-y-4", children: projects.map((proj, pIdx) => (_jsxs("div", { className: "p-4 border border-slate-200 rounded-xl bg-white space-y-3 shadow-2xs hover:border-slate-300 transition-colors", children: [_jsxs("div", { className: "flex items-center justify-between pb-2 border-b border-slate-100", children: [_jsxs("span", { className: "text-xs font-bold text-slate-800 flex items-center space-x-1.5", children: [_jsx(FolderGit2, { className: "w-4 h-4 text-indigo-600" }), _jsx("span", { children: proj.name || `Project #${pIdx + 1}` })] }), _jsx("button", { type: "button", onClick: () => deleteProject(proj.id), className: "p-1 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50", title: "Delete project entry", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-[11px] font-semibold text-slate-700 mb-1", children: ["Project Name ", _jsx("span", { className: "text-rose-500", children: "*" })] }), _jsx("input", { type: "text", value: proj.name, onChange: (e) => updateProject(proj.id, { name: e.target.value }), placeholder: "e.g. E-Commerce Platform", className: "w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-700 mb-1", children: "Your Role / Scope" }), _jsx("input", { type: "text", value: proj.role, onChange: (e) => updateProject(proj.id, { role: e.target.value }), placeholder: "e.g. Lead Full-Stack Developer", className: "w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })] }), _jsxs("div", { className: "sm:col-span-2", children: [_jsxs("label", { className: "block text-[11px] font-semibold text-slate-700 mb-1", children: ["Technologies / Stack ", _jsx("span", { className: "text-rose-500", children: "*" })] }), _jsx("input", { type: "text", value: proj.technologies, onChange: (e) => updateProject(proj.id, { technologies: e.target.value }), placeholder: "e.g. React | Node.js | Express | MySQL | Tailwind CSS", className: "w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-700 mb-1", children: "GitHub / Source Code Link" }), _jsx("input", { type: "text", value: proj.githubUrl, onChange: (e) => updateProject(proj.id, { githubUrl: e.target.value }), placeholder: "https://github.com/username/project", className: "w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-700 mb-1", children: "Live Demo Link (Optional)" }), _jsx("input", { type: "text", value: proj.liveUrl, onChange: (e) => updateProject(proj.id, { liveUrl: e.target.value }), placeholder: "https://myproject.app", className: "w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })] }), _jsxs("div", { className: "sm:col-span-2", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-700", children: "Project Overview Description" }), _jsxs("button", { type: "button", onClick: () => handleImproveDescription(proj.id, proj.description, proj.name, proj.technologies), disabled: improvingId === proj.id || !proj.description.trim(), className: "text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1 disabled:opacity-50", children: [_jsx(Sparkles, { className: "w-3 h-3" }), _jsx("span", { children: improvingId === proj.id ? 'Enhancing...' : 'Enhance with AI' })] })] }), _jsx("textarea", { rows: 2, value: proj.description, onChange: (e) => updateProject(proj.id, { description: e.target.value }), placeholder: "e.g. Architected an e-commerce web application with inventory management and secure customer payment flow...", className: "w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })] }), _jsxs("div", { className: "sm:col-span-2 space-y-2 pt-1 border-t border-slate-100", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "block text-[11px] font-semibold text-slate-700", children: "Key Technical Contributions / Highlights" }), _jsxs("button", { type: "button", onClick: () => handleAddBullet(proj.id, proj.bullets), className: "text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1", children: [_jsx(Plus, { className: "w-3 h-3" }), _jsx("span", { children: "Add Bullet" })] })] }), (proj.bullets || []).map((bullet, bIdx) => (_jsxs("div", { className: "flex items-center space-x-1.5", children: [_jsx("span", { className: "text-slate-400 text-xs", children: "\u2022" }), _jsx("input", { type: "text", value: bullet, onChange: (e) => handleUpdateBullet(proj.id, proj.bullets || [], bIdx, e.target.value), placeholder: "e.g. Built reusable React components and integrated REST APIs.", className: "flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" }), _jsx("button", { type: "button", onClick: () => handleDeleteBullet(proj.id, proj.bullets || [], bIdx), className: "p-1 text-slate-400 hover:text-rose-600 rounded", children: _jsx(Trash2, { className: "w-3.5 h-3.5" }) })] }, bIdx)))] })] })] }, proj.id))) }))] }));
};
