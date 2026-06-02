"use client";

import { useState } from "react";

type ShopifyBuyButtonProps = {
  variantId?: string;
  availableForSale: boolean;
  label?: string;
};

export default function ShopifyBuyButton({
  variantId,
  availableForSale,
  label = "Comprar ahora",
}: ShopifyBuyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const canBuy = Boolean(variantId && availableForSale);

  async function handleBuy() {
    if (!variantId) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, quantity: 1 }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(payload.error ?? "No se pudo abrir el checkout.");
      }

      window.location.href = payload.checkoutUrl;
    } catch (error) {
      alert(error instanceof Error ? error.message : "No se pudo abrir el checkout.");
      setIsLoading(false);
    }
  }

  return (
    <button type="button" disabled={!canBuy || isLoading} onClick={handleBuy}>
      {isLoading ? "Abriendo checkout..." : canBuy ? label : "Configura Shopify"}
    </button>
  );
}
