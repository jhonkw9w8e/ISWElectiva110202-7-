import { useState } from "react";
import { buscarProducto } from "../../services/crudServicesProducto/productoService";

function BuscarProducto() {
  const [query, setQuery] = useState("");
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");

  const handleBuscar = async () => {
    try {
      const resultado = await buscarProducto(query);
      setProducto(resultado);
      setError("");
    } catch (err) {
      setProducto(null);
      setError("Producto no encontrado.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Buscar Producto</h2>
      <input
        type="text"
        placeholder="Nombre o código del producto"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleBuscar}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Buscar
      </button>

      {producto && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <p>
            <strong>ID:</strong> {producto.id}
          </p>
          <p>
            <strong>Nombre:</strong> {producto.nombre}
          </p>
          <p>
            <strong>Descripción:</strong> {producto.descripcion}
          </p>
          <p>
            <strong>Precio:</strong> ${producto.precio}
          </p>
          <p>
            <strong>Categoría:</strong> {producto.categoria}
          </p>
        </div>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}

export default BuscarProducto;
