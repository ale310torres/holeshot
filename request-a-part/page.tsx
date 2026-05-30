export default function RequestPartPage() {
  return (
    <main className="page-shell narrow">
      <div className="page-title">
        <p className="eyebrow">Request a Part</p>
        <h1>¿No encuentras la pieza?</h1>
        <p>Envíanos marca, modelo, año y una foto. Te ayudamos a identificarla y conseguirla.</p>
      </div>
      <form className="finder-form">
        <label>Nombre<input placeholder="Tu nombre" /></label>
        <label>WhatsApp<input placeholder="Número de contacto" /></label>
        <label>Vehículo<input placeholder="Ej. 2021 Can-Am Maverick X3" /></label>
        <label>Descripción<textarea placeholder="Describe la pieza o problema" /></label>
        <button type="submit">Solicitar pieza</button>
      </form>
    </main>
  );
}
