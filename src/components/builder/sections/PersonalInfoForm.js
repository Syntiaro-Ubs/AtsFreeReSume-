import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef } from 'react';
import { useResume } from '../../../context/ResumeContext.js';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, Camera, X, Upload } from 'lucide-react';

export const PersonalInfoForm = () => {
    const { resumeData, updatePersonal } = useResume();
    const { personal } = resumeData;
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updatePersonal({ [name]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file (JPG, PNG, WEBP).');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert('Photo size should be less than 2MB.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (evt) => {
            if (evt.target?.result) {
                updatePersonal({ photo: evt.target.result });
            }
        };
        reader.readAsDataURL(file);
    };

    const handleRemovePhoto = () => {
        updatePersonal({ photo: '' });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (_jsxs("div", { className: "space-y-4", children: [
        _jsxs("div", { children: [
            _jsx("h3", { className: "text-sm font-bold uppercase tracking-wider text-slate-900 mb-1", children: "Personal & Contact Information" }),
            _jsx("p", { className: "text-xs text-slate-500", children: "Enter accurate contact details so recruiters and applicant tracking systems can reach you." })
        ] }),

        /* Photo Upload Card */
        _jsxs("div", { className: "p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3", children: [
            _jsxs("div", { className: "flex items-center space-x-3", children: [
                _jsx("div", { className: "relative w-14 h-14 rounded-full overflow-hidden bg-white border-2 border-slate-300 flex items-center justify-center shrink-0 shadow-2xs", children:
                    personal.photo ? (
                        _jsx("img", { src: personal.photo, alt: "Profile preview", className: "w-full h-full object-cover" })
                    ) : (
                        _jsx(Camera, { className: "w-6 h-6 text-slate-400" })
                    )
                }),
                _jsxs("div", { children: [
                    _jsx("p", { className: "text-xs font-semibold text-slate-900", children: "Profile Photo" }),
                    _jsx("p", { className: "text-[11px] text-slate-500", children: "JPG, PNG, or WEBP under 2MB. Displayed on photo-enabled templates." })
                ] })
            ] }),
            _jsxs("div", { className: "flex items-center space-x-2 shrink-0", children: [
                _jsx("input", {
                    ref: fileInputRef,
                    type: "file",
                    accept: "image/*",
                    onChange: handlePhotoChange,
                    className: "hidden"
                }),
                _jsxs("button", {
                    type: "button",
                    onClick: () => fileInputRef.current?.click(),
                    className: "inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer",
                    children: [
                        _jsx(Upload, { className: "w-3.5 h-3.5" }),
                        _jsx("span", { children: personal.photo ? "Change Photo" : "Upload Photo" })
                    ]
                }),
                personal.photo && (
                    _jsx("button", {
                        type: "button",
                        onClick: handleRemovePhoto,
                        className: "p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer",
                        title: "Remove Photo",
                        children: _jsx(X, { className: "w-4 h-4" })
                    })
                )
            ] })
        ] }),

        _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            _jsxs("div", { className: "sm:col-span-2", children: [
                _jsxs("label", { htmlFor: "personal-fullName", className: "block text-xs font-semibold text-slate-700 mb-1", children: ["Full Name ", _jsx("span", { className: "text-rose-500", children: "*" })] }),
                _jsxs("div", { className: "relative", children: [
                    _jsx(User, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }),
                    _jsx("input", { id: "personal-fullName", type: "text", name: "fullName", value: personal.fullName || '', onChange: handleChange, placeholder: "Your full name", className: "w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })
                ] })
            ] }),
            _jsxs("div", { className: "sm:col-span-2", children: [
                _jsx("label", { htmlFor: "personal-title", className: "block text-xs font-semibold text-slate-700 mb-1", children: "Professional Title / Role" }),
                _jsx("input", { id: "personal-title", type: "text", name: "title", value: personal.title || '', onChange: handleChange, placeholder: "Your current or target job title", className: "w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })
            ] }),
            _jsxs("div", { children: [
                _jsxs("label", { htmlFor: "personal-email", className: "block text-xs font-semibold text-slate-700 mb-1", children: ["Email Address ", _jsx("span", { className: "text-rose-500", children: "*" })] }),
                _jsxs("div", { className: "relative", children: [
                    _jsx(Mail, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }),
                    _jsx("input", { id: "personal-email", type: "email", name: "email", value: personal.email || '', onChange: handleChange, placeholder: "your.email@example.com", className: "w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })
                ] })
            ] }),
            _jsxs("div", { children: [
                _jsxs("label", { htmlFor: "personal-phone", className: "block text-xs font-semibold text-slate-700 mb-1", children: ["Phone Number ", _jsx("span", { className: "text-rose-500", children: "*" })] }),
                _jsxs("div", { className: "relative", children: [
                    _jsx(Phone, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }),
                    _jsx("input", { id: "personal-phone", type: "tel", name: "phone", value: personal.phone || '', onChange: handleChange, placeholder: "Your phone number", className: "w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })
                ] })
            ] }),
            _jsxs("div", { className: "sm:col-span-2", children: [
                _jsx("label", { htmlFor: "personal-location", className: "block text-xs font-semibold text-slate-700 mb-1", children: "Location (City, State / Country)" }),
                _jsxs("div", { className: "relative", children: [
                    _jsx(MapPin, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }),
                    _jsx("input", { id: "personal-location", type: "text", name: "location", value: personal.location || '', onChange: handleChange, placeholder: "City, State, Country", className: "w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })
                ] })
            ] }),
            _jsxs("div", { children: [
                _jsx("label", { htmlFor: "personal-linkedin", className: "block text-xs font-semibold text-slate-700 mb-1", children: "LinkedIn Profile" }),
                _jsxs("div", { className: "relative", children: [
                    _jsx(Linkedin, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }),
                    _jsx("input", { id: "personal-linkedin", type: "text", name: "linkedin", value: personal.linkedin || '', onChange: handleChange, placeholder: "linkedin.com/in/username", className: "w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })
                ] })
            ] }),
            _jsxs("div", { children: [
                _jsx("label", { htmlFor: "personal-github", className: "block text-xs font-semibold text-slate-700 mb-1", children: "GitHub Profile" }),
                _jsxs("div", { className: "relative", children: [
                    _jsx(Github, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }),
                    _jsx("input", { id: "personal-github", type: "text", name: "github", value: personal.github || '', onChange: handleChange, placeholder: "github.com/username", className: "w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })
                ] })
            ] }),
            _jsxs("div", { className: "sm:col-span-2", children: [
                _jsx("label", { htmlFor: "personal-portfolio", className: "block text-xs font-semibold text-slate-700 mb-1", children: "Portfolio / Website" }),
                _jsxs("div", { className: "relative", children: [
                    _jsx(Globe, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }),
                    _jsx("input", { id: "personal-portfolio", type: "text", name: "portfolio", value: personal.portfolio || '', onChange: handleChange, placeholder: "yourportfolio.dev", className: "w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })
                ] })
            ] })
        ] })
    ] }));
};
