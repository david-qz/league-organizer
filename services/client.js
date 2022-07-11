const SUPABASE_URL = 'https://wdpweagrfamroloehzcj.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcHdlYWdyZmFtcm9sb2VoemNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc1NjQ4ODgsImV4cCI6MTk3MzE0MDg4OH0.cTTn-Hc805F-aTVNs2wPZGLB6Ug9aL65D8Jo7p6OZ9Q';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
