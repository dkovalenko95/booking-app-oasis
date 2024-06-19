import { createClient } from '@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from './supabase';

export const supabaseSignUpTemp = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storageKey: 'tempSignIn',
  },
});
