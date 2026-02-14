import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const endpoints = {
    generateBrand: (data: { industry: string; keywords: string; tone: string }) => api.post('/generate-brand', data),
    generateContent: (data: { description: string; tone: string; content_type: string }) => api.post('/generate-content', data),
    analyzeSentiment: (data: { text: string }) => api.post('/analyze-sentiment', data),
    chat: (data: { message: string }) => api.post('/chat', data),
    generateLogo: (data: { brand_name: string; industry: string; keywords: string }) => api.post('/generate-logo', data),
};
