import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { FileText, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchParams = new URLSearchParams(location.search);
    const redirect = location.state?.from?.pathname || searchParams.get('redirect') || '/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(email, password);
            navigate(redirect);
        }
        catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        }
        finally {
            setLoading(false);
        }
    };

    return (_jsx("div", { className: "min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50", children: _jsxs("div", { className: "max-w-sm w-full space-y-5", children: [
        _jsxs("div", { className: "text-center space-y-2", children: [
            _jsxs(Link, { to: "/", className: "inline-flex items-center space-x-2", children: [
                _jsx("div", { className: "w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs", children: _jsx(FileText, { className: "w-5 h-5" }) }),
                _jsxs("span", { className: "text-2xl font-bold tracking-tight text-slate-900", children: ["ATS Free ", _jsx("span", { className: "text-indigo-600", children: "RESUME" })] })
            ] }),
            _jsx("h2", { className: "text-xl font-bold text-slate-900 tracking-tight", children: "Sign in to your account" }),
            _jsx("p", { className: "text-xs text-slate-500", children: "Access your saved resumes and ATS optimization tools" })
        ] }),

        _jsxs("div", { className: "bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4", children: [
            error && (_jsxs("div", { className: "p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2", children: [
                _jsx(AlertCircle, { className: "w-4 h-4 shrink-0" }),
                _jsx("span", { children: error })
            ] })),

            _jsxs("form", { onSubmit: handleSubmit, className: "space-y-3.5", children: [
                _jsxs("div", { children: [
                    _jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "Email Address" }),
                    _jsxs("div", { className: "relative", children: [
                        _jsx(Mail, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2" }),
                        _jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email Address", className: "w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })
                    ] })
                ] }),

                _jsxs("div", { children: [
                    _jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                        _jsx("label", { className: "block text-xs font-semibold text-slate-700", children: "Password" }),
                        _jsx(Link, { to: "/forgot-password", className: "text-[11px] text-indigo-600 hover:text-indigo-800 font-medium", children: "Forgot password?" })
                    ] }),
                    _jsxs("div", { className: "relative", children: [
                        _jsx(Lock, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2" }),
                        _jsx("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password", className: "w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white" })
                    ] })
                ] }),

                _jsxs("button", { type: "submit", disabled: loading, className: "w-full inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs py-2 px-4 rounded-lg shadow-xs transition-colors mt-1", children: [
                    _jsx("span", { children: loading ? 'Signing in...' : 'Sign In' }),
                    _jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ] })
            ] }),

            _jsxs("div", { className: "pt-3 border-t border-slate-100 text-center text-xs text-slate-500", children: [
                "Don't have an account yet?", ' ',
                _jsx(Link, { to: "/register", className: "font-semibold text-indigo-600 hover:text-indigo-800", children: "Create an account" })
            ] })
        ] })
    ] }) }));
};

