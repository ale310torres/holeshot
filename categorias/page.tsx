const categories = [
  "Engine Parts",
  "Drivetrain",
  "Suspension",
  "Brakes",
  "Tires & Wheels",
  "Filters",
  "Oils & Fluids",
  "Electrical",
  "Exhaust",
  "Handlebars & Controls",
  "Plastics & Body",
  "Protection",
  "Performance Upgrades",
  "OEM Parts",
  "Maintenance Kits",
  "Riding Gear",
  "Tools",
];

export default function CategoriesPage() {
  return (
    <main className="page-shell">
      <div className="page-title">
        <p className="eyebrow">Categories</p>
        <h1>Categorías principales</h1>
        <p>Organiza el catálogo por sistema, mantenimiento, performance y piezas OEM.</p>
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
