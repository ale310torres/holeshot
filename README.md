# Holeshot Power Parts

Next.js ecommerce starter for a premium off-road parts store built for GitHub and Vercel.

## Run locally

```bash
npm install
npm run dev
```

## Shopify backend

This project uses Shopify Storefront API as the backend for products and checkout.

Add these environment variables in Vercel and in `.env.local` for local development:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
SHOPIFY_API_VERSION=2026-04
```

The site can still build without those variables. When Shopify is not configured, it shows demo products and disables checkout buttons.

### Create the Storefront token

1. In Shopify Admin, go to Apps > Develop apps.
2. Create or open a custom app.
3. Enable Storefront API access.
4. Allow product/catalog read access and cart checkout access.
5. Copy the Storefront access token into Vercel.

## Deploy on Vercel

1. Create a GitHub repository.
2. Push this folder to GitHub.
3. Import the repository in Vercel.
4. Keep the default framework preset: Next.js.
5. Add the Shopify environment variables.
6. Deploy.

## Next steps

- Add real Shopify products, images, inventory, and collections.
- Add fitment metafields for vehicle compatibility.
- Configure Meta Pixel, Google Analytics, email capture, and WhatsApp links.
