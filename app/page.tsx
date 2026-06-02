import Image from "next/image";
import Link from "next/link";
import { formatMoney, getProducts } from "../lib/shopify";

const categories = [
  "Dirt Bike Parts",
  "ATV Parts",
  "UTV Parts",
  "OEM Parts",
  "Performance Parts",
  "Maintenance Kits",
];

const brands = [
  "Yamaha",
  "Honda",
  "Kawasaki",
  "Suzuki",
  "KTM",
  "Polaris",
  "Can-Am",
  "CF Moto",
  "Wiseco",
  "ProX",
  "All Balls",
  "Moose Racing",
  "Twin Air",
  "Renthal",
  "NGK",
  "K&N",
];

export const revalidate = 300;

export default async function Home() {
  const products = await getProducts(4);

  return (
    <main>
      <section className="hero">
        <Image
          src="/images/offroad-hero.png"
          alt="Dirt bike and UTV riding through a rugged off-road trail"
          fill
          priority
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">OEM, aftermarket & performance parts</p>
          <h1>Domina la ruta con las piezas correctas</h1>
          <p>
            Piezas para motoras, ATVs y UTVs. Performance, mantenimiento, OEM y
            aftermarket parts para riders que no se quedan a pie.
          </p>
          <form className="search-panel" action="/shop">
            <input name="q" placeholder="Busca por pieza, marca, modelo o número de parte" />
            <button type="submit">Buscar</button>
          </form>
          <div className="hero-actions">
            <Link className="primary-button" href="/shop">
              Comprar piezas
            </Link>
            <Link className="secondary-button" href="/buscar-vehiculo">
              Buscar por vehículo
            </Link>
            <Link className="whatsapp-button" href="/contacto">
              Hablar por WhatsApp
            </Link>
          </div>
        </div>
      </section>

      <section className="vehicle-strip">
        <span>Dirt Bike</span>
        <span>Motorcycle</span>
        <span>ATV</span>
        <span>UTV</span>
        <span>Side by Side</span>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Featured categories</p>
          <h2>Encuentra piezas por categoría</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link className="category-card" href="/categorias" key={category}>
              <span>{category}</span>
              <small>Shop now</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="fitment-band">
        <div>
          <p className="eyebrow">No adivines</p>
          <h2>Compra la pieza compatible con tu máquina</h2>
          <p>
            Filtra por tipo de vehículo, marca, año y modelo para encontrar
            piezas correctas desde el primer intento.
          </p>
        </div>
        <Link className="primary-button" href="/buscar-vehiculo">
          Buscar piezas compatibles
        </Link>
      </section>

      <section className="section" id="ofertas">
        <div className="section-heading">
          <p className="eyebrow">Best sellers</p>
          <h2>Productos populares</h2>
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
                <Link href={`/producto/${product.handle}`}>Ver producto</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="request-band">
        <div>
          <p className="eyebrow">Request a Part</p>
          <h2>¿No encuentras la pieza que necesitas?</h2>
          <p>
            Envíanos la marca, modelo, año y una foto de la pieza. Te ayudamos a
            conseguirla.
          </p>
        </div>
        <Link className="secondary-button" href="/request-a-part">
          Solicitar pieza por WhatsApp
        </Link>
      </section>

      <section className="trust-grid">
        {["Soporte experto", "Piezas verificadas", "Envíos rápidos", "Compra segura"].map(
          (item) => (
            <div key={item}>
              <strong>{item}</strong>
              <p>Servicio claro para comprar con confianza y mantener tu máquina lista.</p>
            </div>
          ),
        )}
      </section>

      <section className="brand-cloud">
        {brands.map((brand) => (
          <span key={brand}>{brand}</span>
        ))}
      </section>
    </main>
  );
}
