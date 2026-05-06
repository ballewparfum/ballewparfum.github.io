import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { cart } = req.body;

    const line_items = cart.map(item => ({
  price_data: {
    currency: 'usd',
    product_data: {
      name: item.size
        ? `${item.name} — ${item.size}mL`
        : item.name,
    },
    unit_amount: Math.round(item.price * 100),
  },
  quantity: item.quantity,
}));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',

      shipping_address_collection: {
        allowed_countries: ['US'],
      },

      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    });

    res.status(200).json({ url: session.url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Checkout failed' });
  }
}