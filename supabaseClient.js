import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tqxhlittrrvdqsrofphx.supabase.co'; // Replace with your URL
const supabaseKey = process.env.EXPO_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
