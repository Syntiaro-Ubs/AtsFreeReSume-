 import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { useResume } from '../context/ResumeContext.js';
import { api } from '../services/api.js';
import { analyzeResumeATS } from '../utils/atsEngine.js';
import { emptyResumeData } from '../utils/sampleData.js';
import { Modal } from '../components/common/Modal.js';
import { FileText, Plus, Copy, Trash2, Calendar, Layers, ArrowRight, Pencil, GraduationCap, Briefcase, FolderKanban, Wrench, Award, Trophy, Globe, User, AlignLeft, LayoutList } from 'lucide-react';

// Helper: compute which sections have content in a resume
function getSectionStats(resumeData) {
    if (!resumeData) return [];
    const sections = [];
    const d = resumeData;

    if (d.personal && (d.personal.fullName || d.personal.email || d.personal.phone)) {
        sections.push({ key: 'personal', label: 'Personal', icon: User, color: 'text-slate-600 bg-slate-100' });
    }
    if (d.summary && d.summary.trim().length > 0) {
        sections.push({ key: 'summary', label: 'Summary', icon: AlignLeft, color: 'text-indigo-600 bg-indigo-50' });
    }
    if (d.education && d.education.length > 0) {
        sections.push({ key: 'education', label: `Education (${d.education.length})`, icon: GraduationCap, color: 'text-blue-600 bg-blue-50' });
    }
    if (d.experience && d.experience.length > 0) {
        sections.push({ key: 'experience', label: `Experience (${d.experience.length})`, icon: Briefcase, color: 'text-emerald-600 bg-emerald-50' });
    }
    if (d.projects && d.projects.length > 0) {
        sections.push({ key: 'projects', label: `Projects (${d.projects.length})`, icon: FolderKanban, color: 'text-violet-600 bg-violet-50' });
    }
    const skillCount = d.skills ? Object.values(d.skills).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0) : 0;
    if (skillCount > 0) {
        sections.push({ key: 'skills', label: `Skills (${skillCount})`, icon: Wrench, color: 'text-amber-600 bg-amber-50' });
    }
    if (d.certifications && d.certifications.length > 0) {
        sections.push({ key: 'certifications', label: `Certs (${d.certifications.length})`, icon: Award, color: 'text-teal-600 bg-teal-50' });
    }
    if (d.achievements && d.achievements.length > 0) {
        sections.push({ key: 'achievements', label: `Achievements (${d.achievements.length})`, icon: Trophy, color: 'text-orange-600 bg-orange-50' });
    }
    if (d.languages && d.languages.length > 0) {
        sections.push({ key: 'languages', label: `Languages (${d.languages.length})`, icon: Globe, color: 'text-pink-600 bg-pink-50' });
    }
    if (d.customSections && d.customSections.length > 0) {
        sections.push({ key: 'custom', label: `Custom (${d.customSections.length})`, icon: LayoutList, color: 'text-cyan-600 bg-cyan-50' });
    }
    return sections;
}

// Helper: compute completion percentage
function getCompletionPercent(resumeData) {
    if (!resumeData) return 0;
    const d = resumeData;
    let filled = 0;
    let total = 6; // personal, summary, education, experience, projects, skills
    if (d.personal && (d.personal.fullName || d.personal.email)) filled++;
    if (d.summary && d.summary.trim().length > 0) filled++;
    if (d.education && d.education.length > 0) filled++;
    if (d.experience && d.experience.length > 0) filled++;
    if (d.projects && d.projects.length > 0) filled++;
    const skillCount = d.skills ? Object.values(d.skills).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0) : 0;
    if (skillCount > 0) filled++;
    return Math.round((filled / total) * 100);
}

export const DashboardPage = () => {
    const { user, isAuthenticated } = useAuth();
    const { loadResume, setResumeId, setResumeTitle, setTemplateId } = useResume();
    const navigate = useNavigate();
    const location = useLocation();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // New Resume Modal state
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('My ATS Resume');
    const [selectedTemplate, setSelectedTemplate] = useState('ai_auto');
    const [isCreating, setIsCreating] = useState(false);
    // Delete modal state
    const [deleteTargetId, setDeleteTargetId] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?redirect=/dashboard');
            return;
        }
        fetchResumes();
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('action') === 'create') {
            setIsCreateModalOpen(true);
        }
    }, [location.search]);

    const fetchResumes = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.listResumes();
            setResumes(data.resumes || []);
        } catch (err) {
            setError(err.message || 'Failed to load your resumes.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNewResume = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            const baseData = JSON.parse(JSON.stringify(emptyResumeData));
            if (user) {
                baseData.personal.fullName = user.name;
                baseData.personal.email = user.email;
            }
            let chosenTemplate = selectedTemplate;
            if (selectedTemplate === 'ai_auto') {
                try {
                    const aiRes = await api.generateTemplateLayout(baseData, newTitle);
                    if (aiRes && aiRes.templateId) {
                        chosenTemplate = aiRes.templateId;
                        if (aiRes.sectionOrder) {
                            baseData.sectionOrder = aiRes.sectionOrder;
                        }
                    } else {
                        chosenTemplate = 'classic';
                    }
                } catch {
                    chosenTemplate = 'classic';
                }
            }
            const res = await api.createResume(newTitle, chosenTemplate, baseData);
            loadResume(res.resume);
            setIsCreateModalOpen(false);
            navigate(`/builder?id=${res.resume.id}`);
        } catch (err) {
            setError(err.message || 'Could not create resume.');
        } finally {
            setIsCreating(false);
        }
    };

    const handleOpenResume = (record) => {
        loadResume(record);
        navigate(`/builder?id=${record.id}`);
    };

    const handleDuplicate = async (id, e) => {
        e.stopPropagation();
        try {
            const res = await api.duplicateResume(id);
            setResumes((prev) => [res.resume, ...prev]);
        } catch (err) {
            alert('Duplicate failed: ' + err.message);
        }
    };

    const handleRename = async (record, e) => {
        e.stopPropagation();
        const title = window.prompt('Enter a new resume title', record.title);
        if (title === null || !title.trim()) return;
        try {
            const result = await api.updateResume(record.id, { title: title.trim() });
            setResumes((prev) => prev.map((resume) => resume.id === record.id ? result.resume : resume));
        } catch (err) {
            alert('Rename failed: ' + err.message);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTargetId) return;
        try {
            await api.deleteResume(deleteTargetId);
            setResumes((prev) => prev.filter((r) => r.id !== deleteTargetId));
            setDeleteTargetId(null);
        } catch (err) {
            alert('Delete failed: ' + err.message);
        }
    };

    const formatDate = (value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return _jsxs("div", { className: "min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8", children: [

        _jsxs("div", { className: "max-w-6xl mx-auto space-y-8", children: [

            /* Header */
            _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm", children: [
                _jsxs("div", { children: [
                    _jsxs("h1", { className: "text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight", children: ["Welcome back, ", user?.name || 'Developer', "!"] }),
                    _jsx("p", { className: "text-xs text-slate-500 mt-1", children: "Manage your ATS resumes, compare keyword matches, and download optimized PDFs." })
                ] }),
                _jsxs("button", {
                    type: "button", onClick: () => setIsCreateModalOpen(true),
                    className: "inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors self-start sm:self-auto",
                    children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { children: "Create New Resume" })]
                })
            ] }),

            /* Resume list */
            _jsxs("div", { children: [
                _jsx("div", { className: "flex items-center justify-between mb-4", children:
                    _jsxs("h2", { className: "text-sm font-semibold uppercase tracking-wider text-slate-700", children: ["Your Resumes (", resumes.length, ")"] })
                }),

                /* Loading */
                loading ? _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children:
                    [1, 2, 3].map((n) => _jsx("div", { className: "h-64 bg-white rounded-2xl border border-slate-200 animate-pulse" }, n))
                })

                /* Empty */
                : resumes.length === 0 ? _jsxs("div", { className: "text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-slate-300", children: [
                    _jsx(FileText, { className: "w-12 h-12 text-slate-300 mx-auto mb-3" }),
                    _jsx("h3", { className: "text-sm font-semibold text-slate-800", children: "No resumes created yet" }),
                    _jsx("p", { className: "text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4", children: "Build an ATS-friendly resume to kickstart your internship or early-career job search." }),
                    _jsxs("button", {
                        type: "button", onClick: () => setIsCreateModalOpen(true),
                        className: "inline-flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm",
                        children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { children: "Create First Resume" })]
                    })
                ] })

                /* Cards */
                : _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children:
                    resumes.map((res) => {
                        const ats = analyzeResumeATS(res.resumeData);
                        const sectionStats = getSectionStats(res.resumeData);
                        const completion = getCompletionPercent(res.resumeData);
                        const createdDate = formatDate(res.createdAt);
                        const updatedDate = formatDate(res.updatedAt);

                        return _jsxs("div", {
                            onClick: () => handleOpenResume(res),
                            className: "group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all p-5 flex flex-col justify-between cursor-pointer",
                            children: [

                                _jsxs("div", { children: [

                                    /* Top row: template + ATS badge */
                                    _jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                                        _jsxs("span", { className: "inline-flex items-center space-x-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 capitalize", children: [
                                            _jsx(Layers, { className: "w-3 h-3 text-slate-400" }),
                                            _jsx("span", { children: res.templateId })
                                        ] }),
                                        _jsxs("span", { className: `text-[11px] font-semibold px-2 py-0.5 rounded-full border ${ats.overallScore >= 85
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                            : ats.overallScore >= 70
                                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                : 'bg-rose-50 text-rose-700 border-rose-200'}`,
                                            children: ["ATS: ", ats.overallScore, "%"]
                                        })
                                    ] }),

                                    /* Title */
                                    _jsx("h3", { className: "font-semibold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors truncate", children: res.title }),

                                    /* Subtitle */
                                    _jsxs("p", { className: "text-xs text-slate-500 mt-1 truncate", children: [
                                        res.resumeData.personal.title || 'No role specified',
                                        " \u2022 ",
                                        res.resumeData.personal.fullName || 'Unnamed'
                                    ] }),

                                    /* Completion bar */
                                    _jsxs("div", { className: "mt-3 mb-1", children: [
                                        _jsxs("div", { className: "flex justify-between items-center mb-1", children: [
                                            _jsx("span", { className: "text-[10px] text-slate-400 font-medium", children: "Completion" }),
                                            _jsxs("span", { className: `text-[10px] font-semibold ${completion >= 80 ? 'text-emerald-600' : completion >= 50 ? 'text-amber-600' : 'text-slate-400'}`, children: [completion, "%"] })
                                        ] }),
                                        _jsx("div", { className: "w-full h-1.5 bg-slate-100 rounded-full overflow-hidden", children:
                                            _jsx("div", {
                                                className: `h-full rounded-full transition-all ${completion >= 80 ? 'bg-emerald-500' : completion >= 50 ? 'bg-amber-400' : 'bg-slate-300'}`,
                                                style: { width: `${completion}%` }
                                            })
                                        })
                                    ] }),

                                    /* Section tags — dynamically shows which sections are filled */
                                    sectionStats.length > 0
                                        ? _jsx("div", { className: "flex flex-wrap gap-1.5 mt-3", children:
                                            sectionStats.map((sec) =>
                                                _jsxs("span", {
                                                    className: `inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${sec.color}`,
                                                    children: [_jsx(sec.icon, { className: "w-3 h-3" }), sec.label]
                                                }, sec.key)
                                            )
                                        })
                                        : _jsx("p", { className: "text-[10px] text-slate-400 italic mt-3", children: "No sections filled yet — click to start editing" }),

                                    /* Date */
                                    _jsxs("div", { className: "flex items-center space-x-1.5 text-[11px] text-slate-400 mt-3", children: [
                                        _jsx(Calendar, { className: "w-3.5 h-3.5" }),
                                        _jsxs("span", { children: ["Created ", createdDate, " · Edited ", updatedDate] })
                                    ] })

                                ] }),

                                /* Footer */
                                _jsxs("div", { className: "pt-4 mt-4 border-t border-slate-100 flex items-center justify-between", children: [
                                    _jsxs("span", { className: "inline-flex items-center space-x-1 text-xs font-medium text-indigo-600 group-hover:translate-x-0.5 transition-transform", children: [
                                        _jsx("span", { children: "Open Editor" }),
                                        _jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                                    ] }),
                                    _jsxs("div", { className: "flex items-center space-x-1", onClick: (e) => e.stopPropagation(), children: [
                                        _jsx("button", { type: "button", onClick: (e) => handleRename(res, e), className: "p-1.5 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50", title: "Rename Resume", children: _jsx(Pencil, { className: "w-4 h-4" }) }),
                                        _jsx("button", { type: "button", onClick: (e) => handleDuplicate(res.id, e), className: "p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100", title: "Duplicate Resume", children: _jsx(Copy, { className: "w-4 h-4" }) }),
                                        _jsx("button", { type: "button", onClick: (e) => { e.stopPropagation(); setDeleteTargetId(res.id); }, className: "p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50", title: "Delete Resume", children: _jsx(Trash2, { className: "w-4 h-4" }) })
                                    ] })
                                ] })

                            ]
                        }, res.id);
                    })
                })
            ] })

        ] }),

        /* Create Modal */
        _jsx(Modal, { isOpen: isCreateModalOpen, onClose: () => setIsCreateModalOpen(false), title: "Create New ATS Resume", subtitle: "Choose a title and template to get started.", maxWidth: "md", children:
            _jsxs("form", { onSubmit: handleCreateNewResume, className: "space-y-4", children: [
                _jsxs("div", { children: [
                    _jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "Resume Title" }),
                    _jsx("input", { type: "text", required: true, value: newTitle, onChange: (e) => setNewTitle(e.target.value), placeholder: "e.g. Full-Stack Developer 2026", className: "w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })
                ] }),
                _jsxs("div", { children: [
                    _jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "Template Layout" }),
                    _jsxs("select", { value: selectedTemplate, onChange: (e) => setSelectedTemplate(e.target.value), className: "w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white font-medium", children: [
                        _jsx("option", { value: "ai_auto", children: "✨ AI Auto-Pick Best Template (Recommended)" }),
                        _jsx("option", { value: "classic", children: "Classic ATS Single-Column" }),
                        _jsx("option", { value: "student", children: "Student & Intern Special" }),
                        _jsx("option", { value: "photo", children: "Profile Photo Template" }),
                        _jsx("option", { value: "modern", children: "Modern Tech" }),
                        _jsx("option", { value: "professional", children: "Corporate Professional" }),
                        _jsx("option", { value: "minimal", children: "Minimal Single-Column" })
                    ] })
                ] }),
                _jsxs("div", { className: "flex items-center justify-end space-x-2 pt-2", children: [
                    _jsx("button", { type: "button", onClick: () => setIsCreateModalOpen(false), className: "px-3 py-2 text-xs text-slate-600 hover:text-slate-800", children: "Cancel" }),
                    _jsx("button", { type: "submit", disabled: isCreating, className: "bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm", children: isCreating ? 'Creating...' : 'Start Building' })
                ] })
            ] })
        }),

        /* Delete Modal */
        _jsx(Modal, { isOpen: !!deleteTargetId, onClose: () => setDeleteTargetId(null), title: "Delete Resume", maxWidth: "sm", children:
            _jsxs("div", { className: "space-y-4 text-xs text-slate-600", children: [
                _jsx("p", { children: "Are you sure you want to permanently delete this resume? This action cannot be undone." }),
                _jsxs("div", { className: "flex items-center justify-end space-x-2 pt-2", children: [
                    _jsx("button", { type: "button", onClick: () => setDeleteTargetId(null), className: "px-3 py-1.5 text-slate-600 hover:text-slate-800", children: "Cancel" }),
                    _jsx("button", { type: "button", onClick: handleDeleteConfirm, className: "bg-rose-600 hover:bg-rose-700 text-white font-semibold px-3 py-1.5 rounded-lg shadow-sm", children: "Delete Permanently" })
                ] })
            ] })
        })

    ] });
};
