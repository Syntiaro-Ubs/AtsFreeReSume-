import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { User, Mail, Lock, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';
export const ProfilePage = () => {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState(user?.name || '');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const handleSave = async (e) => {
        e.preventDefault();
        setSuccessMsg(null);
        setErrorMsg(null);
        if (newPassword && newPassword !== confirmPassword) {
            setErrorMsg('New passwords do not match.');
            return;
        }
        setIsSaving(true);
        try {
            await updateUser(name, newPassword || undefined);
            setSuccessMsg('Profile updated successfully!');
            setNewPassword('');
            setConfirmPassword('');
        }
        catch (err) {
            setErrorMsg(err.message || 'Failed to update profile.');
        }
        finally {
            setIsSaving(false);
        }
    };
    const handleLogout = async () => {
        await logout();
        navigate('/');
    };
    return (_jsx("div", { className: "min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-xl mx-auto space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-slate-900 tracking-tight", children: "Account & Security" }), _jsx("p", { className: "text-xs text-slate-500", children: "Manage your profile details and authentication credentials." })] }), _jsxs("div", { className: "bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6", children: [successMsg && (_jsxs("div", { className: "p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200 flex items-center space-x-2", children: [_jsx(CheckCircle2, { className: "w-4 h-4 shrink-0" }), _jsx("span", { children: successMsg })] })), errorMsg && (_jsxs("div", { className: "p-3 bg-rose-50 text-rose-800 text-xs rounded-lg border border-rose-200 flex items-center space-x-2", children: [_jsx(AlertCircle, { className: "w-4 h-4 shrink-0" }), _jsx("span", { children: errorMsg })] })), _jsxs("form", { onSubmit: handleSave, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), className: "w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }), _jsx("input", { type: "email", disabled: true, value: user?.email || '', className: "w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-500 bg-slate-100 cursor-not-allowed" })] }), _jsx("span", { className: "text-[10px] text-slate-400 mt-1 block", children: "Email address is linked to your saved resumes and cannot be changed directly." })] }), _jsxs("div", { className: "pt-2 border-t border-slate-100", children: [_jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-slate-700 mb-3", children: "Change Password" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "New Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }), _jsx("input", { type: "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), placeholder: "Leave blank to keep current password", className: "w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })] })] }), newPassword && (_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "Confirm New Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }), _jsx("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), placeholder: "Repeat new password", className: "w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white" })] })] }))] })] }), _jsxs("div", { className: "pt-3 flex items-center justify-between", children: [_jsx("button", { type: "submit", disabled: isSaving, className: "bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-xs transition-colors", children: isSaving ? 'Saving Changes...' : 'Save Changes' }), _jsxs("button", { type: "button", onClick: handleLogout, className: "text-xs font-semibold text-red-600 hover:text-red-800 flex items-center space-x-1", children: [_jsx(LogOut, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Log Out" })] })] })] })] })] }) }));
};
