import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://jsojlyeytbbloivlappf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzb2pseWV5dGJibG9pdmxhcHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NjA0NzIsImV4cCI6MjA5MzIzNjQ3Mn0.zUGdfz12ZobVxDNEcbL_JXt85_lIecVVAI-AE-ILBNU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
