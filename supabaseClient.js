import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tqxhlittrrvdqsrofphx.supabase.co'; // Replace with your URL
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeGhsaXR0cnJ2ZHFzcm9mcGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NzA2MDUsImV4cCI6MjA2NDA0NjYwNX0.HLrzo-57g_pMqyVR8s3j5faUEYmsiLh9Y9uCLW7L9uY';
export const supabase = createClient(supabaseUrl, supabaseKey);
