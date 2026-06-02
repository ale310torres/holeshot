export default function ContactPage() {
  return (
    <main className="page-shell narrow">
      <div className="page-title">
        <p className="eyebrow">Contacto</p>
        <h1>Habla con Holeshot</h1>
        <p>¿No encuentras la pieza que buscas? Envíanos marca, modelo, año y foto de la pieza.</p>
      </div>
      <form className="finder-form">
        <label>Nombre<input placeholder="Tu nombre" /></label>
        <label>Correo electrónico<input placeholder="correo@ejemplo.com" /></label>
        <label>WhatsApp<input placeholder="Número de WhatsApp" /></label>
        <label>Mensaje<textarea placeholder="Cuéntanos qué pieza necesitas" /></label>
        <button type="submit">Enviar mensaje</button>
      </form>
      <div className="contact-panel">
        <strong>WhatsApp</strong>
        <p>Disponible para cotizaciones, compatibilidad y piezas difíciles de conseguir.</p>
      </div>
    </main>
  );
}
