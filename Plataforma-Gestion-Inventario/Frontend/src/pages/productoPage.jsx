import React, { useEffect, useState } from "react";
import {
  fetchProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  fetchCategorias,
} from "../services/productoService";

export default function ProductoPage() {
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    categoria_id: "",
    descripcion: "",
    precio: "",
    stock: "",
    umbral_minimo: "",
  });
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchProductos().then(setProductos);
    fetchCategorias().then(setCategorias);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProducto({
        ...form,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock),
        umbral_minimo: parseInt(form.umbral_minimo),
      });
      const lista = await fetchProductos();
      setProductos(lista);
      setForm({
        codigo: "",
        nombre: "",
        categoria_id: "",
        descripcion: "",
        precio: "",
        stock: "",
        umbral_minimo: "",
      });
    } catch (err) {
      alert(err.response?.data?.codigo || "Error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Registro / Edición de Productos
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: "Código", name: "codigo", type: "text" },
          { label: "Nombre", name: "nombre", type: "text" },
          { label: "Descripción", name: "descripcion", type: "text" },
          { label: "Precio", name: "precio", type: "number" },
          { label: "Stock", name: "stock", type: "number" },
          { label: "Umbral", name: "umbral_minimo", type: "number" },
        ].map((f) => (
          <div key={f.name}>
            <label className="block">{f.label}</label>
            <input
              name={f.name}
              type={f.type}
              value={form[f.name]}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
        ))}
        <div>
          <label className="block">Categoría</label>
          <select
            name="categoria_id"
            value={form.categoria_id}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="">--</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2 flex space-x-4 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={() =>
              setForm({
                codigo: "",
                nombre: "",
                categoria_id: "",
                descripcion: "",
                precio: "",
                stock: "",
                umbral_minimo: "",
              })
            }
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {["Código", "Nombre", "Cat.", "Stock", "Precio", "Acciones"].map(
              (h) => (
                <th key={h} className="border p-2">
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.codigo}</td>
              <td className="border p-2">{p.nombre}</td>
              <td className="border p-2">{p.categoria.nombre}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2">{p.precio}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() =>
                    setForm({
                      codigo: p.codigo,
                      nombre: p.nombre,
                      descripcion: p.descripcion,
                      precio: p.precio,
                      stock: p.stock,
                      umbral_minimo: p.umbral_minimo,
                      categoria_id: p.categoria.id,
                    })
                  }
                  className="text-green-600"
                >
                  Editar
                </button>
                <button
                  onClick={async () => {
                    await deleteProducto(p.id);
                    setProductos(await fetchProductos());
                  }}
                  className="text-red-600"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
