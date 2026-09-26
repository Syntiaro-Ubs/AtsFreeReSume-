import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';

export const TemplateTech = ({ resume }) => {
    const { personal, summary, education, experience, projects, skills, certifications, achievements, languages, customSections, sectionOrder } = resume;

    const renderSection = (type) => {
        switch (type) {
            case 'summary':
                if (!summary) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsxs("div", { className: "flex items-center space-x-2 mb-1.5", children: [
                            _jsx("span", { className: "text-xs font-mono font-bold text-slate-900 uppercase tracking-wide", children: "// Developer Summary" }),
                            _jsx("div", { className: "h-px bg-slate-300 flex-1" })
                        ] }),
                        _jsx("p", { className: "text-[11px] font-sans text-slate-800 leading-relaxed text-justify bg-slate-50 p-2.5 rounded border border-slate-200", children: summary })
                    ] }, "summary")
                );
            case 'skills': {
                const categories = Object.entries(skills).filter(([_, list]) => list && list.length > 0);
                if (categories.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                            _jsx("span", { className: "text-xs font-mono font-bold text-slate-900 uppercase tracking-wide", children: "// Technical Stack & Expertise" }),
                            _jsx("div", { className: "h-px bg-slate-300 flex-1" })
                        ] }),
                        _jsx("div", { className: "space-y-2 text-[11px]", children:
                            categories.map(([category, items]) => {
                                const labelMap = {
                                    programming: 'Languages',
                                    frontend: 'Frontend',
                                    backend: 'Backend',
                                    databases: 'Databases',
                                    frameworks: 'Frameworks',
                                    tools: 'DevOps & Tools',
                                    other: 'Other Tech',
                                };
                                return (
                                    _jsxs("div", { className: "flex items-start", children: [
                                        _jsxs("span", { className: "font-mono font-bold w-32 shrink-0 text-slate-900 text-[10.5px] pt-0.5", children: [labelMap[category] || category, ":"] }),
                                        _jsx("div", { className: "flex flex-wrap gap-1 flex-1", children:
                                            items.map((item) => (
                                                _jsxs("span", { className: "bg-slate-900 text-cyan-400 font-mono text-[9.5px] px-2 py-0.5 rounded shadow-2xs", children: [
                                                    _jsx("span", { className: "text-slate-500 mr-0.5", children: "$" }),
                                                    item
                                                ] }, item)
                                            ))
                                        })
                                    ] }, category)
                                );
                            })
                        })
                    ] }, "skills")
                );
            }
            case 'projects':
                if (!projects || projects.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                            _jsx("span", { className: "text-xs font-mono font-bold text-slate-900 uppercase tracking-wide", children: "// Featured Projects & Repositories" }),
                            _jsx("div", { className: "h-px bg-slate-300 flex-1" })
                        ] }),
                        _jsx("div", { className: "space-y-3", children:
                            projects.map((proj) => (
                                _jsxs("div", { className: "border-l-2 border-cyan-600 pl-3 py-0.5", children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsxs("span", { className: "font-bold text-xs text-slate-900 font-mono", children: [
                                            proj.name,
                                            proj.role && _jsxs("span", { className: "font-normal font-sans text-slate-500 ml-1.5 text-[11px]", children: ["(", proj.role, ")"] })
                                        ] }),
                                        _jsxs("div", { className: "text-[10px] font-mono text-cyan-700 space-x-2 shrink-0 ml-2", children: [
                                            proj.githubUrl && _jsx("span", { children: "[GitHub]" }),
                                            proj.liveUrl && _jsx("span", { children: "[Live Demo]" })
                                        ] })
                                    ] }),
                                    proj.technologies && (
                                        _jsxs("div", { className: "text-[10px] font-mono text-slate-600 my-0.5", children: [
                                            "Stack: ", proj.technologies
                                        ] })
                                    ),
                                    proj.description && _jsx("p", { className: "text-[11px] font-sans text-slate-800 mb-1 leading-snug", children: proj.description }),
                                    proj.bullets && proj.bullets.length > 0 && (
                                        _jsx("ul", { className: "list-disc list-outside ml-4 space-y-0.5 text-[11px] font-sans text-slate-700", children:
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
            case 'experience':
                if (!experience || experience.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                            _jsx("span", { className: "text-xs font-mono font-bold text-slate-900 uppercase tracking-wide", children: "// Engineering Experience" }),
                            _jsx("div", { className: "h-px bg-slate-300 flex-1" })
                        ] }),
                        _jsx("div", { className: "space-y-3", children:
                            experience.map((exp) => (
                                _jsxs("div", { children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsx("span", { className: "font-bold text-xs text-slate-900 font-mono", children: exp.jobTitle }),
                                        _jsxs("span", { className: "text-[10.5px] font-mono font-semibold text-slate-600 tabular-nums shrink-0 ml-2", children: [exp.startDate, " – ", exp.isCurrent ? 'Present' : exp.endDate] })
                                    ] }),
                                    _jsxs("div", { className: "flex justify-between items-baseline text-[11px] text-slate-600 mb-1 font-sans", children: [
                                        _jsxs("span", { className: "font-medium text-slate-900", children: [exp.company, exp.location ? `, ${exp.location}` : ''] }),
                                        exp.employmentType && _jsx("span", { className: "text-slate-500 text-[10px] uppercase font-mono", children: exp.employmentType })
                                    ] }),
                                    exp.bullets && exp.bullets.length > 0 && (
                                        _jsx("ul", { className: "list-disc list-outside ml-4 space-y-1 text-[11px] font-sans text-slate-700", children:
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
            case 'education':
                if (!education || education.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                            _jsx("span", { className: "text-xs font-mono font-bold text-slate-900 uppercase tracking-wide", children: "// Education & Degrees" }),
                            _jsx("div", { className: "h-px bg-slate-300 flex-1" })
                        ] }),
                        _jsx("div", { className: "space-y-2", children:
                            education.map((edu) => (
                                _jsxs("div", { children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsxs("span", { className: "font-bold text-xs text-slate-900 font-mono", children: [edu.degree, edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''] }),
                                        _jsxs("span", { className: "text-[10.5px] font-mono text-slate-600 tabular-nums shrink-0 ml-2", children: [edu.startDate, " – ", edu.isCurrent ? 'Present' : edu.endDate] })
                                    ] }),
                                    _jsxs("div", { className: "flex justify-between items-baseline text-[11px] text-slate-700 font-sans", children: [
                                        _jsxs("span", { children: [edu.institution, edu.location ? `, ${edu.location}` : ''] }),
                                        edu.grade && _jsxs("span", { className: "font-mono text-[10px] font-bold text-slate-900", children: ["CGPA: ", edu.grade] })
                                    ] }),
                                    edu.description && _jsx("p", { className: "text-[10.5px] text-slate-600 font-sans mt-0.5", children: edu.description })
                                ] }, edu.id)
                            ))
                        })
                    ] }, "education")
                );
            case 'certifications':
                if (!certifications || certifications.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                            _jsx("span", { className: "text-xs font-mono font-bold text-slate-900 uppercase tracking-wide", children: "// Certifications" }),
                            _jsx("div", { className: "h-px bg-slate-300 flex-1" })
                        ] }),
                        _jsx("div", { className: "space-y-1 text-[11px] font-sans", children:
                            certifications.map((cert) => (
                                _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                    _jsxs("div", { className: "text-slate-800", children: [
                                        _jsx("span", { className: "font-bold font-mono text-slate-900", children: cert.name }),
                                        " — ",
                                        _jsx("span", { className: "text-slate-600", children: cert.issuer })
                                    ] }),
                                    cert.date && _jsx("span", { className: "text-[10.5px] font-mono text-slate-600 tabular-nums", children: cert.date })
                                ] }, cert.id)
                            ))
                        })
                    ] }, "certifications")
                );
            case 'achievements':
                if (!achievements || achievements.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                            _jsx("span", { className: "text-xs font-mono font-bold text-slate-900 uppercase tracking-wide", children: "// Achievements & Coding Honors" }),
                            _jsx("div", { className: "h-px bg-slate-300 flex-1" })
                        ] }),
                        _jsx("div", { className: "space-y-1 text-[11px] font-sans", children:
                            achievements.map((ach) => (
                                _jsxs("div", { children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsx("span", { className: "font-bold text-slate-900", children: ach.title }),
                                        ach.date && _jsx("span", { className: "text-[10.5px] font-mono text-slate-600 tabular-nums", children: ach.date })
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
                        _jsxs("div", { className: "flex items-center space-x-2 mb-1.5", children: [
                            _jsx("span", { className: "text-xs font-mono font-bold text-slate-900 uppercase tracking-wide", children: "// Languages" }),
                            _jsx("div", { className: "h-px bg-slate-300 flex-1" })
                        ] }),
                        _jsx("p", { className: "text-[11px] text-slate-800 font-mono", children: languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(' • ') })
                    ] }, "languages")
                );
            case 'custom':
                if (!customSections || customSections.length === 0) return null;
                return (
                    _jsx(React.Fragment, { children:
                        customSections.map((sec) => (
                            _jsxs("section", { className: "mb-4", children: [
                                _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                                    _jsxs("span", { className: "text-xs font-mono font-bold text-slate-900 uppercase tracking-wide", children: ["// ", sec.title] }),
                                    _jsx("div", { className: "h-px bg-slate-300 flex-1" })
                                ] }),
                                _jsx("div", { className: "space-y-1.5 font-sans", children:
                                    sec.items.map((item) => (
                                        _jsxs("div", { className: "text-[11px]", children: [
                                            _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                                _jsx("span", { className: "font-bold text-slate-900", children: item.title }),
                                                item.date && _jsx("span", { className: "text-[10.5px] font-mono text-slate-500 tabular-nums", children: item.date })
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
            _jsxs("header", { className: "bg-slate-950 text-white rounded-lg p-5 mb-4 border-b-4 border-cyan-500 shadow-md", children: [
                _jsx("h1", { className: "text-2xl font-mono font-black tracking-tight text-white uppercase", children: personal.fullName || 'YOUR NAME' }),
                personal.title && (
                    _jsxs("p", { className: "text-xs font-mono text-cyan-400 tracking-wider mt-1 flex items-center space-x-1", children: [
                        _jsx("span", { className: "text-slate-500", children: ">" }),
                        _jsx("span", { children: personal.title })
                    ] })
                ),
                contactItems.length > 0 && (
                    _jsx("div", { className: "text-[10.5px] text-slate-300 font-mono mt-3 flex flex-wrap gap-x-3 gap-y-1", children:
                        contactItems.map((item, idx) => (
                            _jsxs("span", { className: "flex items-center", children: [
                                idx > 0 && _jsx("span", { className: "mr-3 text-cyan-600", children: "•" }),
                                _jsx("span", { children: item })
                            ] }, idx))
                        )
                    })
                )
            ] }),
            _jsx("main", { children: sectionOrder.map((sectionKey) => renderSection(sectionKey)) })
        ] })
    );
};
