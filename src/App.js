import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import { ResumeProvider } from './context/ResumeContext.js';
import { Navbar } from './components/common/Navbar.js';
import { Footer } from './components/common/Footer.js';
import { LandingPage } from './pages/LandingPage.js';
import { BuilderPage } from './pages/BuilderPage.js';
import { TemplatesPage } from './pages/TemplatesPage.js';
import { ATSCheckerPage } from './pages/ATSCheckerPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { ProfilePage } from './pages/ProfilePage.js';
import { LoginPage } from './pages/LoginPage.js';
import { RegisterPage } from './pages/RegisterPage.js';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage.js';
import { useAuth } from './context/AuthContext.js';

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    if (isLoading) return _jsx('div', { className: 'flex min-h-[50vh] items-center justify-center text-sm text-slate-500', children: 'Checking your session...' });
    return isAuthenticated ? children : _jsx(Navigate, { to: '/login', replace: true, state: { from: location } });
}
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsx(AuthProvider, { children: _jsx(ResumeProvider, { children: _jsxs("div", { className: "min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1 flex flex-col", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/builder", element: _jsx(ProtectedRoute, { children: _jsx(BuilderPage, {}) }) }), _jsx(Route, { path: "/templates", element: _jsx(TemplatesPage, {}) }), _jsx(Route, { path: "/ats-checker", element: _jsx(ProtectedRoute, { children: _jsx(ATSCheckerPage, {}) }) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "/profile", element: _jsx(ProtectedRoute, { children: _jsx(ProfilePage, {}) }) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "/forgot-password", element: _jsx(ForgotPasswordPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }), _jsx(Footer, {})] }) }) }) }));
}
