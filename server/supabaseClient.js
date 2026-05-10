import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Add this line to check if Vite sees the keys
console.log("Keys loaded:", !!supabaseUrl, !!supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
