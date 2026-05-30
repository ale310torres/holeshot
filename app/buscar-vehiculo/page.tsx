const brands = ["Yamaha", "Honda", "Kawasaki", "Suzuki", "KTM", "Husqvarna", "Polaris", "Can-Am", "CF Moto", "Arctic Cat", "Kymco", "Otros"];

export default function VehicleSearchPage() {
  return (
    <main className="page-shell narrow">
      <div className="page-title">
        <p className="eyebrow">Fitment finder</p>
        <h1>Buscar por vehículo</h1>
        <p>Selecciona tu máquina para ver piezas compatibles y evitar compras incorrectas.</p>
      </div>
      <form className="finder-form">
        <label>
          Tipo de vehículo
          <select>
            <option>Dirt Bike</option>
            <option>Motorcycle</option>
            <option>ATV</option>
            <option>UTV</option>
            <option>Side by Side</option>
          </select>
        </label>
        <label>
          Marca
          <select>
            {brands.map((brand) => <option key={brand}>{brand}</option>)}
          </select>
        </label>
        <label>
          Año
          <input placeholder="Ej. 2022" />
        </label>
        <label>
          Modelo
          <input placeholder="Ej. YZ250F, Raptor 700, RZR XP" />
        </label>
        <button type="submit">Buscar piezas compatibles</button>
      </form>
    </main>
  );
}
