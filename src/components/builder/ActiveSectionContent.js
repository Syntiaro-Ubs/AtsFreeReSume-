import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useResume } from '../../context/ResumeContext.js';
import { PersonalInfoForm } from './sections/PersonalInfoForm.js';
import { SummaryForm } from './sections/SummaryForm.js';
import { EducationForm } from './sections/EducationForm.js';
import { ExperienceForm } from './sections/ExperienceForm.js';
import { ProjectsForm } from './sections/ProjectsForm.js';
import { SkillsForm } from './sections/SkillsForm.js';
import { CertificationsForm } from './sections/CertificationsForm.js';
import { AchievementsForm } from './sections/AchievementsForm.js';
import { LanguagesForm } from './sections/LanguagesForm.js';
import { CustomSectionForm } from './sections/CustomSectionForm.js';
import { ArrowLeft, ArrowRight } from 'lucide-react';
const ORDERED_SECTIONS = [
    'personal',
    'summary',
    'education',
    'experience',
    'projects',
    'skills',
    'certifications',
    'achievements',
    'languages',
    'custom',
];
export const ActiveSectionContent = () => {
    const { activeSection, setActiveSection } = useResume();
    const currentIndex = ORDERED_SECTIONS.indexOf(activeSection);
    const prevSection = currentIndex > 0 ? ORDERED_SECTIONS[currentIndex - 1] : null;
    const nextSection = currentIndex < ORDERED_SECTIONS.length - 1 ? ORDERED_SECTIONS[currentIndex + 1] : null;
    const renderSection = () => {
        switch (activeSection) {
            case 'personal':
                return _jsx(PersonalInfoForm, {});
            case 'summary':
                return _jsx(SummaryForm, {});
            case 'education':
                return _jsx(EducationForm, {});
            case 'experience':
                return _jsx(ExperienceForm, {});
            case 'projects':
                return _jsx(ProjectsForm, {});
            case 'skills':
                return _jsx(SkillsForm, {});
            case 'certifications':
                return _jsx(CertificationsForm, {});
            case 'achievements':
                return _jsx(AchievementsForm, {});
            case 'languages':
                return _jsx(LanguagesForm, {});
            case 'custom':
                return _jsx(CustomSectionForm, {});
            default:
                return _jsx(PersonalInfoForm, {});
        }
    };
    return (_jsx("div", { className: "flex-1 flex flex-col h-full overflow-y-auto bg-slate-50/50 p-4 sm:p-6", children: _jsxs("div", { className: "max-w-2xl mx-auto w-full space-y-6 flex-1 flex flex-col justify-between", children: [
        _jsxs("div", { children: [
            /* Mobile & Tablet Section Selector Dropdown */
            _jsxs("div", { className: "md:hidden bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs mb-4 flex items-center justify-between gap-2", children: [
                _jsx("label", { htmlFor: "mobile-section-select", className: "text-xs font-bold text-slate-700 shrink-0", children: "Section:" }),
                _jsxs("select", {
                    id: "mobile-section-select",
                    value: activeSection,
                    onChange: (e) => setActiveSection(e.target.value),
                    className: "flex-1 text-xs font-semibold px-2.5 py-1.5 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 focus:ring-2 focus:ring-indigo-500",
                    children: [
                        _jsx("option", { value: "personal", children: "1. Personal Information" }),
                        _jsx("option", { value: "summary", children: "2. Professional Summary" }),
                        _jsx("option", { value: "education", children: "3. Education" }),
                        _jsx("option", { value: "experience", children: "4. Work Experience" }),
                        _jsx("option", { value: "projects", children: "5. Projects" }),
                        _jsx("option", { value: "skills", children: "6. Skills" }),
                        _jsx("option", { value: "certifications", children: "7. Certifications" }),
                        _jsx("option", { value: "achievements", children: "8. Achievements" }),
                        _jsx("option", { value: "languages", children: "9. Languages" }),
                        _jsx("option", { value: "custom", children: "10. Custom Section" })
                    ]
                })
            ] }),
            renderSection()
        ] }),
        _jsxs("div", { className: "pt-6 border-t border-slate-200 flex items-center justify-between mt-8", children: [prevSection ? (_jsxs("button", { type: "button", onClick: () => setActiveSection(prevSection), className: "inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), _jsxs("span", { className: "capitalize", children: ["Back: ", prevSection] })] })) : (_jsx("div", {})), nextSection && (_jsxs("button", { type: "button", onClick: () => setActiveSection(nextSection), className: "inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-xs transition-colors", children: [_jsxs("span", { className: "capitalize", children: ["Next: ", nextSection] }), _jsx(ArrowRight, { className: "w-4 h-4" })] }))] })
    ] }) }));
};
