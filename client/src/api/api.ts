// API Configuration and Handler
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An error occurred' }))
        return {
          error: errorData.message || `HTTP error! status: ${response.status}`,
        }
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error occurred',
      }
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

// Create and export API client instance
export const api = new ApiClient(API_BASE_URL)

// Example API functions
export const newsApi = {
  getAll: () => api.get('/news'),
  getById: (id: string | number) => api.get(`/news/${id}`),
  create: (data: unknown) => api.post('/news', data),
  update: (id: string | number, data: unknown) => api.put(`/news/${id}`, data),
  delete: (id: string | number) => api.delete(`/news/${id}`),
}

export const eventsApi = {
  getAll: () => api.get('/events'),
  getById: (id: string | number) => api.get(`/events/${id}`),
  create: (data: unknown) => api.post('/events', data),
  update: (id: string | number, data: unknown) => api.put(`/events/${id}`, data),
  delete: (id: string | number) => api.delete(`/events/${id}`),
}

export default api

