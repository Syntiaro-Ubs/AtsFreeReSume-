import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export const TemplateMinimal = ({ resume }) => {
    const { personal, summary, education, experience, projects, skills, certifications, achievements, languages, customSections, sectionOrder } = resume;
    const renderSection = (type) => {
        switch (type) {
            case 'summary':
                if (!summary)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-widest text-black mb-1", children: "Summary" }), _jsx("p", { className: "text-[11px] text-neutral-800 leading-relaxed text-justify", children: summary })] }, "summary"));
            case 'education':
                if (!education || education.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-widest text-black mb-1.5", children: "Education" }), _jsx("div", { className: "space-y-2", children: education.map((edu) => (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-baseline", children: [_jsxs("span", { className: "font-bold text-xs text-black", children: [edu.degree, edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''] }), _jsxs("span", { className: "text-[10.5px] text-neutral-500 tabular-nums shrink-0 ml-2", children: [edu.startDate, " \u2013 ", edu.isCurrent ? 'Present' : edu.endDate] })] }), _jsxs("div", { className: "flex justify-between items-baseline text-[11px] text-neutral-600", children: [_jsxs("span", { children: [edu.institution, edu.location ? ` — ${edu.location}` : ''] }), edu.grade && _jsx("span", { className: "text-black font-semibold shrink-0 ml-2", children: edu.grade })] }), edu.description && _jsx("p", { className: "text-[10.5px] text-neutral-600 mt-0.5", children: edu.description })] }, edu.id))) })] }, "education"));
            case 'experience':
                if (!experience || experience.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-widest text-black mb-1.5", children: "Experience" }), _jsx("div", { className: "space-y-2.5", children: experience.map((exp) => (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-baseline", children: [_jsx("span", { className: "font-bold text-xs text-black", children: exp.jobTitle }), _jsxs("span", { className: "text-[10.5px] text-neutral-500 tabular-nums shrink-0 ml-2", children: [exp.startDate, " \u2013 ", exp.isCurrent ? 'Present' : exp.endDate] })] }), _jsxs("div", { className: "flex justify-between items-baseline text-[11px] text-neutral-600 mb-1", children: [_jsxs("span", { children: [exp.company, exp.location ? ` • ${exp.location}` : ''] }), exp.employmentType && _jsx("span", { className: "text-neutral-500 text-[10px] shrink-0 ml-2", children: exp.employmentType })] }), exp.bullets && exp.bullets.length > 0 && (_jsx("ul", { className: "list-disc list-outside ml-4 space-y-0.5 text-[11px] text-neutral-800", children: exp.bullets.filter(Boolean).map((bullet, idx) => (_jsx("li", { className: "leading-snug pl-0.5", children: bullet }, idx))) }))] }, exp.id))) })] }, "experience"));
            case 'projects':
                if (!projects || projects.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-widest text-black mb-1.5", children: "Projects" }), _jsx("div", { className: "space-y-2", children: projects.map((proj) => (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-baseline", children: [_jsxs("span", { className: "font-bold text-xs text-black", children: [proj.name, proj.role && _jsxs("span", { className: "font-normal text-neutral-500 ml-1 text-[11px]", children: ["(", proj.role, ")"] })] }), _jsxs("div", { className: "text-[10px] text-neutral-500 space-x-2 shrink-0 ml-2", children: [proj.githubUrl && _jsx("span", { children: "GitHub" }), proj.liveUrl && _jsx("span", { children: "Live" })] })] }), proj.technologies && (_jsxs("div", { className: "text-[10.5px] text-neutral-600 mb-0.5", children: [_jsx("span", { className: "font-semibold text-neutral-900", children: "Tech: " }), proj.technologies] })), proj.description && _jsx("p", { className: "text-[11px] text-neutral-800 mb-0.5 leading-snug", children: proj.description }), proj.bullets && proj.bullets.length > 0 && (_jsx("ul", { className: "list-disc list-outside ml-4 space-y-0.5 text-[11px] text-neutral-800", children: proj.bullets.filter(Boolean).map((b, idx) => (_jsx("li", { className: "leading-snug pl-0.5", children: b }, idx))) }))] }, proj.id))) })] }, "projects"));
            case 'skills': {
                const categories = Object.entries(skills).filter(([_, list]) => list && list.length > 0);
                if (categories.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-widest text-black mb-1.5", children: "Skills" }), _jsx("div", { className: "space-y-1 text-[11px] text-neutral-800", children: categories.map(([category, items]) => {
                                const labelMap = {
                                    programming: 'Languages',
                                    frontend: 'Frontend',
                                    backend: 'Backend',
                                    databases: 'Databases',
                                    frameworks: 'Frameworks',
                                    tools: 'Tools',
                                    other: 'Other',
                                };
                                return (_jsxs("div", { className: "flex items-baseline", children: [_jsxs("span", { className: "font-bold w-28 shrink-0 text-black", children: [labelMap[category] || category, ":"] }), _jsx("span", { className: "flex-1", children: items.join(', ') })] }, category));
                            }) })] }, "skills"));
            }
            case 'certifications':
                if (!certifications || certifications.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-widest text-black mb-1.5", children: "Certifications" }), _jsx("div", { className: "space-y-1 text-[11px]", children: certifications.map((cert) => (_jsxs("div", { className: "flex justify-between items-baseline", children: [_jsxs("div", { className: "text-neutral-800", children: [_jsx("span", { className: "font-semibold text-black", children: cert.name }), " \u2014 ", cert.issuer, cert.credentialId && _jsxs("span", { className: "text-[10px] text-neutral-500 ml-1.5", children: ["(", cert.credentialId, ")"] })] }), cert.date && _jsx("span", { className: "text-[10.5px] text-neutral-500 tabular-nums shrink-0 ml-2", children: cert.date })] }, cert.id))) })] }, "certifications"));
            case 'achievements':
                if (!achievements || achievements.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-widest text-black mb-1.5", children: "Achievements" }), _jsx("div", { className: "space-y-1 text-[11px]", children: achievements.map((ach) => (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-baseline", children: [_jsx("span", { className: "font-semibold text-black", children: ach.title }), ach.date && _jsx("span", { className: "text-[10.5px] text-neutral-500 tabular-nums shrink-0 ml-2", children: ach.date })] }), ach.description && _jsx("p", { className: "text-[10.5px] text-neutral-600", children: ach.description })] }, ach.id))) })] }, "achievements"));
            case 'languages':
                if (!languages || languages.length === 0)
                    return null;
                return (_jsxs("section", { className: "mb-3", children: [_jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-widest text-black mb-1", children: "Languages" }), _jsx("p", { className: "text-[11px] text-neutral-800", children: languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(' • ') })] }, "languages"));
            case 'custom':
                if (!customSections || customSections.length === 0)
                    return null;
                return (_jsx(React.Fragment, { children: customSections.map((sec) => (_jsxs("section", { className: "mb-3.5", children: [_jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-widest text-black mb-1.5", children: sec.title }), _jsx("div", { className: "space-y-1.5", children: sec.items.map((item) => (_jsxs("div", { className: "text-[11px]", children: [_jsxs("div", { className: "flex justify-between items-baseline", children: [_jsx("span", { className: "font-semibold text-black", children: item.title }), item.date && _jsx("span", { className: "text-[10.5px] text-neutral-500 tabular-nums shrink-0 ml-2", children: item.date })] }), item.subtitle && _jsx("div", { className: "text-[10.5px] text-neutral-600", children: item.subtitle }), item.description && _jsx("p", { className: "text-neutral-800 mt-0.5", children: item.description })] }, item.id))) })] }, sec.id))) }, "custom"));
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
    return (_jsxs("div", { className: "text-neutral-900 w-full", children: [_jsxs("header", { className: "mb-3.5 pb-2 border-b border-black", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight text-black uppercase", children: personal.fullName || 'YOUR NAME' }), personal.title && (_jsx("p", { className: "text-xs text-neutral-600 mt-0.5 font-medium", children: personal.title })), contactItems.length > 0 && (_jsx("div", { className: "text-[10.5px] text-neutral-600 mt-1 flex flex-wrap gap-x-2.5", children: contactItems.map((item, idx) => (_jsxs("span", { className: "whitespace-nowrap", children: [idx > 0 && _jsx("span", { className: "mr-2 text-neutral-300", children: "/" }), item] }, idx))) }))] }), _jsx("main", { children: sectionOrder.map((sectionKey) => renderSection(sectionKey)) })] }));
};
