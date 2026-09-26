import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { FileText, Lock, Mail, User, AlertCircle, ArrowRight } from 'lucide-react';
export const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/login?registered=1');
        }
        catch (err) {
            setError(err.message || 'Registration failed.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50", children: _jsxs("div", { className: "max-w-sm w-full space-y-5", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsxs(Link, { to: "/", className: "inline-flex items-center space-x-2", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs", children: _jsx(FileText, { className: "w-5 h-5" }) }), _jsxs("span", { className: "text-2xl font-bold tracking-tight text-slate-900", children: ["ATS Free ", _jsx("span", { className: "text-indigo-600", children: "RESUME" })] })] }), _jsx("h2", { className: "text-xl font-bold text-slate-900 tracking-tight", children: "Create your free account" }), _jsx("p", { className: "text-xs text-slate-500", children: "Free forever. Unlimited resumes, ATS checks & PDF exports." })] }), _jsxs("div", { className: "bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4", children: [error && (_jsxs("div", { className: "p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2", children: [_jsx(AlertCircle, { className: "w-4 h-4 shrink-0" }), _jsx("span", { children: error })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2" }), _jsx("input", { type: "text", required: true, value: name, onChange: (e) => setName(e.target.value), placeholder: "Full Name", className: "w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2" }), _jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email Address", className: "w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2" }), _jsx("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password", className: "w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2" }), _jsx("input", { type: "password", required: true, value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), placeholder: "Confirm Password", className: "w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })] })] }), _jsxs("button", { type: "submit", disabled: loading, className: "w-full inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs py-2 px-4 rounded-lg shadow-xs transition-colors mt-1", children: [_jsx("span", { children: loading ? 'Creating Account...' : 'Get Started Free' }), _jsx(ArrowRight, { className: "w-3.5 h-3.5" })] })] }), _jsxs("div", { className: "pt-3 border-t border-slate-100 text-center text-xs text-slate-500", children: ["Already have an account?", ' ', _jsx(Link, { to: "/login", className: "font-semibold text-indigo-600 hover:text-indigo-800", children: "Sign In" })] })] })] }) }));
};
