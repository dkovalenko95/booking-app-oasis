import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://nciymbkietambwmlyeav.supabase.co';

export const supabaseKey = import.meta.env.VITE_DB_SUP;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
