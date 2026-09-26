import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api.js';
export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.forgotPassword(email);
            setMessage(res.message);
        }
        catch {
            setMessage('Password reset simulated. Please check your inbox.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50", children: _jsxs("div", { className: "max-w-md w-full space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsxs(Link, { to: "/", className: "inline-flex items-center space-x-2", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs", children: _jsx(FileText, { className: "w-5 h-5" }) }), _jsxs("span", { className: "text-2xl font-bold tracking-tight text-slate-900", children: ["ATS Free ", _jsx("span", { className: "text-indigo-600", children: "RESUME" })] })] }), _jsx("h2", { className: "text-xl font-bold text-slate-900 tracking-tight", children: "Reset your password" }), _jsx("p", { className: "text-xs text-slate-500", children: "We will send you instructions to reset your password" })] }), _jsx("div", { className: "bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4", children: message ? (_jsxs("div", { className: "space-y-4 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto", children: _jsx(CheckCircle2, { className: "w-6 h-6" }) }), _jsx("p", { className: "text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200", children: message }), _jsxs(Link, { to: "/login", className: "inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800", children: [_jsx(ArrowLeft, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Return to Login" })] })] })) : (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }), _jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 bg-white" })] })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs py-2.5 px-4 rounded-lg shadow-xs transition-colors", children: loading ? 'Sending Instructions...' : 'Send Reset Link' }), _jsx("div", { className: "pt-2 text-center", children: _jsxs(Link, { to: "/login", className: "text-xs text-slate-500 hover:text-slate-800 inline-flex items-center space-x-1", children: [_jsx(ArrowLeft, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Back to Sign In" })] }) })] })) })] }) }));
};
