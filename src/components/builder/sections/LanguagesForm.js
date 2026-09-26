import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext.js';
import { Plus, Trash2, Languages } from 'lucide-react';
export const LanguagesForm = () => {
    const { resumeData, addLanguage, deleteLanguage } = useResume();
    const { languages } = resumeData;
    const [langInput, setLangInput] = useState('');
    const [proficiencyInput, setProficiencyInput] = useState('Professional');
    const handleAdd = (e) => {
        e.preventDefault();
        if (!langInput.trim())
            return;
        addLanguage(langInput, proficiencyInput);
        setLangInput('');
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-bold uppercase tracking-wider text-slate-900 mb-1", children: "Languages" }), _jsx("p", { className: "text-xs text-slate-500", children: "List languages you speak along with your proficiency level." })] }), _jsxs("form", { onSubmit: handleAdd, className: "flex flex-col sm:flex-row gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200", children: [_jsx("input", { type: "text", value: langInput, onChange: (e) => setLangInput(e.target.value), placeholder: "e.g. English, Hindi, German", className: "flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" }), _jsxs("select", { value: proficiencyInput, onChange: (e) => setProficiencyInput(e.target.value), className: "px-3 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white", children: [_jsx("option", { value: "Native", children: "Native" }), _jsx("option", { value: "Fluent", children: "Fluent" }), _jsx("option", { value: "Professional", children: "Professional Working" }), _jsx("option", { value: "Intermediate", children: "Intermediate" }), _jsx("option", { value: "Basic", children: "Elementary / Basic" })] }), _jsxs("button", { type: "submit", disabled: !langInput.trim(), className: "inline-flex items-center justify-center space-x-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Add" })] })] }), _jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: languages.map((l) => (_jsxs("div", { className: "inline-flex items-center space-x-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs shadow-2xs", children: [_jsx(Languages, { className: "w-3.5 h-3.5 text-indigo-600" }), _jsx("span", { className: "font-semibold text-slate-800", children: l.language }), _jsxs("span", { className: "text-slate-500 text-[11px]", children: ["(", l.proficiency, ")"] }), _jsx("button", { type: "button", onClick: () => deleteLanguage(l.id), className: "text-slate-400 hover:text-rose-600 p-0.5 rounded", children: _jsx(Trash2, { className: "w-3 h-3" }) })] }, l.id))) })] }));
};
