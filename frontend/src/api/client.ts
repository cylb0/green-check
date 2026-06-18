import { getCsrfToken } from "./auth"

type FetchOptions = RequestInit & {
    params?: Record<string, string>
    language?: string
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, language, ...fetchOptions } = options

    const url = new URL(endpoint, window.location.origin)

    if (params) {
        Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
    }

    const headers: Record<string, string> = {
        'X-CSRFToken': getCsrfToken(),
        ...(!fetchOptions.body || fetchOptions.body instanceof FormData)
            ? {}
            : {'Content-Type': 'application/json'},
    }

    if (language) {
        headers['Accept-Language'] = language
    }

    const response = await fetch(url.toString(), {
        credentials: 'include',
        headers: {
            ...headers,
            ...fetchOptions.headers,
        },
        ...fetchOptions,
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }))
        throw { status: response.status, ...error }
    }

    if (response.status === 204) {
        return null as T
    }

    return response.json()
}

export default apiFetch
