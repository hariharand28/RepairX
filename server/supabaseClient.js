import { createClient } from '@supabase/supabase-js'

// Vite automatically loads variables, so you don't need 'dotenv'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)