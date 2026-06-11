import apiFetch from "./client"

export interface User {
    id: string
    email: string
}

export const authApi = {
    login: (email: string, password: string) =>
        apiFetch<User>('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        }),
    
    register: (email: string, password: string) =>
        apiFetch<User>('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        }),
    
    logout: () =>
        apiFetch<User>('/api/logout', {
            method: 'POST',
        }),

    me: () =>
        apiFetch<User>('api/me')
}
