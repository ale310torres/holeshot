import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Holeshot Power Parts | Piezas para Motoras, ATVs y UTVs",
  description:
    "Compra piezas OEM, aftermarket y performance para motoras, dirt bikes, ATVs y UTVs. Busca por marca, modelo y año.",
};

const nav = [
  ["Inicio", "/"],
  ["Shop", "/shop"],
  ["Dirt Bikes", "/categorias#dirt"],
  ["ATVs", "/categorias#atv"],
  ["UTVs", "/categorias#utv"],
  ["OEM Parts", "/categorias#oem"],
  ["Performance", "/categorias#performance"],
  ["Ofertas", "/shop#ofertas"],
  ["Contacto", "/contacto"],
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            <span className="brand-mark">HPP</span>
            <span>Holeshot Power Parts</span>
          </Link>
          <nav className="nav" aria-label="Principal">
            {nav.map(([label, href]) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link className="ghost-button" href="/buscar-vehiculo">
              Buscar por vehículo
            </Link>
            <Link className="cart-button" href="/shop">
              Cart
            </Link>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div>
            <strong>Holeshot Power Parts</strong>
            <p>Performance, maintenance and OEM parts in one place.</p>
          </div>
          <div className="footer-links">
            <Link href="/request-a-part">Request a Part</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contacto">WhatsApp</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
