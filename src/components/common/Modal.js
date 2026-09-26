import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
export const Modal = ({ isOpen, onClose, title, subtitle, children, maxWidth = 'lg', }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '4xl': 'max-w-4xl',
    }[maxWidth];
    return (_jsxs("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: [_jsx("div", { className: "fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity", onClick: onClose }), _jsx("div", { className: "flex min-h-full items-center justify-center p-4 text-center sm:p-0", children: _jsxs("div", { className: `relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full ${maxWidthClasses} border border-slate-200/80`, onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-start justify-between border-b border-slate-100 px-6 py-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-slate-900 tracking-tight", children: title }), subtitle && _jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: subtitle })] }), _jsx("button", { onClick: onClose, className: "rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsx("div", { className: "px-6 py-5 max-h-[80vh] overflow-y-auto", children: children })] }) })] }));
};
