diff --git a/src/App.jsx b/src/App.jsx
index c8ceb38d228010283300f2804452d3fe8e84d509..8fac1d006084c1dd209defa447809e3e71b39232 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -1,285 +1,319 @@
 import { useMemo, useState } from 'react';
 import {
   Search,
   Phone,
   ChevronRight,
   ShieldCheck,
   Wrench,
   Truck,
   Bike,
+  Shirt,
+  Gauge,
 } from 'lucide-react';
 import inventory from './data/inventory.json';
 
 const categories = [
   'All',
+  'Motocross Parts',
+  'Riding Gear',
   'Dirt Bike Parts',
   'ATV Parts',
   'UTV Parts',
   'ATV Tires',
   'Suspension',
   'OEM Parts',
   'Accessories',
 ];
 
 const categoryCards = [
   {
-    title: 'Dirt Bike Parts',
-    subtitle: 'Piezas para motocross y enduro',
+    title: 'Motocross Parts',
+    subtitle: 'Race-ready upgrades, mantenimiento y piezas de pista',
     image:
       'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
   },
   {
-    title: 'ATV Parts',
-    subtitle: 'Mantenimiento y performance',
+    title: 'Riding Gear',
+    subtitle: 'Cascos, goggles, jerseys, guantes, botas y protección',
     image:
-      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
+      'https://images.unsplash.com/photo-1523676060187-f55189a71f5e?auto=format&fit=crop&w=1200&q=80',
   },
   {
-    title: 'ATV Tires',
-    subtitle: 'Tracción y durabilidad',
+    title: 'ATV & UTV Parts',
+    subtitle: 'Piezas, gomas y accesorios para trabajo o recreación',
     image:
-      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
+      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
   },
   {
-    title: 'UTV Parts',
-    subtitle: 'Trabajo, recreación y upgrade',
+    title: 'OEM & Accessories',
+    subtitle: 'Filtros, frenos, transmisión y accesorios universales',
     image:
-      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
+      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80',
   },
 ];
 
 const featureCards = [
+  {
+    icon: Gauge,
+    title: 'Enfoque motocross',
+    text: 'Piezas y gear pensados para entrenar, correr y mantener tu máquina lista.',
+  },
   {
     icon: ShieldCheck,
-    title: 'Piezas confiables',
-    text: 'OEM y aftermarket para dirt bikes, ATV y UTV.',
+    title: 'Gear para protección',
+    text: 'Cascos, goggles, guantes, jerseys, botas y protección para riders.',
   },
   {
     icon: Wrench,
     title: 'Ayuda práctica',
-    text: 'Te ayudamos a identificar piezas por marca, modelo y año.',
-  },
-  {
-    icon: Truck,
-    title: 'Catálogo simple',
-    text: 'Encuentra rápido lo que buscas y escríbenos por WhatsApp.',
+    text: 'Te ayudamos a identificar piezas por marca, modelo y año antes de comprar.',
   },
 ];
 
+const serviceHighlights = [
+  'Dirt bikes 2T/4T',
+  'ATV deportivos y utilitarios',
+  'UTV de trabajo o trail',
+  'Riding gear para adultos y jóvenes',
+];
+
 export default function App() {
   const [search, setSearch] = useState('');
   const [activeCategory, setActiveCategory] = useState('All');
 
   const filteredInventory = useMemo(() => {
     return inventory.filter((item) => {
       const matchesCategory =
         activeCategory === 'All' || item.category === activeCategory;
 
       const q = search.toLowerCase();
       const matchesSearch =
         item.name.toLowerCase().includes(q) ||
         item.brand.toLowerCase().includes(q) ||
         item.model.toLowerCase().includes(q) ||
         item.category.toLowerCase().includes(q) ||
-        item.sku.toLowerCase().includes(q);
+        item.sku.toLowerCase().includes(q) ||
+        item.description.toLowerCase().includes(q);
 
       return matchesCategory && matchesSearch;
     });
   }, [search, activeCategory]);
 
   const buildWhatsAppUrl = (item) => {
     const message = `Hola, estoy interesado en ${item.name} (${item.sku}). ¿Está disponible?`;
     return `https://wa.me/17874154344?text=${encodeURIComponent(message)}`;
   };
 
   return (
     <div className="site">
       <div className="top-strip">
         <div className="container top-strip-inner">
           <span>TORRESMX</span>
-          <span>DIRT BIKES • ATV • UTV • OEM PARTS • ACCESSORIES</span>
+          <span>MOTOCROSS • MOTORAS • ATV • UTV • RIDING GEAR</span>
         </div>
       </div>
 
       <header className="header">
         <div className="container header-inner">
           <div className="logo-wrap">
             <div className="logo">TORRESMX</div>
-            <div className="logo-sub">Dirt Bike • ATV • UTV Parts</div>
+            <div className="logo-sub">Motocross Parts • ATV • UTV • Riding Gear</div>
           </div>
 
           <nav className="nav">
             <a href="#categorias">Categorías</a>
             <a href="#catalogo">Productos</a>
+            <a href="#gear">Riding Gear</a>
             <a href="#marcas">Marcas</a>
             <a href="#contacto">Contacto</a>
           </nav>
 
           <a
             className="btn btn-primary"
-            href="https://wa.me/17874154344?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20sus%20productos"
+            href="https://wa.me/17874154344?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20piezas%20o%20riding%20gear"
             target="_blank"
             rel="noreferrer"
           >
             <Phone size={16} />
             WhatsApp
           </a>
         </div>
       </header>
 
       <section className="hero">
         <div className="hero-bg" />
         <div className="container hero-content">
           <div className="hero-copy">
-            <div className="eyebrow">DIRT BIKE • ATV • UTV • OEM • PERFORMANCE</div>
+            <div className="eyebrow">MOTOCROSS FIRST • OEM • PERFORMANCE • RIDING GEAR</div>
             <h1>
-              Piezas y gomas para <span>rodar fuerte</span>
+              Piezas, accesorios y gear para <span>correr duro</span>
             </h1>
             <p>
-              Encuentra piezas OEM, frenos, suspensión, gomas y accesorios para
-              dirt bikes, ATV y UTV. Catálogo visual, búsqueda simple y
-              atención rápida por WhatsApp.
+              Tienda online enfocada en motocross con piezas para motoras,
+              ATV y UTV, además de riding gear para riders que quieren
+              protección, estilo y rendimiento en la pista o el trail.
             </p>
 
             <div className="hero-actions">
               <a className="btn btn-primary" href="#catalogo">
                 Ver catálogo
               </a>
-              <a className="btn btn-secondary" href="#contacto">
-                Solicitar pieza
+              <a className="btn btn-secondary" href="#gear">
+                Explorar gear
               </a>
             </div>
 
             <div className="hero-points">
               <div className="hero-point">
-                <strong>OEM & Aftermarket</strong>
-                <span>Opciones para diferentes budgets y necesidades</span>
+                <strong>Motocross ready</strong>
+                <span>Filtros, cadenas, controles, suspensión y upgrades</span>
               </div>
               <div className="hero-point">
-                <strong>Atención rápida</strong>
-                <span>WhatsApp directo para piezas específicas</span>
+                <strong>Riding gear</strong>
+                <span>Cascos, goggles, guantes, jerseys, botas y protección</span>
               </div>
               <div className="hero-point">
-                <strong>Enfoque powersports</strong>
-                <span>Solo dirt bikes, ATV y UTV</span>
+                <strong>ATV & UTV</strong>
+                <span>Gomas, frenos, mantenimiento y accesorios</span>
               </div>
             </div>
           </div>
 
           <div className="hero-side-card">
             <div className="side-label">Top categorías</div>
             <div className="side-list">
               <div className="side-item">
                 <Bike size={18} />
-                <span>Dirt Bike Parts</span>
+                <span>Motocross Parts</span>
                 <ChevronRight size={16} />
               </div>
               <div className="side-item">
-                <Truck size={18} />
-                <span>ATV Parts</span>
+                <Shirt size={18} />
+                <span>Riding Gear</span>
                 <ChevronRight size={16} />
               </div>
               <div className="side-item">
                 <Truck size={18} />
-                <span>ATV Tires</span>
+                <span>ATV Parts & Tires</span>
                 <ChevronRight size={16} />
               </div>
               <div className="side-item">
                 <Wrench size={18} />
-                <span>UTV Parts</span>
+                <span>UTV Parts & Accessories</span>
                 <ChevronRight size={16} />
               </div>
             </div>
             <p className="side-note">
-              Envíanos marca, modelo y año para ayudarte a encontrar la pieza
-              correcta.
+              Envíanos marca, modelo, año y estilo de uso para ayudarte a
+              encontrar la pieza o el gear correcto.
             </p>
           </div>
         </div>
       </section>
 
       <section id="categorias" className="category-section">
         <div className="container">
           <div className="section-head">
             <div className="section-kicker">Shop by category</div>
             <h2>Categorías principales</h2>
+            <p>Todo lo esencial para motocross, motoras, ATV, UTV y riders.</p>
           </div>
 
           <div className="category-grid">
             {categoryCards.map((item) => (
               <div
                 key={item.title}
                 className="category-card"
                 style={{
                   backgroundImage: `linear-gradient(180deg, rgba(8,12,20,0.1), rgba(8,12,20,0.88)), url(${item.image})`,
                 }}
               >
                 <div className="category-card-content">
                   <div className="category-title">{item.title}</div>
                   <div className="category-subtitle">{item.subtitle}</div>
                   <div className="category-link">Explorar</div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </section>
 
       <section className="feature-section">
         <div className="container feature-grid">
           {featureCards.map((item) => {
             const Icon = item.icon;
             return (
               <div key={item.title} className="feature-card">
                 <div className="feature-icon">
                   <Icon size={20} />
                 </div>
                 <div>
                   <strong>{item.title}</strong>
                   <p>{item.text}</p>
                 </div>
               </div>
             );
           })}
         </div>
       </section>
 
+      <section id="gear" className="gear-section">
+        <div className="container gear-box">
+          <div>
+            <div className="section-kicker">Riding gear</div>
+            <h2>Equípate para la pista</h2>
+            <p>
+              Añade al carrito todo lo que necesita un rider: cascos, goggles,
+              jerseys, pantalones, guantes, botas, chest protectors y neck
+              braces. Pregunta por tallas, colores y combos disponibles.
+            </p>
+          </div>
+
+          <div className="gear-list">
+            {['Cascos & goggles', 'Jerseys & pants', 'Guantes & botas', 'Protección corporal'].map((item) => (
+              <div className="gear-pill" key={item}>{item}</div>
+            ))}
+          </div>
+        </div>
+      </section>
+
       <section id="catalogo" className="catalog-section">
         <div className="container">
           <div className="section-head">
             <div className="section-kicker">Featured inventory</div>
             <h2>Productos destacados</h2>
-            <p>Filtra por categoría o busca por nombre, marca, modelo o SKU.</p>
+            <p>Filtra por categoría o busca por nombre, marca, modelo, SKU o descripción.</p>
           </div>
 
           <div className="catalog-toolbar">
             <div className="search-wrap">
               <Search size={18} />
               <input
                 type="text"
-                placeholder="Buscar producto, marca, modelo o SKU..."
+                placeholder="Buscar pieza, gear, marca, modelo o SKU..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
             </div>
 
             <div className="filter-row">
               {categories.map((category) => (
                 <button
                   key={category}
                   className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
                   onClick={() => setActiveCategory(category)}
                 >
                   {category}
                 </button>
               ))}
             </div>
           </div>
 
           <div className="results-row">
             <span>{filteredInventory.length} productos encontrados</span>
           </div>
 
           <div className="product-grid">
             {filteredInventory.map((item) => (
               <article key={item.id} className="product-card">
@@ -303,96 +337,102 @@ export default function App() {
 
                   <p className="product-description">{item.description}</p>
 
                   <div className="product-bottom">
                     <div>
                       <div className="product-price">${item.price.toFixed(2)}</div>
                       <div className="product-stock">Stock: {item.stock}</div>
                     </div>
 
                     <a
                       href={buildWhatsAppUrl(item)}
                       target="_blank"
                       rel="noreferrer"
                       className="btn btn-primary btn-small"
                     >
                       WhatsApp
                     </a>
                   </div>
                 </div>
               </article>
             ))}
           </div>
 
           {filteredInventory.length === 0 && (
             <div className="empty-state">
-              No encontramos productos con ese filtro. Intenta otra búsqueda.
+              No encontramos productos con ese filtro. Intenta otra búsqueda o escríbenos para cotizarlo.
             </div>
           )}
         </div>
       </section>
 
       <section id="marcas" className="brand-section">
         <div className="container">
           <div className="section-head compact">
             <div className="section-kicker">Brands</div>
             <h2>Marcas populares</h2>
           </div>
 
           <div className="brand-row">
-            {['Yamaha', 'Honda', 'KTM', 'Maxxis', 'ITP', 'DID', 'Pro Taper'].map((brand) => (
+            {['Yamaha', 'Honda', 'KTM', 'Kawasaki', 'Can-Am', 'Polaris', 'Fox', 'Alpinestars', 'Maxxis', 'ITP', 'DID', 'Pro Taper'].map((brand) => (
               <div key={brand} className="brand-chip">
                 {brand}
               </div>
             ))}
           </div>
         </div>
       </section>
 
       <section className="promo-section">
         <div className="container promo-box">
           <div className="promo-copy">
             <div className="section-kicker">Need help?</div>
-            <h2>¿No ves la pieza que buscas?</h2>
+            <h2>¿No ves la pieza o talla que buscas?</h2>
             <p>
-              Escríbenos por WhatsApp con marca, modelo, año y la pieza que
-              necesitas. Te ayudamos a buscar disponibilidad.
+              Escríbenos por WhatsApp con marca, modelo, año, pieza o talla de
+              gear. Te ayudamos a confirmar compatibilidad y disponibilidad.
             </p>
+            <div className="service-list">
+              {serviceHighlights.map((item) => (
+                <span key={item}>{item}</span>
+              ))}
+            </div>
           </div>
 
           <div className="promo-card">
             <div>
               <span>WhatsApp</span>
               <strong>(787) 415-4344</strong>
             </div>
             <div>
               <span>Email</span>
               <strong>atmrealestatepr@gmail.com</strong>
             </div>
             <a
               className="btn btn-primary btn-full"
-              href="https://wa.me/17874154344?text=Hola,%20busco%20una%20pieza%20para%20mi%20veh%C3%ADculo"
+              href="https://wa.me/17874154344?text=Hola,%20busco%20una%20pieza%20o%20riding%20gear%20para%20mi%20veh%C3%ADculo"
               target="_blank"
               rel="noreferrer"
             >
               Hablar por WhatsApp
             </a>
           </div>
         </div>
       </section>
 
       <footer id="contacto" className="footer">
         <div className="container footer-inner">
           <div>
             <div className="logo footer-logo">TORRESMX</div>
-            <div className="footer-sub">Dirt Bike • ATV • UTV Parts</div>
+            <div className="footer-sub">Motocross Parts • ATV • UTV • Riding Gear</div>
           </div>
           <div className="footer-links">
             <a href="#categorias">Categorías</a>
             <a href="#catalogo">Productos</a>
+            <a href="#gear">Riding Gear</a>
             <a href="#marcas">Marcas</a>
           </div>
         </div>
       </footer>
     </div>
   );
 }

