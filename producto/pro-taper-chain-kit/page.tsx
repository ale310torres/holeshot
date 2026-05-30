import Link from "next/link";

export default function ProductPage() {
  return (
    <main className="page-shell">
      <section className="product-detail">
        <div className="detail-gallery">
          <div className="main-product-image">Performance Kit</div>
          <div className="thumb-row"><span /><span /><span /></div>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">Pro Taper</p>
          <h1>Chain & Sprocket Performance Kit</h1>
          <p className="price">$189.99</p>
          <p>Kit de drivetrain para riders que quieren respuesta fuerte, durabilidad y fitment confiable.</p>
          <dl className="spec-list">
            <div><dt>Disponibilidad</dt><dd>En stock</dd></div>
            <div><dt>SKU</dt><dd>HPP-PT-428-001</dd></div>
            <div><dt>Marca</dt><dd>Pro Taper</dd></div>
            <div><dt>Compatibilidad</dt><dd>Yamaha / Honda dirt bike seleccionadas</dd></div>
          </dl>
          <div className="buy-actions">
            <button>Add to Cart</button>
            <button>Comprar ahora</button>
            <Link href="/contacto">Preguntar por WhatsApp</Link>
          </div>
        </div>
      </section>
      <section className="fitment-table">
        <h2>Fitment</h2>
        <table>
          <tbody>
            <tr><th>Marca</th><td>Yamaha, Honda</td></tr>
            <tr><th>Modelo</th><td>YZ250F, CRF250R</td></tr>
            <tr><th>Año</th><td>2018-2024</td></tr>
            <tr><th>Tipo</th><td>Dirt Bike</td></tr>
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
