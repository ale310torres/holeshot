export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  description: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  price: string;
  currencyCode: string;
  image?: {
    url: string;
    altText: string;
  };
  variantId?: string;
};

type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

type ShopifyImage = {
  url: string;
  altText: string | null;
};

type ShopifyVariant = {
  id: string;
  availableForSale: boolean;
  price: ShopifyMoney;
};

type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  description: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  variants: {
    edges: Array<{ node: ShopifyVariant }>;
  };
};

const demoProducts: ShopifyProduct[] = [
  {
    id: "demo-pro-taper-chain-kit",
    handle: "pro-taper-chain-kit",
    title: "Pro Taper Chain & Sprocket Kit",
    vendor: "Pro Taper",
    description: "Kit de drivetrain para riders que quieren respuesta fuerte, durabilidad y fitment confiable.",
    productType: "Performance",
    tags: ["Dirt Bike", "Drivetrain"],
    availableForSale: true,
    price: "189.99",
    currencyCode: "USD",
  },
  {
    id: "demo-twin-air-filter",
    handle: "twin-air-performance-filter",
    title: "Twin Air Performance Filter",
    vendor: "Twin Air",
    description: "Filtro de alto flujo para mantenimiento y performance off-road.",
    productType: "Maintenance",
    tags: ["Dirt Bike", "ATV", "Filters"],
    availableForSale: true,
    price: "39.99",
    currencyCode: "USD",
  },
  {
    id: "demo-ngk-iridium-plug",
    handle: "ngk-iridium-spark-plug",
    title: "NGK Iridium Spark Plug",
    vendor: "NGK",
    description: "Reemplazo confiable para encendido limpio y arranque consistente.",
    productType: "OEM replacement",
    tags: ["Electrical", "Maintenance"],
    availableForSale: true,
    price: "14.99",
    currencyCode: "USD",
  },
  {
    id: "demo-moose-brake-pads",
    handle: "moose-racing-brake-pads",
    title: "Moose Racing Brake Pads",
    vendor: "Moose Racing",
    description: "Pads de freno para ATV y UTV con mordida estable en condiciones duras.",
    productType: "Brakes",
    tags: ["ATV", "UTV", "Brakes"],
    availableForSale: true,
    price: "34.99",
    currencyCode: "USD",
  },
];

const domain = process.env.SHOPIFY_STORE_DOMAIN ?? process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2026-04";

export function hasShopifyConfig() {
  return Boolean(domain && storefrontToken);
}

export function formatMoney(amount: string, currencyCode = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(Number(amount));
}

function shopifyEndpoint() {
  const normalizedDomain = domain?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `https://${normalizedDomain}/api/${apiVersion}/graphql.json`;
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  if (!hasShopifyConfig()) {
    return null;
  }

  try {
    const response = await fetch(shopifyEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontToken as string,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.error("Shopify request failed", response.status, await response.text());
      return null;
    }

    const payload = await response.json();

    if (payload.errors) {
      console.error("Shopify GraphQL errors", payload.errors);
      return null;
    }

    return payload.data as T;
  } catch (error) {
    console.error("Shopify connection error", error);
    return null;
  }
}

function mapProduct(product: ShopifyProductNode): ShopifyProduct {
  const firstVariant = product.variants.edges[0]?.node;
  const price = firstVariant?.price ?? product.priceRange.minVariantPrice;

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    vendor: product.vendor,
    description: product.description,
    productType: product.productType,
    tags: product.tags,
    availableForSale: product.availableForSale && Boolean(firstVariant?.availableForSale ?? true),
    price: price.amount,
    currencyCode: price.currencyCode,
    image: product.featuredImage
      ? {
          url: product.featuredImage.url,
          altText: product.featuredImage.altText ?? product.title,
        }
      : undefined,
    variantId: firstVariant?.id,
  };
}

const productsQuery = `#graphql
  query Products($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          handle
          title
          vendor
          description
          productType
          tags
          availableForSale
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const productByHandleQuery = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      vendor
      description
      productType
      tags
      availableForSale
      featuredImage {
        url
        altText
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export async function getProducts(first = 8) {
  const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProductNode }> } }>(productsQuery, { first });

  if (!data) {
    return demoProducts.slice(0, first);
  }

  return data.products.edges.map(({ node }) => mapProduct(node));
}

export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch<{ product: ShopifyProductNode | null }>(productByHandleQuery, { handle });

  if (!data?.product) {
    return demoProducts.find((product) => product.handle === handle) ?? null;
  }

  return mapProduct(data.product);
}

export async function createCheckout(variantId: string, quantity = 1) {
  const data = await shopifyFetch<{ cartCreate: { cart: { checkoutUrl: string } | null; userErrors: Array<{ message: string }> } }>(
    `#graphql
      mutation CreateCart($variantId: ID!, $quantity: Int!) {
        cartCreate(input: { lines: [{ merchandiseId: $variantId, quantity: $quantity }] }) {
          cart {
            checkoutUrl
          }
          userErrors {
            message
          }
        }
      }
    `,
    { variantId, quantity },
  );

  const error = data?.cartCreate.userErrors[0]?.message;
  const checkoutUrl = data?.cartCreate.cart?.checkoutUrl;

  if (error || !checkoutUrl) {
    throw new Error(error ?? "No se pudo crear el checkout de Shopify.");
  }

  return checkoutUrl;
}
