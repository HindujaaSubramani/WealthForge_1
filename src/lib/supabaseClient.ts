import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = "https://guahnvncoldufnzbmlhh.supabase.co" as string;
const supabaseAnonKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1YWhudm5jb2xkdWZuemJtbGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NTAyNzIsImV4cCI6MjA3MjIyNjI3Mn0.D1gv7KocbUkgflzJpWFIxYHe2-9V53ikxzmtYGI6Aag" as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
