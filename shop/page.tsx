import Link from "next/link";

const filters = ["Categoría", "Marca", "Vehículo", "Año", "Modelo", "Precio", "OEM / Aftermarket", "En stock"];
const products = [
  ["Pro Taper Chain & Sprocket Kit", "$189.99", "Performance", "En stock"],
  ["Twin Air Performance Filter", "$39.99", "Maintenance", "En stock"],
  ["Moose Racing Brake Pads", "$34.99", "Brakes", "Oferta"],
  ["Wiseco Piston Kit", "$219.99", "Engine Parts", "En stock"],
  ["All Balls Wheel Bearing Kit", "$48.99", "Drivetrain", "OEM fit"],
  ["Renthal Handlebar Fatbar", "$109.99", "Controls", "En stock"],
];

export default function ShopPage() {
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
            <span>6 productos</span>
            <select aria-label="Ordenar productos">
              <option>Más vendidos</option>
              <option>Más recientes</option>
              <option>Precio bajo a alto</option>
              <option>Precio alto a bajo</option>
            </select>
          </div>
          <div className="product-grid">
            {products.map(([name, price, category, badge]) => (
              <article className="product-card" key={name}>
                <div className="product-image"><span>{category}</span></div>
                <div className="product-copy">
                  <small>{badge}</small>
                  <h3>{name}</h3>
                  <div className="product-meta">
                    <strong>{price}</strong>
                    <span>4.8 rating</span>
                  </div>
                  <Link href="/producto/pro-taper-chain-kit">Add to Cart</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
