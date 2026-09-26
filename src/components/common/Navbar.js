import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FileText, User, LogOut, LayoutDashboard, Plus, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
export const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const handleCreateResume = () => {
        if (isAuthenticated) {
            navigate('/dashboard?action=create');
        }
        else {
            navigate('/login?redirect=/dashboard');
        }
    };
    const handleLogout = async () => {
        await logout();
        navigate('/');
        setIsUserMenuOpen(false);
    };
    const isBuilder = location.pathname.startsWith('/builder');
    // If in builder mode, builder top bar takes over, keep navbar compact or hidden if preferred
    if (isBuilder)
        return null;
        return (_jsxs("header", { className: `sticky top-0 z-40 w-full transition-all duration-200 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
            : 'bg-white border-b border-slate-100'}`, children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsx("div", { className: "flex items-center space-x-3", children: _jsxs(Link, { to: "/", className: "flex items-center space-x-2.5 group", children: [_jsx("div", { className: "w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors", children: _jsx(FileText, { className: "w-5 h-5" }) }), _jsxs("span", { className: "text-xl font-bold tracking-tight text-slate-900", children: ["ATS Free ", _jsx("span", { className: "text-indigo-600", children: "RESUME" })] })] }) }), _jsxs("div", { className: "hidden md:flex items-center space-x-3.5", children: [isAuthenticated ? (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setIsUserMenuOpen(!isUserMenuOpen), className: "flex items-center space-x-2 p-1.5 pl-3 pr-2 text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-full transition-all", children: [_jsx("span", { className: "max-w-[120px] truncate", children: user?.name || 'Account' }), _jsx("div", { className: "w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold", children: user?.name ? user.name.charAt(0).toUpperCase() : 'U' })] }), isUserMenuOpen && (_jsxs("div", { className: "absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150", children: [_jsxs("div", { className: "px-4 py-2 border-b border-slate-100", children: [_jsx("p", { className: "text-xs text-slate-500 font-medium", children: "Signed in as" }), _jsx("p", { className: "text-xs font-semibold text-slate-900 truncate", children: user?.email })] }), _jsxs(Link, { to: "/dashboard", onClick: () => setIsUserMenuOpen(false), className: "flex items-center space-x-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600", children: [_jsx(LayoutDashboard, { className: "w-4 h-4 text-slate-400" }), _jsx("span", { children: "My Resumes" })] }), _jsxs(Link, { to: "/profile", onClick: () => setIsUserMenuOpen(false), className: "flex items-center space-x-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600", children: [_jsx(User, { className: "w-4 h-4 text-slate-400" }), _jsx("span", { children: "Account Settings" })] }), _jsx("div", { className: "border-t border-slate-100 my-1" }), _jsxs("button", { onClick: handleLogout, className: "w-full flex items-center space-x-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 text-left", children: [_jsx(LogOut, { className: "w-4 h-4" }), _jsx("span", { children: "Log Out" })] })] }))] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", className: "text-sm font-medium text-slate-700 hover:text-indigo-600 px-3 py-2 transition-colors", children: "Log in" }), _jsxs("button", { onClick: handleCreateResume, className: "inline-flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-xs transition-all hover:shadow", children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { children: "Create Resume" })] })] })), isAuthenticated && (_jsxs(Link, { to: "/dashboard?action=create", className: "inline-flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-3.5 py-2 rounded-lg shadow-xs transition-all hover:shadow", children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { children: "New Resume" })] }))] }), _jsx("div", { className: "flex md:hidden items-center space-x-2", children: _jsx("button", { onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), className: "p-2 text-slate-600 hover:text-slate-900 rounded-md focus:outline-hidden", "aria-label": "Toggle navigation menu", children: isMobileMenuOpen ? _jsx(X, { className: "w-6 h-6" }) : _jsx(Menu, { className: "w-6 h-6" }) }) })] }) }), isMobileMenuOpen && (_jsxs("div", { className: "md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3", children: [_jsxs("div", { className: "space-y-1", children: [isAuthenticated ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/dashboard", onClick: () => setIsMobileMenuOpen(false), className: "block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50", children: "My Resumes Dashboard" }), _jsx(Link, { to: "/profile", onClick: () => setIsMobileMenuOpen(false), className: "block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50", children: "Profile & Settings" }), _jsx("button", { onClick: () => {
                                            setIsMobileMenuOpen(false);
                                            handleLogout();
                                        }, className: "w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50", children: "Log Out" })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", onClick: () => setIsMobileMenuOpen(false), className: "block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50", children: "Log in" }), _jsx(Link, { to: "/register", onClick: () => setIsMobileMenuOpen(false), className: "block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50", children: "Create Account" })] }))] }), _jsx("button", { onClick: () => {
                            setIsMobileMenuOpen(false);
                            handleCreateResume();
                        }, className: "w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-xs", children: "Create Resume" })] }))] }));
};
