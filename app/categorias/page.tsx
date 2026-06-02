const categories = [
  "Piezas de motor",
  "Tren de transmisión",
  "Suspensión",
  "Frenos",
  "Gomas y aros",
  "Filtros",
  "Aceites y fluidos",
  "Sistema eléctrico",
  "Escape",
  "Manubrios y controles",
  "Plásticos y carrocería",
  "Protección",
  "Mejoras de alto rendimiento",
  "Piezas OEM",
  "Kits de mantenimiento",
  "Equipo de montar",
  "Herramientas",
];

export default function CategoriesPage() {
  return (
    <main className="page-shell">
      <div className="page-title">
        <p className="eyebrow">Categorías</p>
        <h1>Categorías principales</h1>
        <p>Organiza el catálogo por sistema, mantenimiento, alto rendimiento y piezas OEM.</p>
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <a className="category-card" href="/shop" key={category}>
            <span>{category}</span>
            <small>Ver productos</small>
          </a>
        ))}
      </div>
    </main>
  );
}
