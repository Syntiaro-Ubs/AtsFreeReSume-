import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext.js';
import { api } from '../../services/api.js';
import { exportResumeToPDF, triggerPrint } from '../../utils/pdfExport.js';
import { PaymentModal } from '../common/PaymentModal.js';
import { FileText, FileDown, Sparkles, Search, Check, AlertCircle, Loader2, ChevronLeft, Eye, Edit2, Lock } from 'lucide-react';

export const BuilderTopBar = ({ onOpenATS, onOpenJD }) => {
    const {
        resumeId,
        resumeTitle,
        setResumeTitle,
        saveStatus,
        atsResult,
        isMobilePreviewOpen,
        setIsMobilePreviewOpen,
        isPaid,
        markAsPaid,
        isPaymentModalOpen,
        setIsPaymentModalOpen
    } = useResume();

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const executeExport = async () => {
        if (isExporting) return;
        setIsExporting(true);
        try {
            // Step 11: Call protected backend endpoint GET /api/resumes/:id/download
            if (resumeId) {
                const authCheck = await api.downloadAuthorizedResume(resumeId);
                if (!authCheck || !authCheck.downloadAllowed) {
                    setIsPaymentModalOpen(true);
                    return;
                }
            }
            const filename = `${resumeTitle.replace(/[^a-zA-Z0-9_-]/g, '_') || 'Resume'}.pdf`;
            await exportResumeToPDF('resume-preview-sheet', filename);
        } catch (err) {
            console.error('Download authorization or export failed:', err);
            if (err.message && err.message.toLowerCase().includes('payment')) {
                setIsPaymentModalOpen(true);
            } else {
                triggerPrint();
            }
        } finally {
            setIsExporting(false);
        }
    };

    const handleDownloadPDF = async () => {
        if (!isPaid) {
            setIsPaymentModalOpen(true);
            return;
        }
        await executeExport();
    };

    const handlePaymentSuccess = () => {
        markAsPaid();
        setIsPaymentModalOpen(false);
        executeExport();
    };

    const getScoreBadge = (score) => {
        if (score >= 80) return 'text-emerald-700 bg-emerald-50/90 border-emerald-300';
        if (score >= 60) return 'text-amber-700 bg-amber-50/90 border-amber-300';
        return 'text-rose-700 bg-rose-50/90 border-rose-300';
    };

    return (_jsxs("header", { className: "sticky top-0 z-30 bg-white border-b border-slate-200/90 h-14 px-3 sm:px-5 flex items-center justify-between no-print shadow-2xs", children: [
        
        /* Left Section: Back + Title */
        _jsxs("div", { className: "flex items-center space-x-2.5 min-w-0", children: [
            _jsx(Link, { to: "/dashboard", className: "p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors", title: "Back to Dashboard", children: _jsx(ChevronLeft, { className: "w-5 h-5" }) }),
            _jsx("div", { className: "h-4 w-px bg-slate-200 hidden sm:block" }),
            _jsxs("div", { className: "flex items-center space-x-2 min-w-0", children: [
                _jsx("div", { className: "w-6 h-6 rounded bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0", children: _jsx(FileText, { className: "w-3.5 h-3.5" }) }),
                isEditingTitle ? (
                    _jsx("input", { type: "text", autoFocus: true, value: resumeTitle, onChange: (e) => setResumeTitle(e.target.value), onBlur: () => setIsEditingTitle(false), onKeyDown: (e) => e.key === 'Enter' && setIsEditingTitle(false), className: "text-xs sm:text-sm font-semibold text-slate-900 px-2 py-0.5 border border-indigo-500 rounded focus:outline-hidden" })
                ) : (
                    _jsxs("button", { type: "button", onClick: () => setIsEditingTitle(true), className: "flex items-center space-x-1.5 py-0.5 px-1.5 rounded hover:bg-slate-100 transition-colors text-left min-w-0 group", title: "Click to rename", children: [
                        _jsx("span", { className: "text-xs sm:text-sm font-bold text-slate-900 truncate max-w-[120px] sm:max-w-[200px] md:max-w-[260px]", children: resumeTitle }),
                        _jsx(Edit2, { className: "w-3 h-3 text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" })
                    ] })
                ),
                _jsxs("div", { className: "hidden sm:flex items-center text-[11px] font-medium text-slate-500 ml-1", children: [
                    saveStatus === 'saving' && (_jsxs("span", { className: "flex items-center space-x-1 text-slate-500", children: [_jsx(Loader2, { className: "w-3 h-3 animate-spin text-indigo-500" }), _jsx("span", { className: "hidden md:inline", children: "Saving" })] })),
                    saveStatus === 'saved' && (_jsxs("span", { className: "flex items-center space-x-1 text-emerald-600", children: [_jsx(Check, { className: "w-3 h-3" }), _jsx("span", { className: "hidden md:inline", children: "Saved" })] })),
                    saveStatus === 'unsaved' && (_jsxs("span", { className: "flex items-center space-x-1 text-slate-400", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-400" }), _jsx("span", { className: "hidden md:inline", children: "Unsaved" })] })),
                    saveStatus === 'error' && (_jsxs("span", { className: "flex items-center space-x-1 text-rose-500", children: [_jsx(AlertCircle, { className: "w-3 h-3" }), _jsx("span", { className: "hidden md:inline", children: "Failed" })] }))
                ] })
            ] })
        ] }),

        /* Middle Section: ATS & JD Matcher */
        _jsxs("div", { className: "flex items-center space-x-2", children: [
            _jsxs("button", { type: "button", onClick: onOpenATS, className: `inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold transition-all hover:brightness-95 ${getScoreBadge(atsResult.overallScore)}`, title: "Open ATS Compatibility Scanner", children: [_jsx(Sparkles, { className: "w-3 h-3" }), _jsxs("span", { children: ["ATS: ", atsResult.overallScore, "%"] })] }),
            _jsxs("button", { type: "button", onClick: onOpenJD, className: "inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors shadow-2xs", title: "Compare resume with a job description", children: [_jsx(Search, { className: "w-3 h-3 text-slate-500" }), _jsx("span", { children: "JD Matcher" })] })
        ] }),

        /* Right Section: Mobile Preview Toggle & Download PDF */
        _jsxs("div", { className: "flex items-center space-x-2 shrink-0", children: [
            _jsxs("button", { type: "button", onClick: () => setIsMobilePreviewOpen(!isMobilePreviewOpen), className: "lg:hidden inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors", children: [_jsx(Eye, { className: "w-3.5 h-3.5" }), _jsx("span", { children: isMobilePreviewOpen ? 'Edit' : 'Preview' })] }),
            
            /* Download Button */
            _jsx("button", {
                type: "button",
                onClick: handleDownloadPDF,
                disabled: isExporting,
                className: `inline-flex items-center space-x-2 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-xs transition-all hover:shadow cursor-pointer ${!isPaid ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'}`,
                title: !isPaid ? "Pay ₹99 & Download Vector PDF" : "Download resume as ATS-friendly A4 PDF",
                children: isExporting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-3.5 h-3.5 animate-spin" }), _jsx("span", { children: "Generating PDF..." })] })) : (_jsxs(_Fragment, { children: [
                    !isPaid ? _jsx(Lock, { className: "w-3.5 h-3.5" }) : _jsx(FileDown, { className: "w-3.5 h-3.5" }),
                    _jsx("span", { children: !isPaid ? "Pay ₹99 & Download PDF" : "Download PDF" })
                ] }))
            })
        ] }),

        /* Payment Modal */
        _jsx(PaymentModal, {
            isOpen: isPaymentModalOpen,
            onClose: () => setIsPaymentModalOpen(false),
            onSuccess: handlePaymentSuccess
        })

    ] }));
};
