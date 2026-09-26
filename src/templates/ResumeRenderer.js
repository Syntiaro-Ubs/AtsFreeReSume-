import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { TemplateClassic } from './TemplateClassic.js';
import { TemplateProfessional } from './TemplateProfessional.js';
import { TemplateModern } from './TemplateModern.js';
import { TemplateMinimal } from './TemplateMinimal.js';
import { TemplateStudent } from './TemplateStudent.js';
import { TemplateWithPhoto } from './TemplateWithPhoto.js';
import { TemplateCreative } from './TemplateCreative.js';
import { TemplateCompact } from './TemplateCompact.js';
import { TemplateExecutive } from './TemplateExecutive.js';
import { TemplateTech } from './TemplateTech.js';

export const ResumeRenderer = ({ resume, data, templateId }) => {
    const activeResume = resume || data;
    switch (templateId) {
        case 'classic':
            return _jsx(TemplateClassic, { resume: activeResume });
        case 'professional':
            return _jsx(TemplateProfessional, { resume: activeResume });
        case 'modern':
            return _jsx(TemplateModern, { resume: activeResume });
        case 'minimal':
            return _jsx(TemplateMinimal, { resume: activeResume });
        case 'student':
            return _jsx(TemplateStudent, { resume: activeResume });
        case 'photo':
            return _jsx(TemplateWithPhoto, { resume: activeResume });
        case 'creative':
            return _jsx(TemplateCreative, { resume: activeResume });
        case 'compact':
            return _jsx(TemplateCompact, { resume: activeResume });
        case 'executive':
            return _jsx(TemplateExecutive, { resume: activeResume });
        case 'tech':
            return _jsx(TemplateTech, { resume: activeResume });
        default:
            return _jsx(TemplateClassic, { resume: activeResume });
    }
};
