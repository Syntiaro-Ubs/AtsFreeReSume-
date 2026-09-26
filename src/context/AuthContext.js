import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getStoredToken, getStoredUser, setStoredToken, setStoredUser, removeStoredToken, removeStoredUser } from '../services/api.js';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getStoredUser());
    const [token, setToken] = useState(getStoredToken());
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function checkAuth() {
            const storedToken = getStoredToken();
            if (!storedToken) {
                setIsLoading(false);
                return;
            }
            try {
                const data = await api.getProfile();
                setUser(data.user);
                setStoredUser(data.user);
            }
            catch (err) {
                console.warn('Session verification failed, resetting credentials');
                removeStoredToken();
                removeStoredUser();
                setUser(null);
                setToken(null);
            }
            finally {
                setIsLoading(false);
            }
        }
        checkAuth();
    }, []);
    const login = async (email, password) => {
        const res = await api.login(email, password);
        setStoredToken(res.token);
        setStoredUser(res.user);
        setToken(res.token);
        setUser(res.user);
    };
    const register = async (name, email, password) => {
        return api.register(name, email, password);
    };
    const logout = async () => {
        try {
            await api.logout();
        }
        catch {
            // ignore
        }
        removeStoredToken();
        removeStoredUser();
        setUser(null);
        setToken(null);
    };
    const updateUser = async (name, password) => {
        const res = await api.updateProfile(name, password);
        setUser(res.user);
        setStoredUser(res.user);
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            token,
            isLoading,
            isAuthenticated: !!user && !!token,
            login,
            register,
            logout,
            updateUser,
        }, children: children }));
};
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
