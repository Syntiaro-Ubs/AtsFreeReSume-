import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext.js';
import { ResumeRenderer } from '../../templates/ResumeRenderer.js';
import { ZoomIn, ZoomOut, Maximize2, Palette, Lock, ShieldAlert, Sparkles } from 'lucide-react';

export const LivePreviewPanel = () => {
    const { resumeData, templateId, setTemplateId, isPaid, setIsPaymentModalOpen } = useResume();
    const [zoomLevel, setZoomLevel] = useState(0.75);
    const [showWarningToast, setShowWarningToast] = useState(false);

    const handleZoomIn = () => setZoomLevel((prev) => Math.min(Number((prev + 0.05).toFixed(2)), 1.25));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(Number((prev - 0.05).toFixed(2)), 0.35));
    const handleResetZoom = () => setZoomLevel(window.innerWidth < 640 ? 0.55 : 0.75);

    // Auto-adjust preview zoom level for Mobile, Tablet, and Desktop screen sizes
    useEffect(() => {
        const updateZoomForScreen = () => {
            if (window.innerWidth < 480) {
                setZoomLevel(0.48);
            } else if (window.innerWidth < 640) {
                setZoomLevel(0.58);
            } else if (window.innerWidth < 1024) {
                setZoomLevel(0.70);
            } else {
                setZoomLevel(0.75);
            }
        };
        updateZoomForScreen();
        window.addEventListener('resize', updateZoomForScreen);
        return () => window.removeEventListener('resize', updateZoomForScreen);
    }, []);

    // Anti-screenshot & Print protection listeners
    useEffect(() => {
        if (isPaid) return;

        const handleKeyDown = (e) => {
            // Block PrintScreen / Snapshot
            if (e.key === 'PrintScreen' || e.key === 'Snapshot') {
                e.preventDefault();
                setShowWarningToast(true);
                setTimeout(() => setShowWarningToast(false), 3500);
            }
            // Block Ctrl+P / Cmd+P (Print) -> Open Payment Modal
            if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
                e.preventDefault();
                setIsPaymentModalOpen(true);
            }
            // Block Ctrl+S / Cmd+S (Save)
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
                e.preventDefault();
                setIsPaymentModalOpen(true);
            }
        };

        const handleKeyUp = (e) => {
            if (e.key === 'PrintScreen' || e.key === 'Snapshot') {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(''); // Clear clipboard screenshot
                }
                setShowWarningToast(true);
                setTimeout(() => setShowWarningToast(false), 3500);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isPaid, setIsPaymentModalOpen]);

    const templates = [
        { id: 'modern', label: 'Modern' },
        { id: 'classic', label: 'Classic' },
        { id: 'professional', label: 'Professional' },
        { id: 'minimal', label: 'Minimal' },
        { id: 'student', label: 'Student' },
        { id: 'photo', label: 'With Photo' },
        { id: 'creative', label: 'Creative' },
        { id: 'compact', label: 'Compact Grid' },
        { id: 'executive', label: 'Executive' },
        { id: 'tech', label: 'Developer Stack' },
    ];

    return (_jsxs("div", {
        className: `flex-1 flex flex-col h-full bg-slate-100/80 overflow-hidden relative ${!isPaid ? 'select-none' : ''}`,
        onContextMenu: (e) => {
            if (!isPaid) {
                e.preventDefault();
                setShowWarningToast(true);
                setTimeout(() => setShowWarningToast(false), 3000);
            }
        },
        children: [
        
        /* Top Preview Toolbar */
        _jsxs("div", { className: "bg-white border-b border-slate-200/90 px-3.5 py-2 flex items-center justify-between gap-2 z-10 no-print shadow-2xs shrink-0", children: [
            
            _jsxs("div", { className: "flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5", children: [
                _jsxs("span", { className: "text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center shrink-0", children: [
                    _jsx(Palette, { className: "w-3 h-3 mr-1" }),
                    "Style:"
                ] }),

                templates.map((t) => (_jsx("button", {
                    type: "button",
                    onClick: () => setTemplateId(t.id),
                    className: `text-xs px-2.5 py-1 rounded-md font-medium transition-all shrink-0 cursor-pointer ${templateId === t.id
                        ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'}`,
                    children: t.label
                }, t.id)))
            ] }),

            _jsx("div", { className: "flex items-center space-x-1 shrink-0", children:
                _jsxs("div", { className: "flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs text-slate-600", children: [
                    _jsx("button", { type: "button", onClick: handleZoomOut, className: "p-1 hover:bg-white hover:text-slate-900 rounded transition-colors cursor-pointer", title: "Zoom out", children: _jsx(ZoomOut, { className: "w-3.5 h-3.5" }) }),
                    _jsxs("span", { className: "px-1.5 font-semibold text-[11px] min-w-9 text-center", children: [Math.round(zoomLevel * 100), "%"] }),
                    _jsx("button", { type: "button", onClick: handleZoomIn, className: "p-1 hover:bg-white hover:text-slate-900 rounded transition-colors cursor-pointer", title: "Zoom in", children: _jsx(ZoomIn, { className: "w-3.5 h-3.5" }) }),
                    _jsx("button", { type: "button", onClick: handleResetZoom, className: "p-1 hover:bg-white hover:text-slate-900 rounded transition-colors cursor-pointer ml-0.5", title: "Reset Zoom to 75%", children: _jsx(Maximize2, { className: "w-3.5 h-3.5" }) })
                ] })
            })
        ] }),

        /* Screenshot Warning Toast */
        showWarningToast && (
            _jsxs("div", { className: "absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-amber-500/50 flex items-center space-x-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-150", children: [
                _jsx(ShieldAlert, { className: "w-4 h-4 text-amber-400 shrink-0" }),
                _jsx("span", { children: "Screenshots & copying are protected! Pay ₹99 to download vector A4 PDF." }),
                _jsxs("button", {
                    type: "button",
                    onClick: () => setIsPaymentModalOpen(true),
                    className: "ml-2 px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-[11px] transition-colors cursor-pointer",
                    children: "Pay ₹99"
                })
            ] })
        ),

        /* A4 Page View */
        _jsx("div", { className: "flex-1 overflow-auto p-4 sm:p-6 flex justify-center items-start relative", children:
            _jsx("div", { className: "transition-transform duration-100 origin-top flex justify-center relative", style: { transform: `scale(${zoomLevel})` }, children:
                _jsxs("div", { id: "resume-preview-sheet", className: "a4-page bg-white relative text-slate-900 shadow-lg rounded-xs overflow-hidden", children: [
                    
                    _jsx(ResumeRenderer, { data: resumeData, templateId: templateId }),

                    /* Repeating Anti-Screenshot Watermark Grid (When Unpaid) */
                    !isPaid && (
                        _jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden z-20 flex flex-wrap content-around justify-around opacity-25 select-none no-print", children:
                            Array.from({ length: 18 }).map((_, i) => (
                                _jsxs("div", { className: "transform -rotate-25 text-slate-900 text-xs font-bold font-mono uppercase tracking-widest p-6 text-center leading-relaxed", children: [
                                    _jsx("span", { className: "block text-indigo-900 font-extrabold text-sm", children: "ATS Free RESUME Preview" }),
                                    _jsx("span", { className: "block text-[10px] text-slate-700", children: "Pay ₹99 to Unlock PDF" })
                                ] }, i)
                            ))
                        })
                    )

                ] })
            })
        }),

        /* Bottom Paywall Banner when Unpaid */
        !isPaid ? (
            _jsxs("div", { className: "bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 border-t border-indigo-500/40 px-4 py-2 text-xs text-white flex items-center justify-between no-print shrink-0 shadow-lg z-10", children: [
                _jsxs("div", { className: "flex items-center space-x-2", children: [
                    _jsx(Lock, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
                    _jsxs("span", { className: "font-semibold text-slate-200", children: [
                        "Watermarked Preview Mode • ",
                        _jsx("span", { className: "text-emerald-400 font-bold", children: "Pay ₹99" }),
                        " to download high-resolution A4 PDF"
                    ] })
                ] }),
                _jsxs("button", {
                    type: "button",
                    onClick: () => setIsPaymentModalOpen(true),
                    className: "inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-md transition-all cursor-pointer hover:scale-102",
                    children: [
                        _jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                        _jsx("span", { children: "Unlock & Download (₹99)" })
                    ]
                })
            ] })
        ) : (
            _jsxs("div", { className: "bg-white/90 backdrop-blur-xs border-t border-slate-200 px-4 py-1.5 text-[11px] text-slate-500 flex items-center justify-between no-print shrink-0", children: [
                _jsx("span", { className: "text-emerald-700 font-semibold flex items-center space-x-1", children: [
                    _jsx(Lock, { className: "w-3 h-3 text-emerald-600" }),
                    _jsx("span", { children: "Unlocked & Paid • Unlimited High-Res Downloads" })
                ] }),
                _jsx("span", { className: "hidden sm:inline text-slate-400", children: "Crisp vector A4 PDF enabled" })
            ] })
        )

    ] }));
};
