import Link from "next/link";
import { notFound } from "next/navigation";
import ShopifyBuyButton from "../../components/ShopifyBuyButton";
import { formatMoney, getProductByHandle } from "../../../lib/shopify";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return { title: "Producto no encontrado | Holeshot Power Parts" };
  }

  return {
    title: `${product.title} | Holeshot Power Parts`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <main className="page-shell">
      <section className="product-detail">
        <div className="detail-gallery">
          <div className="main-product-image">
            {product.image ? (
              <img src={product.image.url} alt={product.image.altText} />
            ) : (
              <span>{product.productType || product.vendor || "Pieza de alto rendimiento"}</span>
            )}
          </div>
          <div className="thumb-row"><span /><span /><span /></div>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.vendor || "Holeshot"}</p>
          <h1>{product.title}</h1>
          <p className="price">{formatMoney(product.price, product.currencyCode)}</p>
          <p>{product.description || "Pieza seleccionada para pilotos que quieren calidad, compatibilidad y confianza."}</p>
          <dl className="spec-list">
            <div><dt>Disponibilidad</dt><dd>{product.availableForSale ? "En stock" : "Agotado"}</dd></div>
            <div><dt>Marca</dt><dd>{product.vendor || "Holeshot"}</dd></div>
            <div><dt>Categoría</dt><dd>{product.productType || "Piezas de alto rendimiento"}</dd></div>
            <div><dt>Etiquetas</dt><dd>{product.tags.length ? product.tags.join(", ") : "Motora / ATV / UTV"}</dd></div>
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
        <h2>Compatibilidad</h2>
        <table>
          <tbody>
            <tr><th>Compatibilidad</th><td>Confirma marca, modelo y año antes de ordenar.</td></tr>
            <tr><th>Tipo</th><td>{product.tags.find((tag) => ["Dirt Bike", "ATV", "UTV", "Motorcycle"].includes(tag)) ?? "Fuera de carretera"}</td></tr>
            <tr><th>Soporte</th><td>Escríbenos por WhatsApp si necesitas validar compatibilidad.</td></tr>
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
