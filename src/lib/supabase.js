import { createClient } from '@supabase/supabase-js'

// These will be set via environment variables
// Get these from your Supabase project settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create a single supabase client for interacting with your database
// Use placeholder values during build if env vars are not set (prevents build errors)
// The ViewCounter component checks for env vars before using the client anyway
const getSupabaseClient = () => {
  if (supabaseUrl && supabaseAnonKey) {
    return createClient(supabaseUrl, supabaseAnonKey)
  }
  // Return a client with placeholder values that won't break the build
  // This client won't work at runtime, but ViewCounter checks env vars before using it
  return createClient('https://placeholder.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder')
}

export const supabase = getSupabaseClient()

