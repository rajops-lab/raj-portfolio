import { loadStripe } from '@stripe/stripe-js';
import { SubscriptionPlan } from '../types/pkm';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('Stripe publishable key not found');
}

export const stripe = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      '100 notes',
      '10MB storage',
      'Basic search',
      'Web access only',
    ],
    max_notes: 100,
    max_storage_mb: 10,
    stripe_price_id: '',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    interval: 'month',
    features: [
      'Unlimited notes',
      '1GB storage',
      'Advanced search',
      'File uploads & OCR',
      'Blockchain storage',
      'API access',
    ],
    max_notes: -1,
    max_storage_mb: 1024,
    stripe_price_id: 'price_pro_monthly',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 29.99,
    interval: 'month',
    features: [
      'Everything in Pro',
      '10GB storage',
      'Team collaboration',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
    ],
    max_notes: -1,
    max_storage_mb: 10240,
    stripe_price_id: 'price_enterprise_monthly',
  },
];

export class StripeService {
  /**
   * Create checkout session
   */
  async createCheckoutSession(priceId: string, userId: string): Promise<{ url: string | null; error: string | null }> {
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId,
          successUrl: `${window.location.origin}/notes?success=true`,
          cancelUrl: `${window.location.origin}/pricing?cancelled=true`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { url: null, error: data.error || 'Failed to create checkout session' };
      }

      return { url: data.url, error: null };
    } catch (error) {
      console.error('Stripe checkout error:', error);
      return { url: null, error: 'Failed to create checkout session' };
    }
  }

  /**
   * Get customer portal URL
   */
  async getCustomerPortalUrl(userId: string): Promise<{ url: string | null; error: string | null }> {
    try {
      const response = await fetch('/api/stripe/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          returnUrl: `${window.location.origin}/account`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { url: null, error: data.error || 'Failed to get portal URL' };
      }

      return { url: data.url, error: null };
    } catch (error) {
      console.error('Customer portal error:', error);
      return { url: null, error: 'Failed to get customer portal' };
    }
  }
}

export const stripeService = new StripeService();