import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, CheckCircle2, Sparkles, ShieldCheck, Download, Search, ArrowRight, GraduationCap, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

export const LandingPage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const handleStartBuilding = () => {
        if (isAuthenticated) {
            navigate('/dashboard?action=create');
        } else {
            navigate('/builder');
        }
    };

    return _jsxs("div", { className: "min-h-screen bg-slate-50/50", children: [

        /* ── HERO ── */
        _jsx("section", {
            className: "relative overflow-hidden border-b border-slate-200/80",
            style: { background: "linear-gradient(160deg,#f8faff 0%,#eef2ff 45%,#f0fdf4 100%)" },
            children: _jsxs("div", { className: "relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-12 sm:pb-14 text-center", children: [

                /* Ambient orbs */
                _jsx("div", {
                    style: {
                        position: "absolute", top: "-80px", left: "50%", transform: "translateX(-60%)",
                        width: "520px", height: "520px", borderRadius: "50%",
                        background: "radial-gradient(circle,rgba(99,102,241,.13) 0%,transparent 70%)",
                        pointerEvents: "none", zIndex: 0
                    }
                }),
                _jsx("div", {
                    style: {
                        position: "absolute", bottom: "-60px", right: "5%",
                        width: "320px", height: "320px", borderRadius: "50%",
                        background: "radial-gradient(circle,rgba(16,185,129,.10) 0%,transparent 70%)",
                        pointerEvents: "none", zIndex: 0
                    }
                }),

                /* Badge */
                _jsxs("div", {
                    className: "relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 bg-white/80 text-xs text-indigo-700 font-medium shadow-xs mb-4",
                    children: [
                        _jsx(Sparkles, { className: "w-3.5 h-3.5 text-indigo-500" }),
                        "Optimized for Fresher & Early-Career ATS Scanners"
                    ]
                }),

                /* Headline */
                _jsxs("h1", {
                    className: "relative z-10 text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-[1.18] font-semibold mb-3",
                    children: [
                        "Build a Resume That ",
                        _jsx("span", { style: { color: "#4f46e5", fontWeight: 600 }, children: "Gets You Hired" }),
                        "."
                    ]
                }),

                /* Sub-headline */
                _jsx("p", {
                    className: "relative z-10 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal mb-6",
                    children: "Designed for students, freshers, and early-career developers. Create a high-scoring ATS resume with live A4 preview, keyword matching, and clean vector PDF export — completely free."
                }),

                /* CTAs */
                _jsxs("div", {
                    className: "relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 mb-6",
                    children: [
                        _jsxs("button", {
                            type: "button", onClick: handleStartBuilding,
                            className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-6 py-3 rounded-xl shadow-xs hover:shadow transition-all",
                            children: [_jsx(FileText, { className: "w-4 h-4" }), "Build My Resume — Free", _jsx(ArrowRight, { className: "w-4 h-4" })]
                        }),
                        _jsxs(Link, {
                            to: "/ats-checker",
                            className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-medium px-6 py-3 rounded-xl shadow-xs hover:shadow transition-all",
                            children: [_jsx(Search, { className: "w-4 h-4 text-indigo-500" }), "Test ATS Score Free"]
                        })
                    ]
                }),

                /* Trust signals */
                _jsxs("div", {
                    className: "relative z-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-normal",
                    children: [
                        _jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }), "No credit card required"] }),
                        _jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }), "100% ATS parser compliant"] }),
                        _jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }), "Vector A4 PDF export"] }),
                    ]
                }),

                /* Floating stat pills */
                _jsx("div", {
                    className: "relative z-10 mt-6 flex flex-wrap justify-center gap-3",
                    children: [
                        { icon: _jsx(ShieldCheck, { className: "w-4 h-4 text-indigo-500" }), label: "96% avg. ATS score" },
                        { icon: _jsx(Download, { className: "w-4 h-4 text-emerald-500" }), label: "PDF in under 30 sec" },
                        { icon: _jsx(Sparkles, { className: "w-4 h-4 text-violet-500" }), label: "AI-powered bullet writer" },
                    ].map((p, i) =>
                        _jsxs("div", {
                            className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs text-slate-600 font-normal",
                            children: [p.icon, p.label]
                        }, i)
                    )
                }),

            ] })
        }),

        /* ── FEATURES ── */
        _jsxs("section", { id: "features", className: "py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
            _jsxs("div", { className: "text-center max-w-3xl mx-auto mb-8 space-y-2", children: [
                _jsx("h2", { className: "text-xs font-medium uppercase tracking-wider text-indigo-600", children: "Why ATS Free RESUME Works" }),
                _jsx("h3", { className: "text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight", children: "Engineered to Pass Machine Scanners & Impress Engineering Recruiters" }),
                _jsx("p", { className: "text-sm text-slate-500 leading-relaxed", children: "Most creative templates get discarded because automated parsers cannot decipher two-column tables, graphics, or non-standard fonts. ATS Free RESUME eliminates those pitfalls." })
            ] }),
            _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
                _jsxs("div", { className: "p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow transition-shadow space-y-2.5", children: [
                    _jsx("div", { className: "w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center", children: _jsx(ShieldCheck, { className: "w-4 h-4" }) }),
                    _jsx("h4", { className: "text-sm font-medium text-slate-900", children: "Standard Single-Column Layouts" }),
                    _jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Standardized semantic hierarchies with clean text flows guarantee accurate reading by Workday, Taleo, Lever, and Greenhouse." })
                ] }),
                _jsxs("div", { className: "p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow transition-shadow space-y-2.5", children: [
                    _jsx("div", { className: "w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center", children: _jsx(Search, { className: "w-4 h-4" }) }),
                    _jsx("h4", { className: "text-sm font-medium text-slate-900", children: "Job Description Keyword Matcher" }),
                    _jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Paste target job requirements from LinkedIn or Indeed to instantly spot missing technical terms, frameworks, and qualifications." })
                ] }),
                _jsxs("div", { className: "p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow transition-shadow space-y-2.5", children: [
                    _jsx("div", { className: "w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center", children: _jsx(Sparkles, { className: "w-4 h-4" }) }),
                    _jsx("h4", { className: "text-sm font-medium text-slate-900", children: "Action Verb & Impact Engine" }),
                    _jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Transform passive phrases like \"worked on\" into high-impact recruiter favorites like \"Architected\", \"Engineered\", and \"Optimized\"." })
                ] }),
                _jsxs("div", { className: "p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow transition-shadow space-y-2.5", children: [
                    _jsx("div", { className: "w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center", children: _jsx(Zap, { className: "w-4 h-4" }) }),
                    _jsx("h4", { className: "text-sm font-medium text-slate-900", children: "Real-Time Synchronized A4 Preview" }),
                    _jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Every keystroke updates the live A4 preview instantly. What you see is exactly what renders in your printed PDF." })
                ] }),
                _jsxs("div", { className: "p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow transition-shadow space-y-2.5", children: [
                    _jsx("div", { className: "w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center", children: _jsx(GraduationCap, { className: "w-4 h-4" }) }),
                    _jsx("h4", { className: "text-sm font-medium text-slate-900", children: "Built for Freshers & Students" }),
                    _jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Dedicated sections for academic projects, coursework, GitHub repositories, coding hackathons, and certifications." })
                ] }),
                _jsxs("div", { className: "p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow transition-shadow space-y-2.5", children: [
                    _jsx("div", { className: "w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center", children: _jsx(Download, { className: "w-4 h-4" }) }),
                    _jsx("h4", { className: "text-sm font-medium text-slate-900", children: "Crisp High-Res Vector PDF" }),
                    _jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Download pure vector PDFs formatted to exact 210mm x 297mm dimensions with zero blurriness or formatting shift." })
                ] })
            ] })
        ] }),

        /* ── TEMPLATES ── */
        _jsx("section", { className: "py-10 bg-white border-y border-slate-200", children:
            _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
                _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between mb-6", children: [
                    _jsxs("div", { children: [
                        _jsx("h2", { className: "text-xs font-medium uppercase tracking-wider text-indigo-600", children: "Professional Templates" }),
                        _jsx("h3", { className: "text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight mt-1", children: "6 Battle-Tested ATS Formats" })
                    ] }),
                    _jsxs(Link, { to: "/templates", className: "mt-2 sm:mt-0 text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1", children: ["Explore all templates", _jsx(ArrowRight, { className: "w-3.5 h-3.5" })] })
                ] }),
                _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children:
                    [
                        { id: 'classic', name: 'Classic ATS', desc: 'Standard single-column format favored by traditional enterprises.' },
                        { id: 'student', name: 'Student & Intern', desc: 'Prioritizes education, technical skills, and coursework first.' },
                        { id: 'photo', name: 'Profile Photo', desc: 'Clean single-column layout featuring candidate photo in header.' },
                        { id: 'modern', name: 'Modern Tech', desc: 'Indigo accents crafted for full-stack and frontend engineers.' },
                        { id: 'professional', name: 'Corporate Pro', desc: 'Subtle slate section headers with high visual authority.' },
                        { id: 'minimal', name: 'Minimalist', desc: 'Ultra-clean density prioritizing content and project metrics.' },
                    ].map((t) => _jsxs("div", { className: "p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between", children: [
                        _jsxs("div", { children: [
                            _jsxs("div", { className: "h-36 rounded-lg bg-white border border-slate-200 p-2.5 mb-2.5 shadow-xs overflow-hidden flex flex-col justify-between text-[8px] text-slate-400", children: [
                                _jsxs("div", { className: "border-b border-slate-200 pb-1", children: [
                                    _jsx("div", { className: "w-20 h-2 bg-slate-800 rounded-xs mb-1" }),
                                    _jsx("div", { className: "w-32 h-1 bg-slate-300 rounded-xs" })
                                ] }),
                                _jsxs("div", { className: "space-y-1", children: [
                                    _jsx("div", { className: "w-16 h-1.5 bg-indigo-500 rounded-xs" }),
                                    _jsx("div", { className: "w-full h-1 bg-slate-200 rounded-xs" }),
                                    _jsx("div", { className: "w-full h-1 bg-slate-200 rounded-xs" })
                                ] }),
                                _jsxs("div", { className: "space-y-1", children: [
                                    _jsx("div", { className: "w-14 h-1.5 bg-indigo-500 rounded-xs" }),
                                    _jsx("div", { className: "w-full h-1 bg-slate-200 rounded-xs" })
                                ] })
                            ] }),
                            _jsx("h4", { className: "text-xs font-medium text-slate-900", children: t.name }),
                            _jsx("p", { className: "text-[11px] text-slate-500 mt-0.5 leading-relaxed", children: t.desc })
                        ] }),
                        _jsx("button", { type: "button", onClick: () => navigate(`/builder?template=${t.id}`), className: "mt-3 w-full text-center text-xs font-medium py-1.5 rounded-lg border border-indigo-200 text-indigo-600 bg-white hover:bg-indigo-50 transition-colors", children: "Use Template" })
                    ] }, t.id))
                })
            ] })
        }),

        /* ── HOW IT WORKS ── */
        _jsxs("section", { id: "how-it-works", className: "py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
            _jsxs("div", { className: "text-center max-w-2xl mx-auto mb-8 space-y-1.5", children: [
                _jsx("h2", { className: "text-xs font-medium uppercase tracking-wider text-indigo-600", children: "Simple Workflow" }),
                _jsx("h3", { className: "text-xl sm:text-2xl font-semibold text-slate-900", children: "How to Create Your Resume in 10 Minutes" })
            ] }),
            _jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-5", children:
                [
                    { step: '01', title: 'Fill Your Details', desc: 'Enter education, projects, skills, and work experience section by section with smart guidance.' },
                    { step: '02', title: 'Pick an ATS Template', desc: 'Select from 5 proven recruiter-tested formats. Switch designs anytime with zero re-typing.' },
                    { step: '03', title: 'Audit ATS Compatibility', desc: 'Run the built-in ATS checker and compare your resume against target job description keywords.' },
                    { step: '04', title: 'Download Vector PDF', desc: 'Export your professional A4 resume instantly for job applications on LinkedIn and portals.' },
                ].map((s) => _jsxs("div", { className: "relative p-5 rounded-2xl bg-white border border-slate-200", children: [
                    _jsx("span", { className: "text-2xl font-light text-indigo-100 absolute top-3.5 right-3.5 select-none", children: s.step }),
                    _jsx("h4", { className: "text-sm font-medium text-slate-900 mb-1.5", children: s.title }),
                    _jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: s.desc })
                ] }, s.step))
            })
        ] }),

        /* ── PRICING / CTA ── */
        _jsx("section", { id: "pricing", className: "py-10 bg-slate-900 text-white", children:
            _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4", children: [
                _jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-indigo-400", children: "100% Free For Students" }),
                _jsx("h3", { className: "text-2xl sm:text-3xl font-semibold", children: "No Hidden Paywalls. No Watermarks." }),
                _jsx("p", { className: "text-sm text-slate-400 max-w-xl mx-auto leading-relaxed", children: "Unlike other resume builders that demand a subscription right when you try to download, ATS Free RESUME gives you free unlimited A4 PDF downloads." }),
                _jsx("div", { className: "pt-1", children:
                    _jsxs("button", { type: "button", onClick: handleStartBuilding, className: "inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-md transition-all", children: [
                        "Start Building My Free Resume", _jsx(ArrowRight, { className: "w-4 h-4" })
                    ] })
                })
            ] })
        })

    ] });
};
