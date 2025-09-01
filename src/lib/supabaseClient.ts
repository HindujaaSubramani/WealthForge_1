import { createClient } from "@supabase/supabase-js";

// Supabase project URL and anon key
const supabaseUrl: string = "https://guahnvncoldufnzbmlhh.supabase.co";
const supabaseAnonKey: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1YWhudm5jb2xkdWZuemJtbGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NTAyNzIsImV4cCI6MjA3MjIyNjI3Mn0.D1gv7KocbUkgflzJpWFIxYHe2-9V53ikxzmtYGI6Aag";

// Create Supabase client with session persistence enabled
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,      // keep user logged in across reloads
    detectSessionInUrl: true,  // detect login session from URL (OAuth)
  },
});
