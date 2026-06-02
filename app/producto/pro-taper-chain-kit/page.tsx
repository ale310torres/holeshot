import Link from "next/link";
import ShopifyBuyButton from "../../components/ShopifyBuyButton";
import { formatMoney, getProductByHandle } from "../../../lib/shopify";

export const revalidate = 300;

export default async function ProductPage() {
  const product = await getProductByHandle("pro-taper-chain-kit");

  if (!product) {
    return (
      <main className="page-shell narrow">
        <div className="page-title">
          <p className="eyebrow">Producto</p>
          <h1>Producto no encontrado</h1>
          <p>Revisa el catálogo o escríbenos para ayudarte a conseguir la pieza.</p>
          <Link className="primary-button" href="/shop">Volver al shop</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="product-detail">
        <div className="detail-gallery">
          <div className="main-product-image">
            {product.image ? (
              <img src={product.image.url} alt={product.image.altText} />
            ) : (
              <span>{product.productType || product.vendor || "Performance Kit"}</span>
            )}
          </div>
          <div className="thumb-row"><span /><span /><span /></div>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.vendor || "Holeshot"}</p>
          <h1>{product.title}</h1>
          <p className="price">{formatMoney(product.price, product.currencyCode)}</p>
          <p>{product.description || "Kit de drivetrain para riders que quieren respuesta fuerte, durabilidad y fitment confiable."}</p>
          <dl className="spec-list">
            <div><dt>Disponibilidad</dt><dd>{product.availableForSale ? "En stock" : "Agotado"}</dd></div>
            <div><dt>Marca</dt><dd>{product.vendor || "Holeshot"}</dd></div>
            <div><dt>Categoría</dt><dd>{product.productType || "Performance Parts"}</dd></div>
            <div><dt>Tags</dt><dd>{product.tags.length ? product.tags.join(", ") : "Dirt Bike / ATV / UTV"}</dd></div>
          </dl>
          <div className="buy-actions">
            <ShopifyBuyButton
              variantId={product.variantId}
              availableForSale={product.availableForSale}
              label="Comprar ahora"
            />
            <Link href="/contacto">Preguntar por WhatsApp</Link>
          </div>
        </div>
      </section>
      <section className="fitment-table">
        <h2>Fitment</h2>
        <table>
          <tbody>
            <tr><th>Compatibilidad</th><td>Confirma marca, modelo y año antes de ordenar.</td></tr>
            <tr><th>Tipo</th><td>{product.tags.find((tag) => ["Dirt Bike", "ATV", "UTV", "Motorcycle"].includes(tag)) ?? "Off-road"}</td></tr>
            <tr><th>Soporte</th><td>Escríbenos por WhatsApp si necesitas validar fitment.</td></tr>
          </tbody>
        </table>
      </section>
      <section className="trust-grid">
        {["Envíos disponibles", "Piezas verificadas", "Soporte experto", "Compra segura"].map((item) => (
          <div key={item}><strong>{item}</strong><p>Compra con claridad antes de instalar.</p></div>
        ))}
      </section>
    </main>
  );
}
