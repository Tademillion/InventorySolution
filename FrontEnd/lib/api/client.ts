// API Client with error handling and retry logic
import { API_CONFIG } from "@/lib/constants"

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: unknown,
  ) {
    super(message)
    this.name = "APIError"
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string>
  retry?: boolean
}

class APIClient {
  private baseURL: string
  private timeout: number

  constructor() {
    this.baseURL = API_CONFIG.baseURL
    this.timeout = API_CONFIG.timeout
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, retry = true, ...fetchOptions } = options

    // Build URL with query params
    let url = `${this.baseURL}${endpoint}`
    if (params) {
      const queryString = new URLSearchParams(params).toString()
      url += `?${queryString}`
    }

    // Add default headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    }

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new APIError(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData,
        )
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        return null as T
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof APIError) {
        throw error
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new APIError("Request timeout")
        }
        throw new APIError(error.message)
      }

      throw new APIError("An unknown error occurred")
    }
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" })
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" })
  }
}

export const apiClient = new APIClient()
