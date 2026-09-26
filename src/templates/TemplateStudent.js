import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export const TemplateStudent = ({ resume }) => {
    const { personal, summary, education, experience, projects, skills, certifications, achievements, languages, customSections, sectionOrder } = resume;
    const renderSection = (type) => {
        switch (type) {
            case 'summary':
                if (!summary)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-950 border-b border-indigo-200 pb-0.5 mb-1.5 flex items-center justify-between", children: _jsx("span", { children: "Career Objective & Profile" }) }), _jsx("p", { className: "text-[11px] text-slate-800 leading-relaxed text-justify", children: summary })] }, "summary"));
            case 'education':
                if (!education || education.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-950 border-b border-indigo-200 pb-0.5 mb-1.5 flex items-center justify-between", children: _jsx("span", { children: "Education" }) }), _jsx("div", { className: "space-y-2", children: education.map((edu) => (_jsxs("div", { className: "text-[11px]", children: [_jsxs("div", { className: "flex justify-between items-baseline font-bold text-slate-900", children: [_jsxs("span", { className: "text-xs", children: [edu.degree, edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ''] }), _jsxs("span", { className: "text-[11px] font-semibold text-slate-600 tabular-nums shrink-0 ml-2", children: [edu.startDate, " \u2013 ", edu.isCurrent ? 'Present' : edu.endDate] })] }), _jsxs("div", { className: "flex justify-between items-baseline text-slate-700", children: [_jsxs("span", { className: "font-medium text-slate-800", children: [edu.institution, edu.location ? `, ${edu.location}` : ''] }), edu.grade && _jsx("span", { className: "font-bold text-indigo-950 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100 shrink-0 ml-2", children: edu.grade })] }), edu.description && _jsx("p", { className: "text-[10.5px] text-slate-600 mt-0.5 italic", children: edu.description })] }, edu.id))) })] }, "education"));
            case 'projects':
                if (!projects || projects.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-950 border-b border-indigo-200 pb-0.5 mb-1.5 flex items-center justify-between", children: _jsx("span", { children: "Academic & Independent Projects" }) }), _jsx("div", { className: "space-y-2.5", children: projects.map((proj) => (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-baseline", children: [_jsxs("span", { className: "font-bold text-xs text-slate-900", children: [proj.name, proj.role && _jsxs("span", { className: "font-normal text-indigo-700 ml-1 text-[11px]", children: ["(", proj.role, ")"] })] }), _jsxs("div", { className: "text-[10px] text-indigo-600 space-x-2 shrink-0 ml-2", children: [proj.githubUrl && _jsx("span", { children: "Code Repo" }), proj.liveUrl && _jsx("span", { children: "Live Demo" })] })] }), proj.technologies && (_jsxs("div", { className: "text-[10.5px] text-slate-600 mb-0.5", children: [_jsx("span", { className: "font-semibold text-slate-800", children: "Stack: " }), proj.technologies] })), proj.description && _jsx("p", { className: "text-[11px] text-slate-700 mb-0.5 leading-snug", children: proj.description }), proj.bullets && proj.bullets.length > 0 && (_jsx("ul", { className: "list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700", children: proj.bullets.filter(Boolean).map((b, idx) => (_jsx("li", { className: "leading-snug pl-0.5", children: b }, idx))) }))] }, proj.id))) })] }, "projects"));
            case 'skills': {
                const categories = Object.entries(skills).filter(([_, list]) => list && list.length > 0);
                if (categories.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-950 border-b border-indigo-200 pb-0.5 mb-1.5 flex items-center justify-between", children: _jsx("span", { children: "Technical & Programming Skills" }) }), _jsx("div", { className: "space-y-1 text-[11px] text-slate-700", children: categories.map(([category, items]) => {
                                const labelMap = {
                                    programming: 'Languages',
                                    frontend: 'Frontend & UI',
                                    backend: 'Backend & APIs',
                                    databases: 'Databases',
                                    frameworks: 'Libraries & Tools',
                                    tools: 'Developer Utilities',
                                    other: 'Other Competencies',
                                };
                                return (_jsxs("div", { className: "flex items-baseline", children: [_jsxs("span", { className: "font-bold w-36 shrink-0 text-slate-900", children: [labelMap[category] || category, ":"] }), _jsx("span", { className: "flex-1 text-slate-800", children: items.join(', ') })] }, category));
                            }) })] }, "skills"));
            }
            case 'experience':
                if (!experience || experience.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-950 border-b border-indigo-200 pb-0.5 mb-1.5 flex items-center justify-between", children: _jsx("span", { children: "Internships & Experience" }) }), _jsx("div", { className: "space-y-2.5", children: experience.map((exp) => (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-baseline", children: [_jsx("span", { className: "font-bold text-xs text-slate-900", children: exp.jobTitle }), _jsxs("span", { className: "text-[11px] text-slate-600 font-medium tabular-nums shrink-0 ml-2", children: [exp.startDate, " \u2013 ", exp.isCurrent ? 'Present' : exp.endDate] })] }), _jsxs("div", { className: "flex justify-between items-baseline text-[11px] text-slate-600 mb-1", children: [_jsxs("span", { className: "font-medium text-slate-800", children: [exp.company, exp.location ? `, ${exp.location}` : ''] }), exp.employmentType && _jsx("span", { className: "text-indigo-900 text-[10px] uppercase font-bold shrink-0 ml-2", children: exp.employmentType })] }), exp.bullets && exp.bullets.length > 0 && (_jsx("ul", { className: "list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700", children: exp.bullets.filter(Boolean).map((bullet, idx) => (_jsx("li", { className: "leading-snug pl-0.5", children: bullet }, idx))) }))] }, exp.id))) })] }, "experience"));
            case 'certifications':
                if (!certifications || certifications.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-950 border-b border-indigo-200 pb-0.5 mb-1.5 flex items-center justify-between", children: _jsx("span", { children: "Certifications & Courses" }) }), _jsx("div", { className: "space-y-1 text-[11px]", children: certifications.map((cert) => (_jsxs("div", { className: "flex justify-between items-baseline", children: [_jsxs("div", { className: "text-slate-800", children: [_jsx("span", { className: "font-bold text-slate-900", children: cert.name }), " \u2014 ", cert.issuer, cert.credentialId && _jsxs("span", { className: "text-[10px] text-slate-500 ml-1.5", children: ["(ID: ", cert.credentialId, ")"] })] }), cert.date && _jsx("span", { className: "text-[10.5px] text-slate-600 tabular-nums shrink-0 ml-2", children: cert.date })] }, cert.id))) })] }, "certifications"));
            case 'achievements':
                if (!achievements || achievements.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-950 border-b border-indigo-200 pb-0.5 mb-1.5 flex items-center justify-between", children: _jsx("span", { children: "Key Achievements & Activities" }) }), _jsx("div", { className: "space-y-1 text-[11px]", children: achievements.map((ach) => (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-baseline", children: [_jsx("span", { className: "font-semibold text-slate-900", children: ach.title }), ach.date && _jsx("span", { className: "text-[10.5px] text-slate-600 tabular-nums shrink-0 ml-2", children: ach.date })] }), ach.description && _jsx("p", { className: "text-[10.5px] text-slate-600", children: ach.description })] }, ach.id))) })] }, "achievements"));
            case 'languages':
                if (!languages || languages.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3", children: [_jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-950 border-b border-indigo-200 pb-0.5 mb-1.5 flex items-center justify-between", children: _jsx("span", { children: "Languages Known" }) }), _jsx("p", { className: "text-[11px] text-slate-700", children: languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(' • ') })] }, "languages"));
            case 'custom':
                if (!customSections || customSections.length === 0)
                    return null;
                return (_jsx(React.Fragment, { children: customSections.map((sec) => (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-950 border-b border-indigo-200 pb-0.5 mb-1.5", children: sec.title }), _jsx("div", { className: "space-y-1.5", children: sec.items.map((item) => (_jsxs("div", { className: "text-[11px]", children: [_jsxs("div", { className: "flex justify-between items-baseline", children: [_jsx("span", { className: "font-semibold text-slate-900", children: item.title }), item.date && _jsx("span", { className: "text-[10.5px] text-slate-600 tabular-nums shrink-0 ml-2", children: item.date })] }), item.subtitle && _jsx("div", { className: "text-[10.5px] text-slate-600", children: item.subtitle }), item.description && _jsx("p", { className: "text-slate-700 mt-0.5", children: item.description })] }, item.id))) })] }, sec.id))) }, "custom"));
            default:
                return null;
        }
    };
    const contactItems = [
        personal.email,
        personal.phone,
        personal.location,
        personal.linkedin,
        personal.github,
        personal.portfolio,
    ].filter(Boolean);
    return (_jsxs("div", { className: "text-slate-900 w-full", children: [_jsx("header", { className: "mb-3.5 pb-2 border-b-2 border-indigo-900", children: _jsxs("div", { className: "flex justify-between items-baseline", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight text-indigo-950 uppercase leading-none", children: personal.fullName || 'YOUR NAME' }), personal.title && (_jsx("p", { className: "text-xs font-semibold text-slate-600 mt-1", children: personal.title }))] }), contactItems.length > 0 && (_jsx("div", { className: "text-[10.5px] text-slate-600 text-right leading-relaxed max-w-[55%]", children: _jsx("div", { className: "flex flex-wrap justify-end gap-x-2 gap-y-0.5", children: contactItems.map((item, idx) => (_jsxs("span", { className: "whitespace-nowrap", children: [idx > 0 && _jsx("span", { className: "mr-2 text-slate-300", children: "|" }), item] }, idx))) }) }))] }) }), _jsx("main", { children: sectionOrder.map((sectionKey) => renderSection(sectionKey)) })] }));
};
