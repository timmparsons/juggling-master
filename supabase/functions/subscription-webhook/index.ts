import { serve } from 'https://deno.land/std@0.140.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  'https://tqxhlittrrvdqsrofphx.supabase.co',
  process.env.EXPO_SUPABASE_KEY
);

serve(async (req) => {
  if (req.method !== 'POST')
    return new Response('Method Not Allowed', { status: 405 });

  const body = await req.json();
  const {
    data: {
      attributes: { user_email, status, product_id },
    },
  } = body;

  const { data: user } = await supabase
    .from('auth.users')
    .select('id')
    .eq('email', user_email)
    .single();

  if (!user) return new Response('User not found', { status: 404 });

  let subscription_status = 'free';
  if (status === 'active' || status === 'trialing') {
    subscription_status =
      product_id === 'your-monthly-product-id' ? 'monthly' : 'yearly';
  }

  await supabase
    .from('users')
    .upsert({ id: user.id, subscription_status })
    .eq('id', user.id);

  return new Response('Webhook processed', { status: 200 });
});
