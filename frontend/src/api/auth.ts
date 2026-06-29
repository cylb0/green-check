import { API_CHANGE_PASSWORD, API_LOGIN, API_LOGOUT, API_ME, API_REGISTER } from "@/constants"
import { apiFetch } from "@/api"

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
        apiFetch<User>(API_LOGIN, {
            skipRefresh: true,
            method: 'POST',
            body: JSON.stringify({ email, password })
        }),
    
    register: (email: string, password: string) =>
        apiFetch<User>(API_REGISTER, {
            skipRefresh: true,
            method: 'POST',
            body: JSON.stringify({ email, password })
        }),
    
    logout: () =>
        apiFetch<User>(API_LOGOUT, {
            method: 'POST',
        }),

    me: () =>
        apiFetch<User>(API_ME),

    changePassword: (data: {
        oldPassword: string,
        newPassword: string,
        newPasswordConfirm: string
    }
    ) =>
        apiFetch(API_CHANGE_PASSWORD, {
            method: 'POST',
            body: JSON.stringify({
                old_password: data.oldPassword,
                new_password: data.newPassword,
                new_password_confirm: data.newPasswordConfirm
            })
        })
}
