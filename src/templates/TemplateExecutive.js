import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';

export const TemplateExecutive = ({ resume }) => {
    const { personal, summary, education, experience, projects, skills, certifications, achievements, languages, customSections, sectionOrder } = resume;

    const renderSection = (type) => {
        switch (type) {
            case 'summary':
                if (!summary) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsxs("div", { className: "flex items-center space-x-2 mb-1.5", children: [
                            _jsx("h2", { className: "text-xs font-serif font-bold uppercase tracking-widest text-amber-900 shrink-0", children: "Executive Summary" }),
                            _jsx("div", { className: "h-px bg-amber-300 flex-1" })
                        ] }),
                        _jsx("p", { className: "text-[11px] font-serif text-slate-800 leading-relaxed text-justify italic", children: summary })
                    ] }, "summary")
                );
            case 'experience':
                if (!experience || experience.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                            _jsx("h2", { className: "text-xs font-serif font-bold uppercase tracking-widest text-amber-900 shrink-0", children: "Leadership & Career Experience" }),
                            _jsx("div", { className: "h-px bg-amber-300 flex-1" })
                        ] }),
                        _jsx("div", { className: "space-y-3", children:
                            experience.map((exp) => (
                                _jsxs("div", { children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsx("span", { className: "font-serif font-bold text-xs text-slate-900", children: exp.jobTitle }),
                                        _jsxs("span", { className: "text-[11px] font-sans font-semibold text-amber-800 tabular-nums shrink-0 ml-2", children: [exp.startDate, " – ", exp.isCurrent ? 'Present' : exp.endDate] })
                                    ] }),
                                    _jsxs("div", { className: "flex justify-between items-baseline text-[11px] text-slate-700 mb-1 font-serif", children: [
                                        _jsxs("span", { className: "font-semibold italic", children: [exp.company, exp.location ? `, ${exp.location}` : ''] }),
                                        exp.employmentType && _jsx("span", { className: "text-slate-500 text-[10px] font-sans uppercase tracking-wider", children: exp.employmentType })
                                    ] }),
                                    exp.bullets && exp.bullets.length > 0 && (
                                        _jsx("ul", { className: "list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-800 font-sans", children:
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
                            _jsx("h2", { className: "text-xs font-serif font-bold uppercase tracking-widest text-amber-900 shrink-0", children: "Education & Credentials" }),
                            _jsx("div", { className: "h-px bg-amber-300 flex-1" })
                        ] }),
                        _jsx("div", { className: "space-y-2", children:
                            education.map((edu) => (
                                _jsxs("div", { children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsxs("span", { className: "font-serif font-bold text-xs text-slate-900", children: [edu.degree, edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''] }),
                                        _jsxs("span", { className: "text-[11px] font-sans text-amber-800 font-semibold tabular-nums shrink-0 ml-2", children: [edu.startDate, " – ", edu.isCurrent ? 'Present' : edu.endDate] })
                                    ] }),
                                    _jsxs("div", { className: "flex justify-between items-baseline text-[11px] text-slate-700 font-serif", children: [
                                        _jsxs("span", { className: "italic", children: [edu.institution, edu.location ? `, ${edu.location}` : ''] }),
                                        edu.grade && _jsxs("span", { className: "font-sans text-[10.5px] font-bold text-slate-900", children: ["Honors: ", edu.grade] })
                                    ] }),
                                    edu.description && _jsx("p", { className: "text-[10.5px] text-slate-600 font-sans mt-0.5", children: edu.description })
                                ] }, edu.id)
                            ))
                        })
                    ] }, "education")
                );
            case 'projects':
                if (!projects || projects.length === 0) return null;
                return (
                    _jsxs("section", { className: "mb-4", children: [
                        _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                            _jsx("h2", { className: "text-xs font-serif font-bold uppercase tracking-widest text-amber-900 shrink-0", children: "Strategic Initiatives & Projects" }),
                            _jsx("div", { className: "h-px bg-amber-300 flex-1" })
                        ] }),
                        _jsx("div", { className: "space-y-2", children:
                            projects.map((proj) => (
                                _jsxs("div", { children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsxs("span", { className: "font-serif font-bold text-xs text-slate-900", children: [
                                            proj.name,
                                            proj.role && _jsxs("span", { className: "font-sans font-normal italic text-slate-600 ml-1 text-[11px]", children: ["(", proj.role, ")"] })
                                        ] }),
                                        _jsxs("div", { className: "text-[10px] font-sans text-amber-900 space-x-2 shrink-0 ml-2", children: [
                                            proj.githubUrl && _jsx("span", { children: "GitHub" }),
                                            proj.liveUrl && _jsx("span", { children: "Live" })
                                        ] })
                                    ] }),
                                    proj.technologies && (
                                        _jsxs("div", { className: "text-[10.5px] font-sans text-slate-700 mb-0.5", children: [
                                            _jsx("span", { className: "font-bold text-slate-900", children: "Key Tech: " }), proj.technologies
                                        ] })
                                    ),
                                    proj.description && _jsx("p", { className: "text-[11px] font-serif text-slate-800 mb-0.5 leading-snug", children: proj.description }),
                                    proj.bullets && proj.bullets.length > 0 && (
                                        _jsx("ul", { className: "list-disc list-outside ml-4 space-y-0.5 text-[11px] font-sans text-slate-800", children:
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
                        _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                            _jsx("h2", { className: "text-xs font-serif font-bold uppercase tracking-widest text-amber-900 shrink-0", children: "Core Competencies & Skills" }),
                            _jsx("div", { className: "h-px bg-amber-300 flex-1" })
                        ] }),
                        _jsx("div", { className: "space-y-1 text-[11px] font-sans text-slate-800", children:
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
                                        _jsxs("span", { className: "font-bold w-36 shrink-0 text-slate-900 font-serif", children: [labelMap[category] || category, ":"] }),
                                        _jsx("span", { className: "flex-1", children: items.join(' • ') })
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
                        _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                            _jsx("h2", { className: "text-xs font-serif font-bold uppercase tracking-widest text-amber-900 shrink-0", children: "Professional Certifications" }),
                            _jsx("div", { className: "h-px bg-amber-300 flex-1" })
                        ] }),
                        _jsx("div", { className: "space-y-1 text-[11px] font-sans", children:
                            certifications.map((cert) => (
                                _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                    _jsxs("div", { className: "text-slate-800", children: [
                                        _jsx("span", { className: "font-bold text-slate-900", children: cert.name }),
                                        " — ",
                                        _jsx("span", { className: "italic font-serif", children: cert.issuer })
                                    ] }),
                                    cert.date && _jsx("span", { className: "text-[10.5px] text-slate-600 tabular-nums", children: cert.date })
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
                            _jsx("h2", { className: "text-xs font-serif font-bold uppercase tracking-widest text-amber-900 shrink-0", children: "Honors & Key Milestones" }),
                            _jsx("div", { className: "h-px bg-amber-300 flex-1" })
                        ] }),
                        _jsx("div", { className: "space-y-1 text-[11px] font-sans", children:
                            achievements.map((ach) => (
                                _jsxs("div", { children: [
                                    _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                        _jsx("span", { className: "font-bold text-slate-900", children: ach.title }),
                                        ach.date && _jsx("span", { className: "text-[10.5px] text-slate-600 tabular-nums", children: ach.date })
                                    ] }),
                                    ach.description && _jsx("p", { className: "text-[10.5px] text-slate-600 font-serif italic", children: ach.description })
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
                            _jsx("h2", { className: "text-xs font-serif font-bold uppercase tracking-widest text-amber-900 shrink-0", children: "Languages" }),
                            _jsx("div", { className: "h-px bg-amber-300 flex-1" })
                        ] }),
                        _jsx("p", { className: "text-[11px] text-slate-800 font-sans", children: languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(' • ') })
                    ] }, "languages")
                );
            case 'custom':
                if (!customSections || customSections.length === 0) return null;
                return (
                    _jsx(React.Fragment, { children:
                        customSections.map((sec) => (
                            _jsxs("section", { className: "mb-4", children: [
                                _jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
                                    _jsx("h2", { className: "text-xs font-serif font-bold uppercase tracking-widest text-amber-900 shrink-0", children: sec.title }),
                                    _jsx("div", { className: "h-px bg-amber-300 flex-1" })
                                ] }),
                                _jsx("div", { className: "space-y-1.5 font-sans", children:
                                    sec.items.map((item) => (
                                        _jsxs("div", { className: "text-[11px]", children: [
                                            _jsxs("div", { className: "flex justify-between items-baseline", children: [
                                                _jsx("span", { className: "font-bold text-slate-900", children: item.title }),
                                                item.date && _jsx("span", { className: "text-[10.5px] text-slate-500 tabular-nums", children: item.date })
                                            ] }),
                                            item.subtitle && _jsx("div", { className: "text-[10.5px] text-slate-600 italic font-serif", children: item.subtitle }),
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
        _jsxs("div", { className: "font-serif text-slate-900 w-full p-2", children: [
            _jsxs("header", { className: "text-center pb-3 border-b-2 border-amber-900 mb-4", children: [
                _jsx("h1", { className: "text-3xl font-serif font-black tracking-wide uppercase text-amber-950", children: personal.fullName || 'YOUR NAME' }),
                personal.title && (
                    _jsx("p", { className: "text-xs font-serif uppercase tracking-widest text-amber-800 font-bold mt-1", children: personal.title })
                ),
                contactItems.length > 0 && (
                    _jsx("div", { className: "text-[10.5px] text-slate-700 mt-2 flex flex-wrap justify-center gap-x-3 font-sans font-medium", children:
                        contactItems.map((item, idx) => (
                            _jsxs("span", { className: "flex items-center", children: [
                                idx > 0 && _jsx("span", { className: "mr-3 text-amber-600", children: "•" }),
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
