import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only throw error in development to help with setup
if (import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey)) {
  console.error(
    '⚠️ Missing Supabase environment variables.\n' +
    'Please create a .env file with:\n' +
    'VITE_SUPABASE_URL=your_project_url\n' +
    'VITE_SUPABASE_ANON_KEY=your_anon_key\n\n' +
    'See SUPABASE_SETUP.md for instructions.'
  );
}

// Create client with fallback values (will fail gracefully if env vars are missing)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

