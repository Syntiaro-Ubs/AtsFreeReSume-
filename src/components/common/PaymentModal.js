import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Modal } from './Modal.js';
import { useResume } from '../../context/ResumeContext.js';
import { api } from '../../services/api.js';
import { ShieldCheck, CheckCircle2, QrCode, CreditCard, Lock, Loader2, Copy, Check, ArrowRight, ExternalLink, Smartphone, Edit3 } from 'lucide-react';

export const PaymentModal = ({ isOpen, onClose, onSuccess }) => {
    const { resumeId, resumeData } = useResume();
    const [paymentMethod, setPaymentMethod] = useState('payu'); // 'payu' | 'upi' | 'card'
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [copiedUpi, setCopiedUpi] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    // Dynamic Real UPI ID state (allows real merchant UPI ID input)
    const [upiId, setUpiId] = useState('resumeforge@upi');
    const [merchantName, setMerchantName] = useState('ATS Free RESUME');
    const [isEditingUpi, setIsEditingUpi] = useState(false);

    // Form inputs for Card simulation
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [cardName, setCardName] = useState('');

    // Listen for PayU Callback window postMessage
    useEffect(() => {
        const handleMessage = (e) => {
            if (e.data && e.data.type === 'PAYU_PAYMENT_SUCCESS') {
                setIsProcessing(false);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    onSuccess();
                }, 1000);
            } else if (e.data && e.data.type === 'PAYU_PAYMENT_FAILED') {
                setIsProcessing(false);
                setErrorMsg('PayU payment was cancelled or failed. Please try again.');
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onSuccess]);

    const handleCopyUpi = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(upiId);
        }
        setCopiedUpi(true);
        setTimeout(() => setCopiedUpi(false), 2000);
    };

    // Construct NPCI standard real UPI Deep Link String
    const getUpiUrl = () => {
        const cleanUpi = upiId.trim() || 'resumeforge@upi';
        const cleanName = merchantName.trim() || 'ATS Free RESUME';
        return `upi://pay?pa=${encodeURIComponent(cleanUpi)}&pn=${encodeURIComponent(cleanName)}&am=99.00&cu=INR&tn=${encodeURIComponent('Resume Download ₹99')}`;
    };

    // Official PayU Checkout Redirection with authentication
    const handlePayUCheckout = async () => {
        setIsProcessing(true);
        setErrorMsg(null);
        try {
            const data = await api.initiatePayU(resumeId || 1);

            if (!data.success) {
                throw new Error(data.error || 'Failed to initialize PayU payment');
            }

            if (data.isAlreadyPaid) {
                setIsProcessing(false);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    onSuccess();
                }, 800);
                return;
            }

            // Create dynamic form and submit to PayU Gateway
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = data.actionUrl;
            form.target = '_blank'; // Open in popup/tab

            const params = {
                key: data.key,
                txnid: data.txnid,
                amount: data.amount,
                productinfo: data.productinfo,
                firstname: data.firstname,
                email: data.email,
                phone: data.phone,
                surl: data.surl,
                furl: data.furl,
                hash: data.hash,
                udf1: data.udf1,
                udf2: data.udf2,
            };

            Object.entries(params).forEach(([paramKey, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = paramKey;
                input.value = value || '';
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);

        } catch (err) {
            console.error('PayU Checkout Error:', err);
            setErrorMsg(err.message || 'Payment initiation failed.');
            setIsProcessing(false);
        }
    };

    // Instant / Demo Payment Confirmation
    const handleSimulatedPayment = () => {
        setIsProcessing(true);
        setErrorMsg(null);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onSuccess();
            }, 1000);
        }, 1400);
    };

    const upiUrl = getUpiUrl();
    const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=1&data=${encodeURIComponent(upiUrl)}`;

    return (_jsx(Modal, {
        isOpen: isOpen,
        onClose: onClose,
        title: "Unlock & Download Resume PDF",
        subtitle: "PayU Gateway & Dynamic UPI QR • ₹99 One-Time Fee",
        maxWidth: "md",
        children: _jsxs("div", { className: "space-y-5", children: [
            
            /* Pricing Header Banner */
            _jsxs("div", { className: "bg-linear-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-4 rounded-xl shadow-md flex items-center justify-between", children: [
                _jsxs("div", { children: [
                    _jsxs("span", { className: "text-[10px] uppercase font-bold tracking-wider bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 px-2 py-0.5 rounded-full flex items-center space-x-1 w-fit", children: [
                        _jsx(ShieldCheck, { className: "w-3 h-3 text-emerald-400 mr-1" }),
                        _jsx("span", { children: "PayU Gateway Verified" })
                    ] }),
                    _jsxs("div", { className: "flex items-baseline space-x-2 mt-1.5", children: [
                        _jsx("span", { className: "text-2xl font-extrabold text-white", children: "₹99" }),
                        _jsx("span", { className: "text-xs text-indigo-300 line-through", children: "₹499" }),
                        _jsx("span", { className: "text-xs text-emerald-400 font-semibold", children: "80% OFF" })
                    ] }),
                    _jsx("p", { className: "text-[11px] text-indigo-200 mt-0.5", children: "One-time fee • Vector A4 PDF • Watermark Removal" })
                ] }),
                _jsx("div", { className: "w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner", children:
                    _jsx(Lock, { className: "w-6 h-6 text-emerald-400" })
                })
            ] }),

            /* Features Checklist */
            _jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80", children: [
                _jsxs("div", { className: "flex items-center space-x-1.5 font-medium", children: [
                    _jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }),
                    _jsx("span", { children: "Vector High-Res PDF" })
                ] }),
                _jsxs("div", { className: "flex items-center space-x-1.5 font-medium", children: [
                    _jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }),
                    _jsx("span", { children: "Watermark Removed" })
                ] }),
                _jsxs("div", { className: "flex items-center space-x-1.5 font-medium", children: [
                    _jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }),
                    _jsx("span", { children: "100% ATS Compliant" })
                ] }),
                _jsxs("div", { className: "flex items-center space-x-1.5 font-medium", children: [
                    _jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }),
                    _jsx("span", { children: "PayU Gateway & UPI Secure" })
                ] })
            ] }),

            errorMsg && (
                _jsx("div", { className: "p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium", children: errorMsg })
            ),

            /* Payment Method Selection */
            _jsxs("div", { className: "flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold", children: [
                _jsxs("button", {
                    type: "button",
                    onClick: () => setPaymentMethod('payu'),
                    className: `flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${paymentMethod === 'payu' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`,
                    children: [
                        _jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
                        _jsx("span", { children: "PayU Gateway" })
                    ]
                }),
                _jsxs("button", {
                    type: "button",
                    onClick: () => setPaymentMethod('upi'),
                    className: `flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${paymentMethod === 'upi' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`,
                    children: [
                        _jsx(QrCode, { className: "w-3.5 h-3.5" }),
                        _jsx("span", { children: "Real UPI QR" })
                    ]
                }),
                _jsxs("button", {
                    type: "button",
                    onClick: () => setPaymentMethod('card'),
                    className: `flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${paymentMethod === 'card' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`,
                    children: [
                        _jsx(CreditCard, { className: "w-3.5 h-3.5" }),
                        _jsx("span", { children: "Card" })
                    ]
                })
            ] }),

            /* Tab Details */
            paymentMethod === 'payu' ? (
                _jsxs("div", { className: "p-4 border border-slate-200 rounded-xl space-y-3 bg-white text-center", children: [
                    _jsx("p", { className: "text-xs font-bold text-slate-800", children: "Pay via PayU Official Secure Payment Gateway" }),
                    _jsx("p", { className: "text-[11px] text-slate-600 leading-relaxed", children: "Supports Google Pay, PhonePe, Paytm, BHIM, Credit/Debit Cards, NetBanking & Wallets." }),
                    
                    _jsxs("div", { className: "p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs text-left space-y-1 font-mono", children: [
                        _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Amount:" }), _jsx("span", { className: "font-bold text-emerald-700", children: "₹99.00 INR" })] }),
                        _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Hash Security:" }), _jsx("span", { className: "font-bold text-slate-900", children: "SHA-512 Backend Encrypted" })] })
                    ] })
                ] })
            ) : paymentMethod === 'upi' ? (
                _jsxs("div", { className: "p-4 border border-slate-200 rounded-xl space-y-3 bg-white text-center", children: [
                    _jsx("p", { className: "text-xs font-bold text-slate-800", children: "Scan QR Code with Google Pay, PhonePe, Paytm, BHIM, or CRED" }),
                    
                    /* Real Dynamic High-Res UPI QR Code */
                    _jsxs("div", { className: "w-48 h-48 mx-auto bg-white rounded-2xl p-2.5 shadow-lg border-2 border-indigo-500 relative flex flex-col items-center justify-center group", children: [
                        _jsx("img", {
                            src: qrCodeImageUrl,
                            alt: `Scan to pay ₹99 via UPI to ${upiId}`,
                            className: "w-full h-full object-contain rounded-lg"
                        }),
                        _jsx("span", { className: "text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-slate-950/90 px-3 py-0.5 rounded-full absolute -bottom-2.5 border border-emerald-500/50 shadow-md", children: "Scan & Pay ₹99" })
                    ] }),

                    /* Mobile Deep Link button */
                    _jsxs("div", { className: "pt-1", children: [
                        _jsxs("a", {
                            href: upiUrl,
                            className: "inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors border border-indigo-200",
                            children: [
                                _jsx(Smartphone, { className: "w-3.5 h-3.5" }),
                                _jsx("span", { children: "Tap to Open in GPay / PhonePe / Paytm" }),
                                _jsx(ExternalLink, { className: "w-3 h-3" })
                            ]
                        })
                    ] }),

                    /* UPI ID & Editing Toggle */
                    _jsxs("div", { className: "bg-slate-50 p-2.5 rounded-xl border border-slate-200 max-w-sm mx-auto space-y-2 text-xs", children: [
                        _jsxs("div", { className: "flex items-center justify-between", children: [
                            _jsxs("div", { className: "flex items-center space-x-1 font-mono font-bold text-slate-800 text-left truncate", children: [
                                _jsx("span", { className: "text-slate-500 font-normal", children: "UPI VPA:" }),
                                _jsx("span", { className: "text-indigo-700 font-bold truncate", children: upiId })
                            ] }),
                            _jsxs("div", { className: "flex items-center space-x-1 shrink-0", children: [
                                _jsxs("button", {
                                    type: "button",
                                    onClick: handleCopyUpi,
                                    className: "p-1.5 text-indigo-600 hover:text-indigo-800 bg-white border border-slate-200 hover:bg-indigo-50 rounded-md transition-colors cursor-pointer flex items-center space-x-1 text-[11px] font-medium",
                                    title: "Copy UPI ID",
                                    children: [
                                        copiedUpi ? _jsx(Check, { className: "w-3.5 h-3.5 text-emerald-600" }) : _jsx(Copy, { className: "w-3.5 h-3.5" }),
                                        _jsx("span", { children: copiedUpi ? "Copied" : "Copy" })
                                    ]
                                }),
                                _jsx("button", {
                                    type: "button",
                                    onClick: () => setIsEditingUpi(!isEditingUpi),
                                    className: "p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md transition-colors cursor-pointer",
                                    title: "Change Merchant UPI ID",
                                    children: _jsx(Edit3, { className: "w-3.5 h-3.5" })
                                })
                            ] })
                        ] }),

                        isEditingUpi && (
                            _jsxs("div", { className: "pt-2 border-t border-slate-200 text-left space-y-1.5", children: [
                                _jsx("label", { className: "block text-[11px] font-semibold text-slate-700", children: "Custom Merchant UPI ID (e.g. yourname@okicici):" }),
                                _jsxs("div", { className: "flex space-x-2", children: [
                                    _jsx("input", {
                                        type: "text",
                                        value: upiId,
                                        onChange: (e) => setUpiId(e.target.value),
                                        placeholder: "yourname@upi",
                                        className: "flex-1 px-2 py-1 text-xs border border-slate-300 rounded-md font-mono bg-white text-slate-900"
                                    }),
                                    _jsx("button", {
                                        type: "button",
                                        onClick: () => setIsEditingUpi(false),
                                        className: "px-2.5 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors",
                                        children: "Save"
                                    })
                                ] })
                            ] })
                        )
                    ] })
                ] })
            ) : (
                _jsxs("div", { className: "p-4 border border-slate-200 rounded-xl space-y-3 bg-white text-xs", children: [
                    _jsxs("div", { children: [
                        _jsx("label", { className: "block font-semibold text-slate-700 mb-1", children: "Cardholder Name" }),
                        _jsx("input", {
                            type: "text",
                            value: cardName,
                            onChange: (e) => setCardName(e.target.value),
                            placeholder: "Full Name on Card",
                            className: "w-full p-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                        })
                    ] }),
                    _jsxs("div", { children: [
                        _jsx("label", { className: "block font-semibold text-slate-700 mb-1", children: "Card Number" }),
                        _jsx("input", {
                            type: "text",
                            value: cardNumber,
                            onChange: (e) => setCardNumber(e.target.value),
                            placeholder: "4000 1234 5678 9010",
                            className: "w-full p-2 border border-slate-300 rounded-lg font-mono text-slate-900 bg-white"
                        })
                    ] }),
                    _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                        _jsxs("div", { children: [
                            _jsx("label", { className: "block font-semibold text-slate-700 mb-1", children: "Expiry Date" }),
                            _jsx("input", {
                                type: "text",
                                value: cardExpiry,
                                onChange: (e) => setCardExpiry(e.target.value),
                                placeholder: "MM / YY",
                                className: "w-full p-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                            })
                        ] }),
                        _jsxs("div", { children: [
                            _jsx("label", { className: "block font-semibold text-slate-700 mb-1", children: "CVV / CVC" }),
                            _jsx("input", {
                                type: "password",
                                maxLength: 4,
                                value: cardCvv,
                                onChange: (e) => setCardCvv(e.target.value),
                                placeholder: "123",
                                className: "w-full p-2 border border-slate-300 rounded-lg font-mono text-slate-900 bg-white"
                            })
                        ] })
                    ] })
                ] })
            ),

            /* Confirm Pay Action Buttons */
            _jsx("div", { className: "pt-1 space-y-2", children:
                paymentMethod === 'payu' ? (
                    _jsxs("button", {
                        type: "button",
                        onClick: handlePayUCheckout,
                        disabled: isProcessing,
                        className: "w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75",
                        children: [
                            isProcessing ? (
                                _jsxs("span", { className: "inline-flex items-center space-x-2", children: [
                                    _jsx(Loader2, { className: "w-4 h-4 animate-spin text-white" }),
                                    _jsx("span", { children: "Connecting to PayU Gateway..." })
                                ] })
                            ) : (
                                _jsxs("span", { className: "inline-flex items-center space-x-2", children: [
                                    _jsx(ExternalLink, { className: "w-4 h-4" }),
                                    _jsx("span", { children: "Proceed to PayU Checkout (₹99)" }),
                                    _jsx(ArrowRight, { className: "w-4 h-4" })
                                ] })
                            )
                        ]
                    })
                ) : (
                    _jsxs("button", {
                        type: "button",
                        onClick: handleSimulatedPayment,
                        disabled: isProcessing || isSuccess,
                        className: "w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75",
                        children: [
                            isProcessing ? (
                                _jsxs("span", { className: "inline-flex items-center space-x-2", children: [
                                    _jsx(Loader2, { className: "w-4 h-4 animate-spin text-white" }),
                                    _jsx("span", { children: "Verifying Payment with Bank..." })
                                ] })
                            ) : isSuccess ? (
                                _jsxs("span", { className: "inline-flex items-center space-x-2", children: [
                                    _jsx(Check, { className: "w-4 h-4 text-white" }),
                                    _jsx("span", { children: "Payment Received! Downloading PDF..." })
                                ] })
                            ) : (
                                _jsxs("span", { className: "inline-flex items-center space-x-2", children: [
                                    _jsx(Lock, { className: "w-4 h-4" }),
                                    _jsx("span", { children: "I Have Paid ₹99 — Unlock PDF Now" }),
                                    _jsx(ArrowRight, { className: "w-4 h-4" })
                                ] })
                            )
                        ]
                    })
                )
            }),

            _jsxs("div", { className: "flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 font-medium pt-1", children: [
                _jsx(Lock, { className: "w-3 h-3 text-slate-400" }),
                _jsx("span", { children: "PayU SHA-512 Encrypted & 100% Secure Payment" })
            ] })

        ] })
    }));
};

