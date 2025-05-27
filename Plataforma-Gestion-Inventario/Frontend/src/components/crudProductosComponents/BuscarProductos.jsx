import React, { useState } from "react";
import { getProducto } from "../../services/crudServicesProducto/productoService";

const BuscarProductos = () => {
  const [query, setQuery] = useState("");
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  const handleBuscar = async () => {
    try {
      const resultado = await getProducto(query);
      setProductos(resultado);
      setError("");
    } catch (err) {
      setError("Producto no encontrado.");
      setProductos([]);
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
      <button onClick={handleBuscar}>Buscar</button>

      {error && <p>{error}</p>}

      {productos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Categoría</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.codigo}</td>
                <td>{producto.categoria.nombre}</td>
                <td>{producto.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BuscarProductos;
