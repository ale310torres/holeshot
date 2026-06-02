import { NextResponse } from "next/server";
import { createCheckout, hasShopifyConfig } from "../../../lib/shopify";

export async function POST(request: Request) {
  if (!hasShopifyConfig()) {
    return NextResponse.json(
      { error: "Configura SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_ACCESS_TOKEN en Vercel." },
      { status: 400 },
    );
  }

  try {
    const body = await request.json();
    const variantId = typeof body.variantId === "string" ? body.variantId : "";
    const requestedQuantity = Number(body.quantity ?? 1);
    const quantity = Number.isInteger(requestedQuantity) && requestedQuantity > 0 ? requestedQuantity : 1;

    if (!variantId) {
      return NextResponse.json({ error: "Falta el variantId del producto." }, { status: 400 });
    }

    const checkoutUrl = await createCheckout(variantId, quantity);

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo crear el checkout." },
      { status: 500 },
    );
  }
}
