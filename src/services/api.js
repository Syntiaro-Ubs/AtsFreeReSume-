const TOKEN_KEY = 'rf_token';
const USER_KEY = 'rf_user';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
export function getStoredToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function setStoredToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}
export function removeStoredToken() {
    localStorage.removeItem(TOKEN_KEY);
}
export function getStoredUser() {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw)
        return null;
    try {
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
export function setStoredUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}
export function removeStoredUser() {
    localStorage.removeItem(USER_KEY);
}
async function request(endpoint, options = {}) {
    const token = getStoredToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const cleanBase = API_BASE_URL ? API_BASE_URL.replace(/\/$/, '') : '';
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    let url = formattedEndpoint;
    if (cleanBase) {
        if (cleanBase.endsWith('/api') && formattedEndpoint.startsWith('/api')) {
            url = `${cleanBase}${formattedEndpoint.substring(4)}`;
        } else {
            url = `${cleanBase}${formattedEndpoint}`;
        }
    }
    const response = await fetch(url, {
        ...options,
        headers,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const errorMsg = data.error || data.message || `Request failed with status ${response.status}`;
        throw new Error(errorMsg);
    }
    return data;
}
export const api = {
    // Auth
    async register(name, email, password) {
        return request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
    },
    async login(email, password) {
        return request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },
    async logout() {
        return request('/api/auth/logout', { method: 'POST' });
    },
    async forgotPassword(email) {
        return request('/api/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    },
    async getProfile() {
        return request('/api/auth/me');
    },
    async updateProfile(name, newPassword) {
        return request('/api/auth/me', {
            method: 'PUT',
            body: JSON.stringify({ name, newPassword }),
        });
    },
    // Resumes
    async listResumes() {
        return request('/api/resumes');
    },
    async getResume(id) {
        return request(`/api/resumes/${id}`);
    },
    async createResume(title, templateId, resumeData) {
        return request('/api/resumes', {
            method: 'POST',
            body: JSON.stringify({ title, templateId, resumeData }),
        });
    },
    async updateResume(id, updates) {
        return request(`/api/resumes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    },
    async deleteResume(id) {
        return request(`/api/resumes/${id}`, {
            method: 'DELETE',
        });
    },
    async duplicateResume(id) {
        return request(`/api/resumes/${id}/duplicate`, {
            method: 'POST',
        });
    },
    // ATS
    async analyzeATS(resumeData) {
        return request('/api/ats/analyze', {
            method: 'POST',
            body: JSON.stringify({ resumeData }),
        });
    },
    async matchJobDescription(jobDescription, resumeData) {
        return request('/api/ats/job-description', {
            method: 'POST',
            body: JSON.stringify({ jobDescription, resumeData }),
        });
    },
    // AI Modular Endpoints
    async improveSummary(summary, role, skills) {
        return request('/api/ai/improve-summary', {
            method: 'POST',
            body: JSON.stringify({ summary, role, skills }),
        });
    },
    async improveBullet(bullet, context) {
        return request('/api/ai/improve-bullet', {
            method: 'POST',
            body: JSON.stringify({ bullet, context }),
        });
    },
    async improveProject(description, projectName, techStack) {
        return request('/api/ai/improve-project', {
            method: 'POST',
            body: JSON.stringify({ description, projectName, techStack }),
        });
    },
    async generateTemplateLayout(resumeData, targetRole) {
        return request('/api/ai/generate-template', {
            method: 'POST',
            body: JSON.stringify({ resumeData, targetRole }),
        });
    },
    // PayU Payment & Download Protection
    async initiatePayU(resumeId) {
        return request('/api/payment/payu/initiate', {
            method: 'POST',
            body: JSON.stringify({ resumeId }),
        });
    },
    async getPaymentStatus(resumeId) {
        return request(`/api/payment/status/${resumeId}`);
    },
    async downloadAuthorizedResume(resumeId) {
        return request(`/api/resumes/${resumeId}/download`);
    },
};
