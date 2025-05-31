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
      setMensaje("Producto Registrado correctamente.");
    } catch (err) {
      const errData = err.response?.data;
      setMensaje(
        errData
          ? Object.values(errData).flat().join(" ")
          : "Error al registrar producto."
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
    <div className="min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-[#CCE6CC] border-2 border-black rounded-lg p-6">
        <div className="bg-[#E5E5E5] border border-black rounded-lg p-4 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">
              {productoEditar ? "Editar Producto" : "Crear Producto"}
            </h2>

            <div>
              <label className="block font-bold mb-1 text-black">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-2 h-10 bg-[#D9D9D9] border border-black rounded"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-black">Código</label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="w-full px-2 h-10 bg-[#D9D9D9] border border-black rounded"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-black">Precio</label>
              <input
                type="number"
                step="0.01"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="w-full px-2 h-10 bg-[#D9D9D9] border border-black rounded"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-black">
                Categoría
              </label>
              <select
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                className="w-full px-2 h-10 bg-[#D9D9D9] border border-black rounded"
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
              <label className="block font-bold mb-1 text-black">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-2 h-10 bg-[#D9D9D9] border border-black rounded"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-black">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-2 h-10 bg-[#D9D9D9] border border-black rounded"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-black">
                Umbral mínimo
              </label>
              <input
                type="number"
                value={umbralMinimo}
                onChange={(e) => setUmbralMinimo(e.target.value)}
                className="w-full px-2 h-10 bg-[#D9D9D9] border border-black rounded"
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

            {mensaje && (
              <p className="mt-4 text-center text-red-600">{mensaje}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
