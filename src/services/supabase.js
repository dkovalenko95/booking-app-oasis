import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://nciymbkietambwmlyeav.supabase.co';

export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jaXltYmtpZXRhbWJ3bWx5ZWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3Mzc5NjcsImV4cCI6MjAxNjMxMzk2N30.vFb1rIklFBc8Gcn2Ud4PBENz8qBm2ANG0d3MVct_weA'; // -> maybe palce it in env file

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
