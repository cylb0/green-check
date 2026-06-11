type FetchOptions = RequestInit & {
    params?: Record<string, string>
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options

    const url = new URL(endpoint, window.location.origin)

    if (params) {
        Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
    }

    const response = await fetch(url.toString(), {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
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
