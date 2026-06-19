import apiFetch from "./client"

export interface User {
    id: string
    email: string
}

export function getCsrfToken(): string {
    const cookie = document.cookie
        .split(';')
        .find(c => c.trim().startsWith('csrftoken='))
    return cookie ? cookie.split('=')[1].trim() : ''
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
        apiFetch<User>('api/me'),

    changePassword: (data: {
        oldPassword: string,
        newPassword: string,
        newPasswordConfirm: string
    }
    ) =>
        apiFetch('/api/change-password', {
            method: 'POST',
            body: JSON.stringify({
                old_password: data.oldPassword,
                new_password: data.newPassword,
                new_password_confirm: data.newPasswordConfirm
            })
        })
}
