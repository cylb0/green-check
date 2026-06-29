import { getCsrfToken } from "./auth"
import { API_LOGIN, API_ME, API_REFRESH } from "../constants/api"

type FetchOptions = RequestInit & {
    params?: Record<string, string>
    language?: string
    skipRefresh?: boolean
}

let refreshPromise: Promise<boolean> | null = null
let isSessionActive = false

async function refreshAccessToken(): Promise<boolean> {
    try {
        const url = buildUrl(API_REFRESH)
        const headers = buildHeaders({
            headers: { "X-CSRFToken": getCsrfToken() }
        })
        const res = await rawFetch(url, {
            method: "POST",
            headers
        })
        return res.ok
    } catch {
        return false
    }
}

function throwUnauthorized() {
    throw { status: 401, message: "Unauthorized" }
}

/**
 * Builds a fully qualified URL from a relative endpoint and optional query params
 * 
 * @param endpoint - API endpoint relative to `window.location.origin`
 * @param params - Optional key/value query parameters appended to the URL
 * @returns a URL instance usable in a fetch request
 */
function buildUrl(endpoint: string, params?: Record<string, string>): URL {
    const url = new URL(endpoint, window.location.origin)
    if (params) {
        Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
    }
    return url  
}

/**
 * Builds the HTTP headers for API requests
 * 
 * Automatically includes:
 * - CSRF token (`X-CSRFToken`)
 * - JSON Content-Type when body is present and not formData
 * - Optional language header (`Accept-Language`)
 * - Custom headers override
 * 
 * @param options - Fetch options used to derive headers
 * @returns A plain headers object compatible with `fetch`
 */
function buildHeaders(options: FetchOptions): Record<string, string> {
    const headers: Record<string, string> = {
        "X-CSRFToken": getCsrfToken()
    }

    if (options.body && !(options.body instanceof FormData)) {
        headers["Content-type"] = "application/json"
    }

    if (options.language) {
        headers["Accept-Language"] = options.language
    }

    return {
        ...headers,
        ...(options.headers as Record<string, string>)
    }
}

/**
 * Low-level HTTP fetch wrapper
 * 
 * Thin abstraction over the native `fetch` API that:
 * - Forces `credentials: "include"` for cookie-based auth
 * - Delegates all request configuration to `options`
 * 
 * This fuction does NOT:
 * - Handle errors
 * - Parse JSON
 * - Handle authentication or refresh logic
 * 
 * @param url - Fully resolved URL object
 * @param options - Standard Fetch API options
 * 
 * @returns Raw `Response` object from the Fetch API
 */
async function rawFetch(url: URL, options: RequestInit): Promise<Response> {
    return fetch(url.toString(), {
        credentials: "include",
        ...options
    })
}

/**
 * Parses and validates an HTTP response
 * 
 * Behavior:
 * - Throws a structured error if response is not OK (non-2xx)
 * - Attempts to parse JSON error body when available
 * - Returns `null` for 204 No Content responses
 * - Returns parsed JSON for successfull responses
 * 
 * @template T - Expected response body type
 * 
 * @param response - Fetch API response object
 * 
 * @returns Parsed JSON response or `null` (204)
 * 
 * @throws structured error object when response is not OK
 */
async function parseResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response
            .json()
            .catch(() => ({ message: "Unknown error" }))

            throw {
                status: response.status,
                ...error,
            }
    }

    return response.status == 204
        ? null as T
        : await response.json()
}

/**
 * Ensures the user session is still valid by attempting a token refresh
 * 
 * This function:
 * - Prevents concurrent refresh resquests using a shared promise
 * - Calls the refresh endpoint if needed
 * - Updates global session state on failure
 * - Emits an `auth:expired` event if the session cannot be restored
 * 
 * @throws {UnauthorizedError}
 * Throws when refresh token is invalid or expired and the session cannot be restored
 * 
 * @returns Resolves when authentication is succesfully restored
 */
async function ensureAuthenticated() {
    if (!refreshPromise) {
        refreshPromise = refreshAccessToken()
            .finally(() => {
                refreshPromise = null
            })
    }

    const refreshed = await refreshPromise
    
    if (!refreshed) {
        if (isSessionActive) {
            isSessionActive = false
            window.dispatchEvent(
                new CustomEvent("auth:expired")
            )
        }

        throwUnauthorized()
    }
}

/**
 * Generic API fetch orchestrator
 * 
 * Responsabilities: 
 * - Builds request URL and query parameters
 * - Builds standard headers (CSRF, JSON, language, custom headers)
 * - Executes HTTP request
 * - Handles authentication refresh on 401 responses
 * - Parses and validates API responses
 * - Updates session state for authentication-related endpoints
 * 
 * Authentication flow:
 * - On 401 responses, attempts to refresh the access_token once
 * (unless `skipRefresh` is true)
 * - Retries the original request after successful refresh
 * - Throws if authentication cannot be restored.
 * 
 * @template T - Expected response type
 * 
 * @param endpoint - API endpdoint (relative to window.location.origin)
 * @param options - Extended fetch options
 * @param options.params - Query parameters appended to the URL
 * @param options.language - Sets the `Accept-Language` header
 * @param options.skipRefresh - Disables automatic token refresh (used for auth endpoints like refresh/login)
 * @param options.headers - Custom request headers
 * @param options.body - Request body
 * @param options.method - HTTP method
 * 
 * @returns Parsed response body of `null` for 204 responses
 * 
 * @throws
 * Throws an object `{ status: number, message?: string }` when request fails
 * or authentication cannot be restored after refresh.
 * 
 * @example
 * const me = await apiFetch<User>("/api/me")
 * 
 * @example
 * const data = await apiFetch<Data>("/api/items", {
 *  params: { page: "1" },
 *  language: "fr"
 * })
 */
async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, skipRefresh = false, ...fetchOptions } = options

    const url = buildUrl(endpoint, params)
    const headers = buildHeaders(fetchOptions)

    const doRequest = () =>
        rawFetch(url, {
            ...fetchOptions,
            headers
        })

    let response = await doRequest()

    if (response.status === 401 && !skipRefresh) {
        await ensureAuthenticated()
        response = await doRequest()
    }

    const data = await parseResponse<T>(response)

    if (endpoint === API_ME || endpoint === API_LOGIN) {
        isSessionActive = true
    }

    return data
}

export default apiFetch
