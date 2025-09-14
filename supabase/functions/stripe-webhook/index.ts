import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@14.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const signature = req.headers.get('stripe-signature');
    const body = await req.text();
    
    if (!signature) {
      throw new Error('No Stripe signature found');
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
    );

    console.log('Webhook event type:', event.type);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0].price.id;

        // Map price ID to subscription tier
        let tier: 'free' | 'pro' | 'enterprise' = 'free';
        if (priceId.includes('pro')) tier = 'pro';
        if (priceId.includes('enterprise')) tier = 'enterprise';

        // Update user subscription
        const { error } = await supabase
          .from('users')
          .update({
            subscription_tier: tier,
            subscription_status: 'active',
            stripe_customer_id: customerId,
          })
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('Error updating user subscription:', error);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        
        let status: 'active' | 'inactive' | 'cancelled' = 'inactive';
        if (subscription.status === 'active') status = 'active';
        if (subscription.status === 'canceled') status = 'cancelled';

        const { error } = await supabase
          .from('users')
          .update({ subscription_status: status })
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('Error updating subscription status:', error);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { error } = await supabase
          .from('users')
          .update({
            subscription_tier: 'free',
            subscription_status: 'cancelled',
          })
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('Error handling subscription cancellation:', error);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});