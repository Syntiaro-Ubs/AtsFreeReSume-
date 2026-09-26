import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, LayoutGrid, Search, Sparkles } from 'lucide-react';

const TEMPLATES = [
    {
        id: 'classic',
        name: 'Classic ATS Single-Column',
        tagline: 'Standard, universally recognized layout favored by traditional corporations and Fortune 500 applicant tracking engines.',
        recommendedFor: 'Software Engineers, Systems Developers, Traditional Enterprises',
        atsCompatibility: 99,
        features: ['Standard semantic hierarchy', 'Zero graphical clutter', 'Strict chronological dates', 'High parse speed'],
    },
    {
        id: 'modern',
        name: 'Modern Tech Stack',
        tagline: 'Refined indigo aesthetic with clean monospace tags for modern tech companies, high-growth startups, and SaaS applications.',
        recommendedFor: 'Full-Stack Developers, Frontend Specialists, DevOps Engineers',
        atsCompatibility: 96,
        features: ['Categorized tech badges', 'Clean URL links for repos', 'Impact bullet formatting', 'Balanced typography'],
    },
    {
        id: 'professional',
        name: 'Corporate Executive',
        tagline: 'Authoritative styling with subtle dividers and prominent company and institution headings.',
        recommendedFor: 'Associate Consultants, Project Leads, Enterprise IT Managers',
        atsCompatibility: 98,
        features: ['Prominent role headings', 'Distinguished company details', 'Compact skill groups', 'Formal aesthetic'],
    },
    {
        id: 'minimal',
        name: 'Clean Minimalist',
        tagline: 'Maximum information density with generous whitespace and clear linear scanning for quick recruiter reviews.',
        recommendedFor: 'Backend Developers, Data Engineers, QA Automation Testers',
        atsCompatibility: 98,
        features: ['High-density text flow', 'Zero decorative lines', 'Fast 6-second scanability', 'Ultra-clean print'],
    },
    {
        id: 'student',
        name: 'Student & Fresher Special',
        tagline: 'Specifically engineered to highlight academic projects, degrees, CGPA, and technical skills when work experience is limited.',
        recommendedFor: 'MCA/B.Tech students, Interns, College Grads, Entry-Level Candidates',
        atsCompatibility: 97,
        features: ['Education & Skills first', 'Coursework & CGPA callout', 'GitHub & project links', 'Coding achievements'],
    },
    {
        id: 'photo',
        name: 'Profile Photo Template',
        tagline: 'Modern single-column layout with student profile picture in header. Ideal for internships, campus drives, and creative tech roles.',
        recommendedFor: 'Students, Interns, Creative Developers, Campus Placements',
        atsCompatibility: 92,
        features: ['Profile photo support', 'Clean single-column hierarchy', 'Project & skills showcase', 'Contact links included'],
    },
    {
        id: 'creative',
        name: 'Creative Accent',
        tagline: 'Vibrant emerald accent headers with high contrast hierarchy, custom category chips, and section highlight bars.',
        recommendedFor: 'UI/UX Designers, Product Engineers, Creative Leads',
        atsCompatibility: 95,
        features: ['Styled section bars', 'Highlight skill pills', 'Modern emerald aesthetic', 'Eye-catching headers'],
    },
    {
        id: 'compact',
        name: 'Compact Grid (2-Column)',
        tagline: 'Structured dual-column layout with a left sidebar for skills, contact details, and education alongside a wide main column.',
        recommendedFor: 'Senior Engineers, Experienced Pros, Multi-domain Specialists',
        atsCompatibility: 94,
        features: ['Dual-column grid layout', 'Dedicated sidebar for skills', 'High spatial efficiency', 'Clean section distinction'],
    },
    {
        id: 'executive',
        name: 'Executive Leadership',
        tagline: 'Formal serif typography with subtle gold dividers and authoritative section rules for management candidates.',
        recommendedFor: 'Engineering Managers, Tech Leads, Directors, Architects',
        atsCompatibility: 97,
        features: ['Elegant serif typography', 'Gold/Amber accent rules', 'Leadership focus', 'High-level summary formatting'],
    },
    {
        id: 'tech',
        name: 'Developer Stack & Terminal',
        tagline: 'Dark slate terminal-inspired header with monospace code badges and repository links for software developers.',
        recommendedFor: 'Full-Stack Engineers, Open Source Contributors, Cloud Engineers',
        atsCompatibility: 96,
        features: ['Terminal slate header', 'Monospace skill badges', 'GitHub repo links focus', 'Tech-first structure'],
    },
];

export const TemplatesPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelectTemplate = (id) => {
        navigate(`/builder?template=${id}`);
    };

    const filteredTemplates = TEMPLATES.filter((tmpl) =>
        tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tmpl.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tmpl.recommendedFor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (_jsx("div", { className: "min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8", children:
        _jsxs("div", { className: "max-w-6xl mx-auto space-y-10", children: [
            
            /* Header */
            _jsxs("div", { className: "text-center max-w-3xl mx-auto space-y-3", children: [
                _jsxs("div", { className: "inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700", children: [
                    _jsx(LayoutGrid, { className: "w-3.5 h-3.5" }),
                    _jsx("span", { children: "10 Professional ATS-Tested Resume Designs" })
                ] }),
                _jsx("h1", { className: "text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight", children: "Explore Resume Templates" }),
                _jsx("p", { className: "text-sm text-slate-600 leading-relaxed", children: "Choose from our curated collection of professional ATS-optimized resume templates. Engineered for maximum readability by recruiters and automated applicant tracking systems." })
            ] }),

            /* Filter & Search Bar */
            _jsxs("div", { className: "max-w-md mx-auto relative", children: [
                _jsx(Search, { className: "w-4 h-4 text-slate-400 absolute left-3.5 top-3" }),
                _jsx("input", {
                    type: "text",
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),
                    placeholder: "Search templates by role or keyword (e.g. Student, Tech, Executive)...",
                    className: "w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-2xs"
                })
            ] }),

            /* Grid of templates */
            _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children:
                filteredTemplates.map((tmpl) => (
                    _jsxs("div", {
                        className: "bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-lg hover:border-indigo-300 transition-all p-6 flex flex-col justify-between",
                        children: [
                            _jsxs("div", { className: "space-y-4", children: [
                                _jsxs("div", { className: "h-48 rounded-xl bg-slate-50 border border-slate-200 p-4 shadow-2xs flex flex-col justify-between overflow-hidden relative group", children: [
                                    _jsxs("div", { className: "border-b border-slate-200 pb-2", children: [
                                        _jsx("div", { className: "w-24 h-2.5 bg-slate-900 rounded-xs mb-1" }),
                                        _jsx("div", { className: "w-36 h-1.5 bg-slate-400 rounded-xs" })
                                    ] }),
                                    _jsxs("div", { className: "space-y-1.5", children: [
                                        _jsx("div", { className: "w-20 h-2 bg-indigo-600 rounded-xs" }),
                                        _jsx("div", { className: "w-full h-1.5 bg-slate-300 rounded-xs" }),
                                        _jsx("div", { className: "w-5/6 h-1.5 bg-slate-300 rounded-xs" })
                                    ] }),
                                    _jsxs("div", { className: "space-y-1.5", children: [
                                        _jsx("div", { className: "w-16 h-2 bg-indigo-600 rounded-xs" }),
                                        _jsx("div", { className: "w-full h-1.5 bg-slate-300 rounded-xs" })
                                    ] }),
                                    _jsxs("div", { className: "absolute top-2 right-2 flex items-center space-x-1", children: [
                                        _jsxs("span", { className: "text-[10px] font-bold bg-white/90 border border-emerald-300 text-emerald-700 px-2 py-0.5 rounded-full shadow-2xs", children: [tmpl.atsCompatibility, "% ATS Match"] })
                                    ] })
                                ] }),
                                _jsxs("div", { children: [
                                    _jsx("h3", { className: "text-base font-bold text-slate-900", children: tmpl.name }),
                                    _jsx("p", { className: "text-xs text-slate-600 mt-1 leading-relaxed", children: tmpl.tagline })
                                ] }),
                                _jsxs("div", { className: "p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700", children: [
                                    _jsx("span", { className: "font-semibold block text-slate-900 mb-0.5", children: "Best For:" }),
                                    _jsx("span", { children: tmpl.recommendedFor })
                                ] }),
                                _jsx("div", { className: "space-y-1 pt-1", children:
                                    tmpl.features.map((feat, i) => (
                                        _jsxs("div", { className: "flex items-center space-x-1.5 text-xs text-slate-600", children: [
                                            _jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }),
                                            _jsx("span", { children: feat })
                                        ] }, i)
                                    ))
                                })
                            ] }),
                            _jsx("div", { className: "pt-5 mt-5 border-t border-slate-100", children:
                                _jsxs("button", {
                                    type: "button",
                                    onClick: () => handleSelectTemplate(tmpl.id),
                                    className: "w-full inline-flex items-center justify-center space-x-2 font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white",
                                    children: [
                                        _jsx("span", { children: "Select & Open in Builder" }),
                                        _jsx(ArrowRight, { className: "w-4 h-4" })
                                    ]
                                })
                            })
                        ]
                    }, tmpl.id)
                ))
            })
        ] })
    }));
};
