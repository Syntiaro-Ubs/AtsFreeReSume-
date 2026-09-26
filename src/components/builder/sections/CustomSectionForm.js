import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext.js';
import { Plus, Trash2, Layers } from 'lucide-react';
export const CustomSectionForm = () => {
    const { resumeData, addCustomSection, updateCustomSection, deleteCustomSection } = useResume();
    const { customSections } = resumeData;
    const [newTitle, setNewTitle] = useState('');
    const handleCreateSection = (e) => {
        e.preventDefault();
        if (!newTitle.trim())
            return;
        addCustomSection(newTitle);
        setNewTitle('');
    };
    const handleAddItem = (sectionId) => {
        const sec = customSections.find((s) => s.id === sectionId);
        if (!sec)
            return;
        const newItem = {
            id: `citem-${Date.now()}`,
            title: '',
            subtitle: '',
            date: '',
            description: '',
        };
        updateCustomSection(sectionId, { items: [...sec.items, newItem] });
    };
    const handleUpdateItem = (sectionId, itemId, updates) => {
        const sec = customSections.find((s) => s.id === sectionId);
        if (!sec)
            return;
        const updatedItems = sec.items.map((it) => (it.id === itemId ? { ...it, ...updates } : it));
        updateCustomSection(sectionId, { items: updatedItems });
    };
    const handleDeleteItem = (sectionId, itemId) => {
        const sec = customSections.find((s) => s.id === sectionId);
        if (!sec)
            return;
        updateCustomSection(sectionId, { items: sec.items.filter((it) => it.id !== itemId) });
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-bold uppercase tracking-wider text-slate-900 mb-1", children: "Custom Sections" }), _jsx("p", { className: "text-xs text-slate-500", children: "Add specialized sections such as Volunteer Work, Publications, Leadership, or Extracurricular Activities." })] }), _jsxs("form", { onSubmit: handleCreateSection, className: "flex gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200", children: [_jsx("input", { type: "text", value: newTitle, onChange: (e) => setNewTitle(e.target.value), placeholder: "New section name (e.g. Volunteer Experience, Publications)", className: "flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" }), _jsxs("button", { type: "submit", disabled: !newTitle.trim(), className: "inline-flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Add Section" })] })] }), customSections.map((sec) => (_jsxs("div", { className: "p-4 border border-slate-200 rounded-xl bg-white space-y-3 shadow-2xs", children: [_jsxs("div", { className: "flex items-center justify-between pb-2 border-b border-slate-100", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Layers, { className: "w-4 h-4 text-indigo-600" }), _jsx("input", { type: "text", value: sec.title, onChange: (e) => updateCustomSection(sec.id, { title: e.target.value }), className: "font-bold text-xs text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-indigo-500 px-1 py-0.5" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("button", { type: "button", onClick: () => handleAddItem(sec.id), className: "text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center space-x-1", children: [_jsx(Plus, { className: "w-3 h-3" }), _jsx("span", { children: "Add Item" })] }), _jsx("button", { type: "button", onClick: () => deleteCustomSection(sec.id), className: "text-slate-400 hover:text-rose-600 p-1", title: "Delete whole custom section", children: _jsx(Trash2, { className: "w-4 h-4" }) })] })] }), _jsx("div", { className: "space-y-3", children: sec.items.map((item) => (_jsxs("div", { className: "p-3 bg-slate-50/70 rounded-lg border border-slate-200/80 space-y-2 text-xs", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-semibold text-[11px] text-slate-700", children: "Item Detail" }), _jsx("button", { type: "button", onClick: () => handleDeleteItem(sec.id, item.id), className: "text-slate-400 hover:text-rose-600", children: _jsx(Trash2, { className: "w-3 h-3" }) })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2", children: [_jsx("div", { className: "sm:col-span-2", children: _jsx("input", { type: "text", value: item.title, onChange: (e) => handleUpdateItem(sec.id, item.id, { title: e.target.value }), placeholder: "Title / Role (e.g. Student Lead)", className: "w-full px-2 py-1 text-xs border border-slate-300 rounded text-slate-900 bg-white" }) }), _jsx("div", { children: _jsx("input", { type: "text", value: item.date, onChange: (e) => handleUpdateItem(sec.id, item.id, { date: e.target.value }), placeholder: "Date (e.g. 2024)", className: "w-full px-2 py-1 text-xs border border-slate-300 rounded text-slate-900 bg-white" }) }), _jsx("div", { className: "sm:col-span-3", children: _jsx("input", { type: "text", value: item.subtitle, onChange: (e) => handleUpdateItem(sec.id, item.id, { subtitle: e.target.value }), placeholder: "Organization / Subtitle (e.g. IEEE Student Branch)", className: "w-full px-2 py-1 text-xs border border-slate-300 rounded text-slate-900 bg-white" }) }), _jsx("div", { className: "sm:col-span-3", children: _jsx("textarea", { rows: 2, value: item.description, onChange: (e) => handleUpdateItem(sec.id, item.id, { description: e.target.value }), placeholder: "Description of activities, achievements, or duties...", className: "w-full px-2 py-1 text-xs border border-slate-300 rounded text-slate-900 bg-white" }) })] })] }, item.id))) })] }, sec.id)))] }));
};
