import type { Metadata } from "next";
import Link from "next/link";
import HeaderLogo from "./components/HeaderLogo";
import "./globals.css";
import "./logo.css";

export const metadata: Metadata = {
  title: "Holeshot Power Parts | Piezas para motoras, ATVs y UTVs",
  description:
    "Compra piezas OEM, reemplazo y alto rendimiento para motoras, motoras fuera de carretera, ATVs y UTVs. Busca por marca, modelo y año.",
};

const nav = [
  ["Inicio", "/"],
  ["Tienda", "/shop"],
  ["Motoras fuera de carretera", "/categorias#dirt"],
  ["ATVs", "/categorias#atv"],
  ["UTVs", "/categorias#utv"],
  ["Piezas OEM", "/categorias#oem"],
  ["Alto rendimiento", "/categorias#performance"],
  ["Ofertas", "/shop#ofertas"],
  ["Contacto", "/contacto"],
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Holeshot Power Parts">
            <HeaderLogo />
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
              Carrito
            </Link>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div>
            <strong>Holeshot Power Parts</strong>
            <p>Piezas de alto rendimiento, mantenimiento y OEM en un solo lugar.</p>
          </div>
          <div className="footer-links">
            <Link href="/request-a-part">Solicitar una pieza</Link>
            <Link href="/about">Sobre nosotros</Link>
            <Link href="/contacto">WhatsApp</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
