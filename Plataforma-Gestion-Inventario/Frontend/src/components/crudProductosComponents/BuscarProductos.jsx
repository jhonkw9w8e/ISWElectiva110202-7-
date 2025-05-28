import React, { useState } from "react";
import { buscarProductos } from "../../services/crudServicesProducto/productoService";

const CATEGORIAS = [
  { id: 1, nombre: "Equipos Tecnlogicos" },
  { id: 2, nombre: "Ropa de Seguridad Industrial" },
  { id: 3, nombre: "Aparatos Electrónicos" },
];

const BuscarProductos = () => {
  const [query, setQuery] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState("");

  const handleBuscar = async () => {
    try {
      const data = await buscarProductos({
        q: query,
        categoriaId: categoriaId,
      });
      setResultados(data);
      setError("");
    } catch (err) {
      setError("Producto no encontrado.");
      setResultados([]);
    }
  };

  return (
    <div>
      <h1>Buscar Producto</h1>
      <input
        type="text"
        placeholder="Buscar por nombre o código"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <option value="">Todas las Categorias</option>
      {CATEGORIAS.map((c) => (
        <option key={c.id} value={c.id}>
          {c.nombre}
        </option>
      ))}

      <button onClick={handleBuscar}>Buscar</button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {resultados.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["ID", "Nombre", "Codigo", "Categoría", "Precio", "Stock"].map(
                (h) => (
                  <th key={h} className="px-4 py-2 text-sm font-medium">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {resultados.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.codigo}</td>
                <td>{p.categoria.nombre}</td>
                <td>{p.precio}</td>
                <td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {resultados.length === 0 && !error && <p>No se encontraron productos</p>}
    </div>
  );
};

export default BuscarProductos;
