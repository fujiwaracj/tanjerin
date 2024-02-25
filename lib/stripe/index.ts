import Stripe from "stripe";

export const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
    {
        apiVersion: '2023-10-16',
        appInfo: {
            name: 'Tanjerin',
            version: '0.0.0',
            url: 'https://tanjerin.app'
        }
    }
)
