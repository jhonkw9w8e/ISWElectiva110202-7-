import React, { useState, useEffect } from "react";
import {
  getProducto,
  updateProducto,
} from "../../services/crudServicesProducto/ProductoService";

const ActualizarStock = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoStock, setNuevoStock] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProducto();
        setProductos(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProductos();
  }, []);

  const handleSeleccionChange = (e) => {
    const id = parseInt(e.target.value, 10);
    const prod = productos.find((p) => p.id === id) || null;
    setProductoSeleccionado(prod);
    setNuevoStock(prod ? prod.stock : "");
    setMensaje("");
  };

  const handleActualizarStock = async () => {
    if (!productoSeleccionado) {
      setMensaje("Selecciona primero un producto.");
      return;
    }
    if (parseInt(nuevoStock, 10) < 0) {
      setMensaje("El stock no puede ser negativo.");
      return;
    }
    try {
      const datosActualizados = {
        ...productoSeleccionado,
        stock: parseInt(nuevoStock, 10),
      };
      await updateProducto(productoSeleccionado.id, datosActualizados);
      setProductos((prev) =>
        prev.map((p) =>
          p.id === productoSeleccionado.id
            ? { ...p, stock: parseInt(nuevoStock, 10) }
            : p
        )
      );
      setMensaje("Stock actualizado correctamente.");
    } catch (error) {
      console.error(error);
      setMensaje("Error al actualizar el stock.");
    }
  };

  return (
    <main className="p-4 bg-[#CCE6CC] min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Actualizar Stock</h1>
      <div className="mb-4">
        <label className="block mb-1">Selecciona un producto:</label>
        <select
          value={productoSeleccionado ? productoSeleccionado.id : ""}
          onChange={handleSeleccionChange}
          className="border p-2 rounded"
        >
          <option value="" disabled>
            -- Elige un producto --
          </option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.id}>
              {producto.nombre} (Stock actual: {producto.stock})
            </option>
          ))}
        </select>
      </div>
      {productoSeleccionado && (
        <div className="mb-4">
          <label className="block mb-1">Nuevo stock:</label>
          <input
            type="number"
            value={nuevoStock}
            onChange={(e) => setNuevoStock(e.target.value)}
            className="border p-2 rounded w-32"
          />
        </div>
      )}
      <button
        onClick={handleActualizarStock}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Actualizar Stock
      </button>
      {mensaje && (
        <p className="mt-4 text-center text-sm text-[#333]">{mensaje}</p>
      )}
    </main>
  );
};

export default ActualizarStock;
