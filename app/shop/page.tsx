import Link from "next/link";
import ShopifyBuyButton from "../components/ShopifyBuyButton";
import { formatMoney, getProducts } from "../../lib/shopify";

const filters = ["Categoría", "Marca", "Vehículo", "Año", "Modelo", "Precio", "OEM / Aftermarket", "En stock"];

export const revalidate = 300;

export default async function ShopPage() {
  const products = await getProducts(12);

  return (
    <main className="page-shell">
      <div className="page-title">
        <p className="eyebrow">Shop</p>
        <h1>Catálogo Holeshot</h1>
        <p>Busca, filtra y compra piezas para motoras, ATVs, UTVs y side by sides.</p>
      </div>
      <div className="catalog-layout">
        <aside className="filters">
          <h2>Filtros</h2>
          {filters.map((filter) => (
            <label key={filter}>
              <span>{filter}</span>
              <select>
                <option>Todos</option>
              </select>
            </label>
          ))}
        </aside>
        <section>
          <div className="sort-row">
            <span>{products.length} productos</span>
            <select aria-label="Ordenar productos">
              <option>Más vendidos</option>
              <option>Más recientes</option>
              <option>Precio bajo a alto</option>
              <option>Precio alto a bajo</option>
            </select>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image.url} alt={product.image.altText} />
                  ) : (
                    <span>{product.productType || product.vendor || "Part"}</span>
                  )}
                </div>
                <div className="product-copy">
                  <small>{product.availableForSale ? "En stock" : "Agotado"}</small>
                  <h3>{product.title}</h3>
                  <div className="product-meta">
                    <strong>{formatMoney(product.price, product.currencyCode)}</strong>
                    <span>{product.vendor || "Holeshot"}</span>
                  </div>
                  <div className="product-actions">
                    <Link href={`/producto/${product.handle}`}>Ver producto</Link>
                    <ShopifyBuyButton
                      variantId={product.variantId}
                      availableForSale={product.availableForSale}
                      label="Comprar"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
