import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';

export const TemplateCompact = ({ resume }) => {
    const { personal, summary, education, experience, projects, skills, certifications, achievements, languages, customSections, sectionOrder } = resume;

    const categories = Object.entries(skills || {}).filter(([_, list]) => list && list.length > 0);

    const renderMainSection = (type) => {
        switch (type) {
            case 'summary':
                if (!summary) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-indigo-600 pb-0.5 mb-2 font-sans", children: "Profile Summary" }),
                        _jsx("p", { className: "text-[11px] text-slate-700 leading-relaxed text-justify", children: summary })
                    ] }, "summary")
                );
            case 'experience':
                if (!experience || experience.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-indigo-600 pb-0.5 mb-2 font-sans", children: "Professional Experience" }),
                        _jsx("div", { className: "space-y-3", children:
                            experience.map((exp) => (
                                _jsxs("div", { children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsx("span", { className: "font-bold text-xs text-slate-900", children: exp.jobTitle }),
                                        _jsxs("span", { className: "text-[10.5px] font-semibold text-indigo-700 font-sans tabular-nums shrink-0 ml-2", children: [exp.startDate, " – ", exp.isCurrent ? 'Present' : exp.endDate] })
                                    ] }),
                                    _jsxs("div", { className: "flex justify-between items-baseline text-[11px] text-slate-600 mb-1", children: [
                                        _jsxs("span", { className: "font-semibold text-slate-800", children: [exp.company, exp.location ? `, ${exp.location}` : ''] }),
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
                        _jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-indigo-600 pb-0.5 mb-2 font-sans", children: "Key Projects" }),
                        _jsx("div", { className: "space-y-2.5", children:
                            projects.map((proj) => (
                                _jsxs("div", { children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsxs("span", { className: "font-bold text-xs text-slate-900", children: [
                                            proj.name,
                                            proj.role && _jsxs("span", { className: "font-normal text-slate-500 ml-1 text-[11px]", children: ["(", proj.role, ")"] })
                                        ] }),
                                        _jsxs("div", { className: "text-[10px] text-indigo-700 space-x-2 font-sans font-medium shrink-0 ml-2", children: [
                                            proj.githubUrl && _jsx("span", { children: "GitHub" }),
                                            proj.liveUrl && _jsx("span", { children: "Demo" })
                                        ] })
                                    ] }),
                                    proj.technologies && (
                                        _jsxs("div", { className: "text-[10.5px] text-indigo-900 font-sans mb-0.5 font-medium", children: [
                                            "Tech: ", proj.technologies
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
            case 'custom':
                if (!customSections || customSections.length === 0) return null;
                return (
                    _jsx(React.Fragment, { children:
                        customSections.map((sec) => (
                            _jsxs("section", { className: "mb-4", children: [
                                _jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-indigo-600 pb-0.5 mb-2 font-sans", children: sec.title }),
                                _jsx("div", { className: "space-y-1.5", children:
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

    return (
        _jsxs("div", { className: "font-sans text-slate-900 w-full min-h-full flex flex-col", children: [
            
            /* Header */
            _jsxs("header", { className: "bg-slate-900 text-white p-5 rounded-t-lg flex justify-between items-end mb-4", children: [
                _jsxs("div", { children: [
                    _jsx("h1", { className: "text-2xl font-black tracking-normal uppercase text-white", children: personal.fullName || 'YOUR NAME' }),
                    personal.title && (
                        _jsx("p", { className: "text-xs font-semibold text-indigo-400 uppercase tracking-widest mt-1", children: personal.title })
                    )
                ] }),
                _jsxs("div", { className: "text-[10.5px] text-slate-300 text-right space-y-0.5 shrink-0 ml-4 font-mono", children: [
                    personal.email && _jsxs("div", { children: [personal.email] }),
                    personal.phone && _jsxs("div", { children: [personal.phone] }),
                    personal.location && _jsxs("div", { children: [personal.location] }),
                    personal.linkedin && _jsxs("div", { children: [personal.linkedin] }),
                    personal.github && _jsxs("div", { children: [personal.github] })
                ] })
            ] }),

            /* Grid Layout */
            _jsxs("div", { className: "grid grid-cols-12 gap-5 px-1 flex-1", children: [
                
                /* Left Column (Main Content) */
                _jsx("main", { className: "col-span-8", children:
                    ['summary', 'experience', 'projects', 'custom'].map((key) => renderMainSection(key))
                }),

                /* Right Sidebar */
                _jsxs("aside", { className: "col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-4 h-fit", children: [
                    
                    /* Education Section */
                    education && education.length > 0 && (
                        _jsxs("section", { children: [
                            _jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-0.5 mb-2 font-sans", children: "Education" }),
                            _jsx("div", { className: "space-y-2 text-[10.5px]", children:
                                education.map((edu) => (
                                    _jsxs("div", { children: [
                                        _jsxs("p", { className: "font-bold text-slate-900 leading-tight", children: [edu.degree, edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''] }),
                                        _jsxs("p", { className: "text-slate-600 text-[10px]", children: [edu.institution, edu.location ? `, ${edu.location}` : ''] }),
                                        _jsxs("p", { className: "text-indigo-700 font-semibold text-[9.5px]", children: [edu.startDate, " – ", edu.isCurrent ? 'Present' : edu.endDate] }),
                                        edu.grade && _jsxs("p", { className: "text-slate-500 text-[9.5px]", children: ["GPA: ", edu.grade] })
                                    ] }, edu.id)
                                ))
                            })
                        ] })
                    ),

                    /* Skills Section */
                    categories.length > 0 && (
                        _jsxs("section", { children: [
                            _jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-0.5 mb-2 font-sans", children: "Skills" }),
                            _jsx("div", { className: "space-y-2 text-[10.5px]", children:
                                categories.map(([category, items]) => (
                                    _jsxs("div", { children: [
                                        _jsx("p", { className: "font-bold text-slate-800 capitalize text-[10px]", children: category }),
                                        _jsx("div", { className: "flex flex-wrap gap-1 mt-1", children:
                                            items.map((item) => (
                                                _jsx("span", { className: "bg-white text-slate-800 text-[9.5px] font-medium px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs", children: item }, item)
                                            ))
                                        })
                                    ] }, category)
                                ))
                            })
                        ] })
                    ),

                    /* Certifications */
                    certifications && certifications.length > 0 && (
                        _jsxs("section", { children: [
                            _jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-0.5 mb-2 font-sans", children: "Certifications" }),
                            _jsx("div", { className: "space-y-1.5 text-[10px]", children:
                                certifications.map((cert) => (
                                    _jsxs("div", { children: [
                                        _jsx("p", { className: "font-bold text-slate-900 leading-tight", children: cert.name }),
                                        _jsxs("p", { className: "text-slate-600", children: [cert.issuer, cert.date ? ` (${cert.date})` : ''] })
                                    ] }, cert.id)
                                ))
                            })
                        ] })
                    ),

                    /* Languages */
                    languages && languages.length > 0 && (
                        _jsxs("section", { children: [
                            _jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-0.5 mb-2 font-sans", children: "Languages" }),
                            _jsx("ul", { className: "space-y-0.5 text-[10px] text-slate-700", children:
                                languages.map((l) => (
                                    _jsxs("li", { className: "flex justify-between", children: [
                                        _jsx("span", { className: "font-medium", children: l.language }),
                                        _jsx("span", { className: "text-slate-500", children: l.proficiency })
                                    ] }, l.language)
                                ))
                            })
                        ] })
                    ),

                    /* Achievements */
                    achievements && achievements.length > 0 && (
                        _jsxs("section", { children: [
                            _jsx("h2", { className: "text-[11px] font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-0.5 mb-2 font-sans", children: "Achievements" }),
                            _jsx("div", { className: "space-y-1 text-[10px]", children:
                                achievements.map((ach) => (
                                    _jsxs("div", { children: [
                                        _jsx("p", { className: "font-bold text-slate-900 leading-tight", children: ach.title }),
                                        ach.description && _jsx("p", { className: "text-slate-600 text-[9.5px]", children: ach.description })
                                    ] }, ach.id)
                                ))
                            })
                        ] })
                    )

                ] })

            ] })
        ] })
    );
};
