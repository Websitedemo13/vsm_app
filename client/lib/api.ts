import { supabase } from './supabase'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

class ApiClient {
  private async getAuthHeaders() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.access_token) {
      return {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      }
    }
    return {
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = await this.getAuthHeaders()
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }))
      throw new Error(error.error || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Auth
  async login(email: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(data: {
    email: string
    password: string
    full_name: string
    university?: string
    student_id?: string
    phone?: string
  }) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getCurrentUser() {
    return this.request('/api/auth/me')
  }

  // Admin endpoints
  async getAllUsers(params: {
    page?: number
    limit?: number
    search?: string
    role?: string
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })
    
    return this.request(`/api/admin/users?${searchParams}`)
  }

  async updateUserRole(userId: string, role: string) {
    return this.request(`/api/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    })
  }

  async deleteUser(userId: string) {
    return this.request(`/api/admin/users/${userId}`, {
      method: 'DELETE',
    })
  }

  async getRevenueStats() {
    return this.request('/api/admin/revenue')
  }

  async getAllOrders(params: {
    page?: number
    limit?: number
    status?: string
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })
    
    return this.request(`/api/admin/orders?${searchParams}`)
  }

  // CMS endpoints
  async getBlogPosts(params: {
    page?: number
    limit?: number
    category?: string
    published?: boolean
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, value.toString())
    })
    
    return this.request(`/api/cms/posts?${searchParams}`)
  }

  async createBlogPost(data: {
    title: string
    content: string
    excerpt?: string
    featured_image?: string
    category?: string
    tags?: string[]
  }) {
    return this.request('/api/cms/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateBlogPost(id: string, data: {
    title: string
    content: string
    excerpt?: string
    featured_image?: string
    category?: string
    tags?: string[]
  }) {
    return this.request(`/api/cms/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteBlogPost(id: string) {
    return this.request(`/api/cms/posts/${id}`, {
      method: 'DELETE',
    })
  }

  async publishBlogPost(id: string) {
    return this.request(`/api/cms/posts/${id}/publish`, {
      method: 'POST',
    })
  }

  async getOrders(params: {
    page?: number
    limit?: number
    status?: string
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })
    
    return this.request(`/api/cms/orders?${searchParams}`)
  }

  async updateOrderStatus(id: string, status: string) {
    return this.request(`/api/cms/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  }

  async getSupportTickets(params: {
    page?: number
    limit?: number
    status?: string
    priority?: string
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })
    
    return this.request(`/api/cms/support?${searchParams}`)
  }

  async respondToTicket(id: string, response: string) {
    return this.request(`/api/cms/support/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ response }),
    })
  }

  // Public API
  async getPublishedPosts(params: {
    page?: number
    limit?: number
    category?: string
    search?: string
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })
    
    return this.request(`/api/posts?${searchParams}`)
  }

  async getPostBySlug(slug: string) {
    return this.request(`/api/posts/${slug}`)
  }

  async getEvents(params: {
    page?: number
    limit?: number
    status?: string
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })
    
    return this.request(`/api/events?${searchParams}`)
  }

  async getUserRuns(params: {
    page?: number
    limit?: number
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })
    
    return this.request(`/api/runs?${searchParams}`)
  }

  async createRun(data: {
    title: string
    distance_km: number
    duration_seconds: number
    avg_pace_per_km?: string
    calories_burned?: number
    route_data?: Record<string, any>
    start_location?: { lat: number; lng: number }
    end_location?: { lat: number; lng: number }
  }) {
    return this.request('/api/runs', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async createOrder(data: {
    product_type: string
    product_id?: string
    amount: number
    payment_method: string
    payment_details?: Record<string, any>
  }) {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async createSupportTicket(data: {
    subject: string
    message: string
    priority?: string
  }) {
    return this.request('/api/support', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const api = new ApiClient()
