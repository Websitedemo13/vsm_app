import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  university?: string
  student_id?: string
  phone?: string
  role: 'user' | 'editor' | 'admin'
  is_premium: boolean
  premium_expires_at?: string
  created_at: string
  updated_at: string
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  author_id: string
  category: string
  tags: string[]
  published: boolean
  published_at?: string
  created_at: string
  updated_at: string
  profiles?: {
    full_name: string
    avatar_url?: string
  }
}

export type Order = {
  id: string
  user_id: string
  order_number: string
  product_type: string
  product_id?: string
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method?: string
  payment_details?: Record<string, any>
  created_at: string
  updated_at: string
  profiles?: {
    full_name: string
    email: string
    phone?: string
  }
}

export type SupportTicket = {
  id: string
  user_id: string
  subject: string
  message: string
  response?: string
  responded_by?: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  created_at: string
  updated_at: string
  profiles?: {
    full_name: string
    email: string
  }
}

export type Run = {
  id: string
  user_id: string
  title: string
  distance_km: number
  duration_seconds: number
  avg_pace_per_km?: string
  calories_burned?: number
  route_data?: Record<string, any>
  start_location?: string
  end_location?: string
  created_at: string
}
