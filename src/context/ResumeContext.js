import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { emptyResumeData } from '../utils/sampleData.js';
import { analyzeResumeATS } from '../utils/atsEngine.js';
import { api } from '../services/api.js';
const ResumeContext = createContext(undefined);
export const ResumeProvider = ({ children }) => {
    const [resumeId, setResumeId] = useState(null);
    const [resumeTitle, setResumeTitle] = useState('My Professional Resume');
    const [templateId, setTemplateId] = useState('classic');
    const [resumeData, setResumeData] = useState(emptyResumeData);
    const [saveStatus, setSaveStatus] = useState('saved');
    const [lastSavedAt, setLastSavedAt] = useState(new Date());
    const [activeSection, setActiveSection] = useState('personal');
    const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
    const [atsResult, setAtsResult] = useState(() => analyzeResumeATS(emptyResumeData));
    const [isPaid, setIsPaid] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const checkBackendPaymentStatus = useCallback(async (id) => {
        if (!id) {
            setIsPaid(false);
            return;
        }
        try {
            const res = await api.getPaymentStatus(id);
            if (res && res.downloadAllowed) {
                setIsPaid(true);
            } else {
                setIsPaid(false);
            }
        } catch {
            setIsPaid(false);
        }
    }, []);

    useEffect(() => {
        if (resumeId) {
            checkBackendPaymentStatus(resumeId);
        } else {
            setIsPaid(false);
        }
    }, [resumeId, checkBackendPaymentStatus]);

    const markAsPaid = () => {
        setIsPaid(true);
        if (resumeId) {
            checkBackendPaymentStatus(resumeId);
        }
    };
    const saveTimerRef = useRef(null);
    const isInitialMount = useRef(true);
    // Recalculate ATS result whenever resumeData changes
    useEffect(() => {
        const result = analyzeResumeATS(resumeData);
        setAtsResult(result);
    }, [resumeData]);
    // Debounced autosave
    const performSave = useCallback(async (id, title, template, data) => {
        if (!id)
            return;
        setSaveStatus('saving');
        try {
            await api.updateResume(id, {
                title,
                templateId: template,
                resumeData: data,
            });
            setSaveStatus('saved');
            setLastSavedAt(new Date());
        }
        catch (err) {
            console.error('Autosave failed:', err);
            setSaveStatus('error');
        }
    }, []);
    const triggerAutosave = useCallback(() => {
        setSaveStatus('unsaved');
        if (saveTimerRef.current) {
            clearTimeout(saveTimerRef.current);
        }
        saveTimerRef.current = setTimeout(() => {
            performSave(resumeId, resumeTitle, templateId, resumeData);
        }, 1200);
    }, [resumeId, resumeTitle, templateId, resumeData, performSave]);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        if (resumeId) {
            triggerAutosave();
        }
    }, [resumeData, resumeTitle, templateId, resumeId, triggerAutosave]);
    const manualSave = async () => {
        if (!resumeId)
            return;
        setSaveStatus('saving');
        try {
            await api.updateResume(resumeId, {
                title: resumeTitle,
                templateId,
                resumeData,
            });
            setSaveStatus('saved');
            setLastSavedAt(new Date());
        }
        catch (err) {
            setSaveStatus('error');
        }
    };
    const loadResume = (record) => {
        setResumeId(record.id);
        setResumeTitle(record.title);
        setTemplateId(record.templateId);
        setResumeData(record.resumeData);
        setSaveStatus('saved');
        setLastSavedAt(new Date(record.updatedAt));
    };
    const loadSampleData = () => {
        setResumeData(JSON.parse(JSON.stringify(emptyResumeData)));
        setSaveStatus('unsaved');
    };
    const clearResumeData = () => {
        setResumeData(JSON.parse(JSON.stringify(emptyResumeData)));
        setSaveStatus('unsaved');
    };
    // Updaters
    const updatePersonal = (updates) => {
        setResumeData((prev) => ({
            ...prev,
            personal: { ...prev.personal, ...updates },
        }));
    };
    const updateSummary = (summary) => {
        setResumeData((prev) => ({ ...prev, summary }));
    };
    const setSectionOrder = (newOrder) => {
        setResumeData((prev) => ({ ...prev, sectionOrder: newOrder }));
    };
    // Education
    const addEducation = (item) => {
        const newItem = { ...item, id: `edu-${Date.now()}` };
        setResumeData((prev) => ({
            ...prev,
            education: [...prev.education, newItem],
        }));
    };
    const updateEducation = (id, updates) => {
        setResumeData((prev) => ({
            ...prev,
            education: prev.education.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        }));
    };
    const deleteEducation = (id) => {
        setResumeData((prev) => ({
            ...prev,
            education: prev.education.filter((e) => e.id !== id),
        }));
    };
    const reorderEducation = (fromIndex, toIndex) => {
        setResumeData((prev) => {
            const copy = [...prev.education];
            const [moved] = copy.splice(fromIndex, 1);
            copy.splice(toIndex, 0, moved);
            return { ...prev, education: copy };
        });
    };
    // Experience
    const addExperience = (item) => {
        const newItem = { ...item, id: `exp-${Date.now()}` };
        setResumeData((prev) => ({
            ...prev,
            experience: [...prev.experience, newItem],
        }));
    };
    const updateExperience = (id, updates) => {
        setResumeData((prev) => ({
            ...prev,
            experience: prev.experience.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        }));
    };
    const deleteExperience = (id) => {
        setResumeData((prev) => ({
            ...prev,
            experience: prev.experience.filter((e) => e.id !== id),
        }));
    };
    // Projects
    const addProject = (item) => {
        const newItem = { ...item, id: `proj-${Date.now()}` };
        setResumeData((prev) => ({
            ...prev,
            projects: [...prev.projects, newItem],
        }));
    };
    const updateProject = (id, updates) => {
        setResumeData((prev) => ({
            ...prev,
            projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
    };
    const deleteProject = (id) => {
        setResumeData((prev) => ({
            ...prev,
            projects: prev.projects.filter((p) => p.id !== id),
        }));
    };
    // Skills
    const addSkill = (category, skill) => {
        const trimmed = skill.trim();
        if (!trimmed)
            return;
        setResumeData((prev) => {
            const current = prev.skills[category] || [];
            if (current.includes(trimmed))
                return prev;
            return {
                ...prev,
                skills: {
                    ...prev.skills,
                    [category]: [...current, trimmed],
                },
            };
        });
    };
    const removeSkill = (category, skill) => {
        setResumeData((prev) => ({
            ...prev,
            skills: {
                ...prev.skills,
                [category]: (prev.skills[category] || []).filter((s) => s !== skill),
            },
        }));
    };
    // Certifications
    const addCertification = (item) => {
        const newItem = { ...item, id: `cert-${Date.now()}` };
        setResumeData((prev) => ({
            ...prev,
            certifications: [...prev.certifications, newItem],
        }));
    };
    const updateCertification = (id, updates) => {
        setResumeData((prev) => ({
            ...prev,
            certifications: prev.certifications.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        }));
    };
    const deleteCertification = (id) => {
        setResumeData((prev) => ({
            ...prev,
            certifications: prev.certifications.filter((c) => c.id !== id),
        }));
    };
    // Achievements
    const addAchievement = (item) => {
        const newItem = { ...item, id: `ach-${Date.now()}` };
        setResumeData((prev) => ({
            ...prev,
            achievements: [...prev.achievements, newItem],
        }));
    };
    const updateAchievement = (id, updates) => {
        setResumeData((prev) => ({
            ...prev,
            achievements: prev.achievements.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        }));
    };
    const deleteAchievement = (id) => {
        setResumeData((prev) => ({
            ...prev,
            achievements: prev.achievements.filter((a) => a.id !== id),
        }));
    };
    // Languages
    const addLanguage = (language, proficiency) => {
        const trimmed = language.trim();
        if (!trimmed)
            return;
        const newItem = { id: `lang-${Date.now()}`, language: trimmed, proficiency };
        setResumeData((prev) => ({
            ...prev,
            languages: [...prev.languages, newItem],
        }));
    };
    const deleteLanguage = (id) => {
        setResumeData((prev) => ({
            ...prev,
            languages: prev.languages.filter((l) => l.id !== id),
        }));
    };
    // Custom Sections
    const addCustomSection = (title) => {
        const trimmed = title.trim();
        if (!trimmed)
            return;
        const newSec = {
            id: `custom-${Date.now()}`,
            title: trimmed,
            items: [{ id: `citem-${Date.now()}`, title: 'Example Title', subtitle: 'Organization', date: '2024', description: 'Description of key duties or contributions.' }],
        };
        setResumeData((prev) => ({
            ...prev,
            customSections: [...prev.customSections, newSec],
        }));
    };
    const updateCustomSection = (id, updates) => {
        setResumeData((prev) => ({
            ...prev,
            customSections: prev.customSections.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        }));
    };
    const deleteCustomSection = (id) => {
        setResumeData((prev) => ({
            ...prev,
            customSections: prev.customSections.filter((s) => s.id !== id),
        }));
    };
    return (_jsx(ResumeContext.Provider, { value: {
            resumeId,
            resumeTitle,
            templateId,
            resumeData,
            saveStatus,
            lastSavedAt,
            activeSection,
            atsResult,
            isMobilePreviewOpen,
            isPaid,
            markAsPaid,
            checkBackendPaymentStatus,
            isPaymentModalOpen,
            setIsPaymentModalOpen,
            setResumeId,
            setResumeTitle,
            setTemplateId,
            setActiveSection,
            setIsMobilePreviewOpen,
            loadResume,
            loadSampleData,
            clearResumeData,
            manualSave,
            updatePersonal,
            updateSummary,
            setSectionOrder,
            addEducation,
            updateEducation,
            deleteEducation,
            reorderEducation,
            addExperience,
            updateExperience,
            deleteExperience,
            addProject,
            updateProject,
            deleteProject,
            addSkill,
            removeSkill,
            addCertification,
            updateCertification,
            deleteCertification,
            addAchievement,
            updateAchievement,
            deleteAchievement,
            addLanguage,
            deleteLanguage,
            addCustomSection,
            updateCustomSection,
            deleteCustomSection,
        }, children: children }));
};
export function useResume() {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
}
