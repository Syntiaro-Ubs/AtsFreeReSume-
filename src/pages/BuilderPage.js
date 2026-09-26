import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useResume } from '../context/ResumeContext.js';
import { useAuth } from '../context/AuthContext.js';
import { api } from '../services/api.js';
import { BuilderTopBar } from '../components/builder/BuilderTopBar.js';
import { BuilderSidebar } from '../components/builder/BuilderSidebar.js';
import { ActiveSectionContent } from '../components/builder/ActiveSectionContent.js';
import { LivePreviewPanel } from '../components/builder/LivePreviewPanel.js';
import { ATSAnalyzerModal } from '../components/ats/ATSAnalyzerModal.js';
import { JobDescriptionModal } from '../components/ats/JobDescriptionModal.js';
export const BuilderPage = () => {
    const { resumeId, loadResume, setTemplateId, atsResult, resumeData, isMobilePreviewOpen, } = useResume();
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const [isATSModalOpen, setIsATSModalOpen] = useState(false);
    const [isJDModalOpen, setIsJDModalOpen] = useState(false);
    const [isLoadingResume, setIsLoadingResume] = useState(false);
    // Load from query string if ID provided
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const idFromUrl = params.get('id');
        const templateFromUrl = params.get('template');
        if (templateFromUrl) {
            setTemplateId(templateFromUrl);
        }
        if (idFromUrl && idFromUrl !== resumeId && isAuthenticated) {
            setIsLoadingResume(true);
            api
                .getResume(idFromUrl)
                .then((res) => {
                if (res.resume) {
                    loadResume(res.resume);
                }
            })
                .catch((err) => {
                console.warn('Could not load specific resume from server:', err);
            })
                .finally(() => {
                setIsLoadingResume(false);
            });
        }
    }, [location.search, isAuthenticated]);
    return (_jsxs("div", { className: "h-screen flex flex-col overflow-hidden bg-slate-100 font-sans", children: [_jsx(BuilderTopBar, { onOpenATS: () => setIsATSModalOpen(true), onOpenJD: () => setIsJDModalOpen(true) }), _jsxs("div", { className: "flex-1 flex overflow-hidden", children: [_jsx("div", { className: "hidden md:flex", children: _jsx(BuilderSidebar, {}) }), _jsx("div", { className: `flex-1 flex flex-col overflow-hidden ${isMobilePreviewOpen ? 'hidden lg:flex' : 'flex'}`, children: isLoadingResume ? (_jsx("div", { className: "flex-1 flex items-center justify-center text-xs text-slate-500", children: "Loading resume details..." })) : (_jsx(ActiveSectionContent, {})) }), _jsx("div", { className: `lg:flex flex-1 lg:w-1/2 overflow-hidden ${isMobilePreviewOpen ? 'flex w-full' : 'hidden'}`, children: _jsx(LivePreviewPanel, {}) })] }), _jsx(ATSAnalyzerModal, { isOpen: isATSModalOpen, onClose: () => setIsATSModalOpen(false), result: atsResult }), _jsx(JobDescriptionModal, { isOpen: isJDModalOpen, onClose: () => setIsJDModalOpen(false), resumeData: resumeData })] }));
};
