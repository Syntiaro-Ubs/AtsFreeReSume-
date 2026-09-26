import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';

export const TemplateWithPhoto = ({ resume }) => {
    const { personal, summary, education, experience, projects, skills, certifications, achievements, languages, customSections, sectionOrder } = resume;

    const renderSection = (type) => {
        switch (type) {
            case 'summary':
                if (!summary) return null;
                return _jsxs("section", { className: "mb-3.5", children: [
                    _jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5", children: "Professional Summary" }),
                    _jsx("p", { className: "text-[11px] text-slate-700 leading-relaxed", children: summary })
                ] }, "summary");

            case 'education':
                if (!education || education.length === 0) return null;
                return _jsxs("section", { className: "mb-3.5", children: [
                    _jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5", children: "Education" }),
                    _jsx("div", { className: "space-y-2", children: education.map((edu) =>
                        _jsxs("div", { className: "text-[11px]", children: [
                            _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                _jsx("span", { className: "font-bold text-slate-900 text-xs", children: `${edu.degree}${edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ''}` }),
                                _jsx("span", { className: "text-[10.5px] text-slate-500 tabular-nums shrink-0 ml-2", children: `${edu.startDate} – ${edu.isCurrent ? 'Present' : edu.endDate}` })
                            ] }),
                            _jsxs("div", { className: "flex justify-between items-baseline text-slate-600", children: [
                                _jsx("span", { className: "font-medium", children: `${edu.institution}${edu.location ? `, ${edu.location}` : ''}` }),
                                edu.grade && _jsx("span", { className: "font-semibold text-slate-700 shrink-0 ml-2", children: edu.grade })
                            ] }),
                            edu.description && _jsx("p", { className: "text-[10.5px] text-slate-500 mt-0.5 italic", children: edu.description })
                        ] }, edu.id)
                    ) })
                ] }, "education");

            case 'experience':
                if (!experience || experience.length === 0) return null;
                return _jsxs("section", { className: "mb-3.5", children: [
                    _jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5", children: "Work Experience" }),
                    _jsx("div", { className: "space-y-2.5", children: experience.map((exp) =>
                        _jsxs("div", { children: [
                            _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                _jsx("span", { className: "font-bold text-xs text-slate-900", children: exp.jobTitle }),
                                _jsx("span", { className: "text-[10.5px] text-slate-500 tabular-nums shrink-0 ml-2", children: `${exp.startDate} – ${exp.isCurrent ? 'Present' : exp.endDate}` })
                            ] }),
                            _jsxs("div", { className: "flex justify-between items-baseline text-[11px] text-slate-600 mb-1", children: [
                                _jsx("span", { className: "font-medium", children: `${exp.company}${exp.location ? `, ${exp.location}` : ''}` }),
                                exp.employmentType && _jsx("span", { className: "text-[10px] uppercase font-semibold text-slate-500 shrink-0 ml-2", children: exp.employmentType })
                            ] }),
                            exp.bullets && exp.bullets.length > 0 && _jsx("ul", { className: "list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700", children:
                                exp.bullets.filter(Boolean).map((b, i) => _jsx("li", { className: "leading-snug pl-0.5", children: b }, i))
                            })
                        ] }, exp.id)
                    ) })
                ] }, "experience");

            case 'projects':
                if (!projects || projects.length === 0) return null;
                return _jsxs("section", { className: "mb-3.5", children: [
                    _jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5", children: "Projects" }),
                    _jsx("div", { className: "space-y-2.5", children: projects.map((proj) =>
                        _jsxs("div", { children: [
                            _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                _jsxs("span", { className: "font-bold text-xs text-slate-900", children: [
                                    proj.name,
                                    proj.role && _jsxs("span", { className: "font-normal text-slate-500 ml-1 text-[11px]", children: [`(${proj.role})`] })
                                ] }),
                                _jsxs("div", { className: "text-[10px] text-slate-500 space-x-2 shrink-0 ml-2", children: [
                                    proj.githubUrl && _jsx("span", { children: "GitHub" }),
                                    proj.liveUrl && _jsx("span", { children: "Live" })
                                ] })
                            ] }),
                            proj.technologies && _jsxs("div", { className: "text-[10.5px] text-slate-600 mb-0.5", children: [
                                _jsx("span", { className: "font-semibold", children: "Tech: " }),
                                proj.technologies
                            ] }),
                            proj.description && _jsx("p", { className: "text-[11px] text-slate-700 mb-0.5 leading-snug", children: proj.description }),
                            proj.bullets && proj.bullets.length > 0 && _jsx("ul", { className: "list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700", children:
                                proj.bullets.filter(Boolean).map((b, i) => _jsx("li", { className: "leading-snug pl-0.5", children: b }, i))
                            })
                        ] }, proj.id)
                    ) })
                ] }, "projects");

            case 'skills': {
                const categories = Object.entries(skills).filter(([_, list]) => list && list.length > 0);
                if (categories.length === 0) return null;
                const labelMap = {
                    programming: 'Languages', frontend: 'Frontend', backend: 'Backend',
                    databases: 'Databases', frameworks: 'Frameworks', tools: 'Tools', other: 'Other',
                };
                return _jsxs("section", { className: "mb-3.5", children: [
                    _jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5", children: "Technical Skills" }),
                    _jsx("div", { className: "space-y-1 text-[11px]", children: categories.map(([cat, items]) =>
                        _jsxs("div", { className: "flex items-baseline", children: [
                            _jsxs("span", { className: "font-bold w-28 shrink-0 text-slate-800", children: [`${labelMap[cat] || cat}:`] }),
                            _jsx("span", { className: "text-slate-700", children: items.join(', ') })
                        ] }, cat)
                    ) })
                ] }, "skills");
            }

            case 'certifications':
                if (!certifications || certifications.length === 0) return null;
                return _jsxs("section", { className: "mb-3.5", children: [
                    _jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5", children: "Certifications" }),
                    _jsx("div", { className: "space-y-1 text-[11px]", children: certifications.map((cert) =>
                        _jsxs("div", { className: "flex justify-between items-baseline", children: [
                            _jsxs("div", { children: [
                                _jsx("span", { className: "font-semibold text-slate-900", children: cert.name }),
                                ` — ${cert.issuer}`
                            ] }),
                            cert.date && _jsx("span", { className: "text-[10.5px] text-slate-500 tabular-nums shrink-0 ml-2", children: cert.date })
                        ] }, cert.id)
                    ) })
                ] }, "certifications");

            case 'achievements':
                if (!achievements || achievements.length === 0) return null;
                return _jsxs("section", { className: "mb-3.5", children: [
                    _jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5", children: "Achievements" }),
                    _jsx("div", { className: "space-y-1 text-[11px]", children: achievements.map((ach) =>
                        _jsxs("div", { children: [
                            _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                _jsx("span", { className: "font-semibold text-slate-900", children: ach.title }),
                                ach.date && _jsx("span", { className: "text-[10.5px] text-slate-500 tabular-nums shrink-0 ml-2", children: ach.date })
                            ] }),
                            ach.description && _jsx("p", { className: "text-[10.5px] text-slate-600", children: ach.description })
                        ] }, ach.id)
                    ) })
                ] }, "achievements");

            case 'languages':
                if (!languages || languages.length === 0) return null;
                return _jsxs("section", { className: "mb-3", children: [
                    _jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5", children: "Languages" }),
                    _jsx("p", { className: "text-[11px] text-slate-700", children: languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(' • ') })
                ] }, "languages");

            case 'custom':
                if (!customSections || customSections.length === 0) return null;
                return _jsx(React.Fragment, { children: customSections.map((sec) =>
                    _jsxs("section", { className: "mb-3.5", children: [
                        _jsx("h2", { className: "text-[10.5px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5", children: sec.title }),
                        _jsx("div", { className: "space-y-1.5", children: sec.items.map((item) =>
                            _jsxs("div", { className: "text-[11px]", children: [
                                _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                    _jsx("span", { className: "font-semibold text-slate-900", children: item.title }),
                                    item.date && _jsx("span", { className: "text-[10.5px] text-slate-500 tabular-nums shrink-0 ml-2", children: item.date })
                                ] }),
                                item.subtitle && _jsx("div", { className: "text-[10.5px] text-slate-600", children: item.subtitle }),
                                item.description && _jsx("p", { className: "text-slate-700 mt-0.5", children: item.description })
                            ] }, item.id)
                        ) })
                    ] }, sec.id)
                ) }, "custom");

            default:
                return null;
        }
    };

    const contactItems = [personal.email, personal.phone, personal.location, personal.linkedin, personal.github, personal.portfolio].filter(Boolean);

    return _jsxs("div", { className: "text-slate-900 w-full", children: [

        /* ── HEADER: photo on right, info on left ── */
        _jsxs("header", { className: "mb-4 pb-3 border-b-2 border-slate-800", children: [
            _jsxs("div", { className: "flex items-start justify-between gap-4", children: [

                /* Left: name + contact */
                _jsxs("div", { className: "flex-1 min-w-0", children: [
                    _jsx("h1", { className: "text-[22px] font-bold tracking-tight text-slate-900 uppercase leading-none", children: personal.fullName || 'YOUR NAME' }),
                    personal.title && _jsx("p", { className: "text-[12px] font-semibold text-slate-600 mt-1 mb-2", children: personal.title }),
                    contactItems.length > 0 && _jsx("div", { className: "flex flex-wrap gap-x-3 gap-y-0.5", children:
                        contactItems.map((item, idx) => _jsxs("span", { className: "text-[10px] text-slate-600 whitespace-nowrap", children: [
                            idx > 0 && _jsx("span", { className: "mr-3 text-slate-300", children: "·" }),
                            item
                        ] }, idx))
                    })
                ] }),

                /* Right: photo circle */
                _jsxs("div", { className: "shrink-0", children: [
                    personal.photo
                        ? _jsx("img", {
                            src: personal.photo,
                            alt: personal.fullName || 'Profile photo',
                            className: "w-[68px] h-[68px] rounded-full object-cover border-2 border-slate-200",
                            style: { minWidth: '68px' }
                        })
                        : _jsx("div", {
                            className: "w-[68px] h-[68px] rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center",
                            style: { minWidth: '68px' },
                            children: _jsx("span", { className: "text-[9px] text-slate-400 text-center leading-tight px-1", children: "Add Photo" })
                        })
                ] })

            ] })
        ] }),

        /* ── BODY ── */
        _jsx("main", { children: sectionOrder.map((key) => renderSection(key)) })

    ] });
};
