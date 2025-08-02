/**
 * @file        apiPaths.js
 * @description Definitions of backend API endpoint paths used across the frontend.
 */


export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/profile",
    },

    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions",
        GENERATE_EXPLANATION: "/api/ai/generate-explanation",
    },

    SESSION: {
        CREATE: "/api/sessions/create",
        GET_ALL: "/api/sessions/my-sessions",
        GET_ONE: (id) => `/api/sessions/${id}`,
        DELETE: (id) => `/api/sessions/${id}`,
    },

    QUESTION: {
        ADD_TO_SESSION: "/api/questions/add",
        UPDATE_NOTE: (id) => `/api/questions/${id}/note`,
        DELETE: (id) => `/api/questions/${id}`,
    },
};