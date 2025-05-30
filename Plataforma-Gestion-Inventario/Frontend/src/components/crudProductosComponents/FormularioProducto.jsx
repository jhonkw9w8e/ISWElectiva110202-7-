import React, { useState, useEffect } from "react";
import {
  createProducto,
  updateProducto,
  deshacerEliminacion,
} from "../../services/crudServicesProducto/productoService";

export default function FormularioProducto({ productoEditar, onSaved }) {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [umbralMinimo, setUmbralMinimo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const categoriaOptions = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (productoEditar) {
      setNombre(productoEditar.nombre || "");
      setCodigo(productoEditar.codigo || "");
      setPrecio(productoEditar.precio || "");
      setCategoriaId(productoEditar.categoria?.id || "");
      setDescripcion(productoEditar.descripcion || "");
      setStock(productoEditar.stock || "");
      setUmbralMinimo(productoEditar.umbral_minimo || "");
    }
  }, [productoEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    const data = {
      nombre: nombre.trim(),
      codigo: codigo.trim(),
      precio: parseFloat(precio),
      categoria_id: Number(categoriaId),
      descripcion: descripcion.trim(),
      stock: Number(stock),
      umbral_minimo: Number(umbralMinimo),
    };
    if (!data.nombre || !data.codigo) {
      setMensaje("Nombre y código son obligatorios.");
      return;
    }
    if (data.precio <= 0) {
      setMensaje("El precio debe ser mayor a cero.");
      return;
    }
    if (data.stock < 0 || data.umbral_minimo < 0) {
      setMensaje("Stock y umbral mínimo no pueden ser negativos.");
      return;
    }
    try {
      if (productoEditar) {
        await updateProducto(productoEditar.id, data);
        if (onSaved) onSaved();
      } else {
        await createProducto(data);
        if (onSaved) onSaved();
      }
      setMensaje("✅ Operación completada correctamente.");
    } catch (err) {
      const errData = err.response?.data;
      setMensaje(
        errData
          ? Object.values(errData).flat().join(" ")
          : "Error inesperado en la operación."
      );
    }
  };

  const handleRevertir = async () => {
    if (!productoEditar?.id) return;
    try {
      await deshacerEliminacion([productoEditar.id]);
      if (onSaved) onSaved();
      setMensaje("Producto Guardado correctamente.");
    } catch {
      setMensaje("Error, vuelva a intentarlo.");
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
        <label className="block mb-1">Categoría</label>
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">-- Selecciona --</option>
          {categoriaOptions.map((id) => (
            <option key={id} value={id}>
              {id}
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

      {productoEditar?.eliminado_temporal && (
        <button
          type="button"
          onClick={handleRevertir}
          className="w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500"
        >
          Revertir Eliminación
        </button>
      )}

      {mensaje && <p className="mt-4 text-center text-red-600">{mensaje}</p>}
    </form>
  );
}
