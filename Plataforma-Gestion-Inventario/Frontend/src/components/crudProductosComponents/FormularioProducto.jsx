import React, { useState } from "react";
import {
  createProducto,
  updateProducto,
} from "../../services/crudServicesProducto/productoService";

const FormularioProducto = ({ productoEditar }) => {
  const [nombre, setNombre] = useState(productoEditar?.nombre || "");
  const [codigo, setCodigo] = useState(productoEditar?.codigo || "");
  const [precio, setPrecio] = useState(productoEditar?.precio || "");
  const [categoriaId, setCategoriaId] = useState(
    productoEditar?.categoria.id || ""
  );
  const [descripcion, setDescripcion] = useState(
    productoEditar?.descripcion || ""
  );
  const [stock, setStock] = useState(productoEditar?.stock || "");
  const [umbralMinimo, setUmbralMinimo] = useState(
    productoEditar?.umbral_minimo || ""
  );
  const [mensaje, setMensaje] = useState("");

  // Aquí defines tu array de IDs (1…5 por ejemplo)
  const categoriaOptions = [1, 2, 3, 4, 5];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const payload = {
      nombre: nombre.trim(),
      codigo: codigo.trim(),
      precio: parseFloat(precio),
      categoria_id: Number(categoriaId),
      descripcion: descripcion.trim(),
      stock: Number(stock),
      umbral_minimo: Number(umbralMinimo),
    };

    if (!payload.nombre || !payload.codigo) {
      setMensaje("Nombre y código son obligatorios.");
      return;
    }
    if (payload.precio <= 0) {
      setMensaje("El precio debe ser mayor a cero.");
      return;
    }
    if (payload.stock < 0 || payload.umbral_minimo < 0) {
      setMensaje("Stock y umbral mínimo no pueden ser negativos.");
      return;
    }

    try {
      if (productoEditar) {
        await updateProducto(productoEditar.id, payload);
      } else {
        await createProducto(payload);
      }
      setMensaje("✅ Producto guardado correctamente.");
    } catch (err) {
      const errorData = err.response?.data;
      setMensaje(
        errorData
          ? Object.values(errorData).flat().join(" ")
          : "Error inesperado al guardar."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">
        {productoEditar ? "Editar Producto" : "Crear Producto"}
      </h2>

      <div>
        <label className="block mb-1">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Código</label>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Precio</label>
        <input
          type="number"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Categoría ID</label>
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">-- Selecciona --</option>
          {categoriaOptions.map((_, idx) => (
            <option key={idx} value={categoriaOptions[idx]}>
              {idx + 1}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Umbral mínimo</label>
        <input
          type="number"
          value={umbralMinimo}
          onChange={(e) => setUmbralMinimo(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {productoEditar ? "Actualizar" : "Registrar"}
      </button>

      {mensaje && <p className="mt-4 text-center text-red-600">{mensaje}</p>}
    </form>
  );
};

export default FormularioProducto;
