import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';

export const TemplateCreative = ({ resume }) => {
    const { personal, summary, education, experience, projects, skills, certifications, achievements, languages, customSections, sectionOrder } = resume;

    const renderSection = (type) => {
        switch (type) {
            case 'summary':
                if (!summary) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsxs("h2", { className: "text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-1 rounded border-l-3 border-emerald-600 mb-2 font-sans flex items-center", children: [
                            _jsx("span", { children: "Professional Profile" })
                        ] }),
                        _jsx("p", { className: "text-[11px] text-slate-700 leading-relaxed text-justify px-0.5", children: summary })
                    ] }, "summary")
                );
            case 'education':
                if (!education || education.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-1 rounded border-l-3 border-emerald-600 mb-2 font-sans", children: "Education & Qualifications" }),
                        _jsx("div", { className: "space-y-2.5 px-0.5", children:
                            education.map((edu) => (
                                _jsxs("div", { children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsxs("span", { className: "font-bold text-xs text-slate-900", children: [edu.degree, edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''] }),
                                        _jsxs("span", { className: "text-[10.5px] font-semibold text-emerald-700 font-sans tabular-nums bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100", children: [edu.startDate, " – ", edu.isCurrent ? 'Present' : edu.endDate] })
                                    ] }),
                                    _jsxs("div", { className: "flex justify-between items-baseline text-[11px] text-slate-600", children: [
                                        _jsxs("span", { className: "font-medium", children: [edu.institution, edu.location ? `, ${edu.location}` : ''] }),
                                        edu.grade && _jsxs("span", { className: "font-semibold text-emerald-800 font-sans text-[10.5px]", children: ["GPA/Grade: ", edu.grade] })
                                    ] }),
                                    edu.description && _jsx("p", { className: "text-[10.5px] text-slate-600 mt-0.5 leading-snug", children: edu.description })
                                ] }, edu.id)
                            ))
                        })
                    ] }, "education")
                );
            case 'experience':
                if (!experience || experience.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-1 rounded border-l-3 border-emerald-600 mb-2 font-sans", children: "Work Experience" }),
                        _jsx("div", { className: "space-y-3 px-0.5", children:
                            experience.map((exp) => (
                                _jsxs("div", { children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsx("span", { className: "font-bold text-xs text-slate-900", children: exp.jobTitle }),
                                        _jsxs("span", { className: "text-[10.5px] font-semibold text-emerald-700 font-sans tabular-nums bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100", children: [exp.startDate, " – ", exp.isCurrent ? 'Present' : exp.endDate] })
                                    ] }),
                                    _jsxs("div", { className: "flex justify-between items-baseline text-[11px] text-slate-600 mb-1", children: [
                                        _jsxs("span", { className: "font-medium text-emerald-900", children: [exp.company, exp.location ? `, ${exp.location}` : ''] }),
                                        exp.employmentType && _jsx("span", { className: "text-slate-400 text-[10px] uppercase font-sans", children: exp.employmentType })
                                    ] }),
                                    exp.bullets && exp.bullets.length > 0 && (
                                        _jsx("ul", { className: "list-disc list-outside ml-4 space-y-1 text-[11px] text-slate-700", children:
                                            exp.bullets.filter(Boolean).map((bullet, idx) => (
                                                _jsx("li", { className: "leading-snug pl-0.5", children: bullet }, idx)
                                            ))
                                        })
                                    )
                                ] }, exp.id)
                            ))
                        })
                    ] }, "experience")
                );
            case 'projects':
                if (!projects || projects.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-1 rounded border-l-3 border-emerald-600 mb-2 font-sans", children: "Key Projects & Deliverables" }),
                        _jsx("div", { className: "space-y-2.5 px-0.5", children:
                            projects.map((proj) => (
                                _jsxs("div", { children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsxs("span", { className: "font-bold text-xs text-slate-900", children: [
                                            proj.name,
                                            proj.role && _jsxs("span", { className: "font-normal text-slate-500 ml-1 text-[11px]", children: ["(", proj.role, ")"] })
                                        ] }),
                                        _jsxs("div", { className: "text-[10px] text-emerald-700 space-x-2 font-sans font-medium", children: [
                                            proj.githubUrl && _jsx("span", { children: "Source Code" }),
                                            proj.liveUrl && _jsx("span", { children: "Live App" })
                                        ] })
                                    ] }),
                                    proj.technologies && (
                                        _jsxs("div", { className: "text-[10.5px] text-emerald-800 font-sans mb-1 font-medium", children: [
                                            "Stack: ", proj.technologies
                                        ] })
                                    ),
                                    proj.description && _jsx("p", { className: "text-[11px] text-slate-700 mb-1 leading-snug", children: proj.description }),
                                    proj.bullets && proj.bullets.length > 0 && (
                                        _jsx("ul", { className: "list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700", children:
                                            proj.bullets.filter(Boolean).map((b, idx) => (
                                                _jsx("li", { className: "leading-snug pl-0.5", children: b }, idx)
                                            ))
                                        })
                                    )
                                ] }, proj.id)
                            ))
                        })
                    ] }, "projects")
                );
            case 'skills': {
                const categories = Object.entries(skills).filter(([_, list]) => list && list.length > 0);
                if (categories.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-1 rounded border-l-3 border-emerald-600 mb-2 font-sans", children: "Technical Skills & Competencies" }),
                        _jsx("div", { className: "space-y-1.5 text-[11px] text-slate-800 px-0.5", children:
                            categories.map(([category, items]) => {
                                const labelMap = {
                                    programming: 'Languages',
                                    frontend: 'Frontend',
                                    backend: 'Backend & APIs',
                                    databases: 'Databases',
                                    frameworks: 'Frameworks',
                                    tools: 'Tools & DevOps',
                                    other: 'Additional Skills',
                                };
                                return (
                                    _jsxs("div", { className: "flex items-baseline", children: [
                                        _jsxs("span", { className: "font-bold w-32 shrink-0 text-slate-900 font-sans", children: [labelMap[category] || category, ":"] }),
                                        _jsx("div", { className: "flex flex-wrap gap-1 flex-1", children:
                                            items.map((item) => (
                                                _jsx("span", { className: "bg-slate-100 text-slate-800 text-[10px] font-medium px-1.5 py-0.5 rounded border border-slate-200", children: item }, item)
                                            ))
                                        })
                                    ] }, category)
                                );
                            })
                        })
                    ] }, "skills")
                );
            }
            case 'certifications':
                if (!certifications || certifications.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-1 rounded border-l-3 border-emerald-600 mb-2 font-sans", children: "Certifications & Badges" }),
                        _jsx("div", { className: "space-y-1 text-[11px] px-0.5", children:
                            certifications.map((cert) => (
                                _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                    _jsxs("div", { className: "text-slate-800", children: [
                                        _jsx("span", { className: "font-bold text-slate-900", children: cert.name }),
                                        " — ",
                                        _jsx("span", { className: "text-emerald-800 font-medium", children: cert.issuer })
                                    ] }),
                                    cert.date && _jsx("span", { className: "text-[10.5px] text-slate-500 font-sans tabular-nums", children: cert.date })
                                ] }, cert.id)
                            ))
                        })
                    ] }, "certifications")
                );
            case 'achievements':
                if (!achievements || achievements.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-1 rounded border-l-3 border-emerald-600 mb-2 font-sans", children: "Honors & Key Achievements" }),
                        _jsx("div", { className: "space-y-1 text-[11px] px-0.5", children:
                            achievements.map((ach) => (
                                _jsxs("div", { children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsx("span", { className: "font-bold text-slate-900", children: ach.title }),
                                        ach.date && _jsx("span", { className: "text-[10.5px] text-slate-500 font-sans tabular-nums", children: ach.date })
                                    ] }),
                                    ach.description && _jsx("p", { className: "text-[10.5px] text-slate-600", children: ach.description })
                                ] }, ach.id)
                            ))
                        })
                    ] }, "achievements")
                );
            case 'languages':
                if (!languages || languages.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-3", children: [
                        _jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-1 rounded border-l-3 border-emerald-600 mb-2 font-sans", children: "Languages" }),
                        _jsx("p", { className: "text-[11px] text-slate-800 px-0.5", children: languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(' • ') })
                    ] }, "languages")
                );
            case 'custom':
                if (!customSections || customSections.length === 0) return null;
                return (
                    _jsx(React.Fragment, { children:
                        customSections.map((sec) => (
                            _jsxs("section", { className: "mb-4", children: [
                                _jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-1 rounded border-l-3 border-emerald-600 mb-2 font-sans", children: sec.title }),
                                _jsx("div", { className: "space-y-1.5 px-0.5", children:
                                    sec.items.map((item) => (
                                        _jsxs("div", { className: "text-[11px]", children: [
                                            _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                                _jsx("span", { className: "font-bold text-slate-900", children: item.title }),
                                                item.date && _jsx("span", { className: "text-[10.5px] text-slate-500 font-sans tabular-nums", children: item.date })
                                            ] }),
                                            item.subtitle && _jsx("div", { className: "text-[10.5px] text-slate-600 italic", children: item.subtitle }),
                                            item.description && _jsx("p", { className: "text-slate-800 mt-0.5", children: item.description })
                                        ] }, item.id)
                                    ))
                                })
                            ] }, sec.id)
                        ))
                    }, "custom")
                );
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

    return (
        _jsxs("div", { className: "font-sans text-slate-900 w-full p-2", children: [
            _jsxs("header", { className: "bg-emerald-900 text-white rounded-xl p-5 mb-4 shadow-xs", children: [
                _jsx("h1", { className: "text-2xl font-black tracking-tight text-white uppercase", children: personal.fullName || 'YOUR NAME' }),
                personal.title && (
                    _jsx("p", { className: "text-xs font-semibold text-emerald-300 uppercase tracking-wider mt-0.5", children: personal.title })
                ),
                contactItems.length > 0 && (
                    _jsx("div", { className: "text-[11px] text-emerald-100 mt-3 flex flex-wrap gap-x-3 gap-y-1 font-medium", children:
                        contactItems.map((item, idx) => (
                            _jsxs("span", { className: "flex items-center", children: [
                                idx > 0 && _jsx("span", { className: "mr-3 text-emerald-500", children: "•" }),
                                _jsx("span", { children: item })
                            ] }, idx))
                        )
                    })
                )
            ] }),
            _jsx("main", { className: "px-1", children: sectionOrder.map((sectionKey) => renderSection(sectionKey)) })
        ] })
    );
};
