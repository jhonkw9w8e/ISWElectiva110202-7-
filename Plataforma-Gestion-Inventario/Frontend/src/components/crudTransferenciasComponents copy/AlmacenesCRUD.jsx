import React, { useEffect, useState } from "react";
import {
  fetchAlmacenes,
  createAlmacen,
  updateAlmacen,
  deleteAlmacen,
} from "../../services/crudServicesTransferencia/transferenciasService";

export default function AlmacenesCRUD() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    ubicacion: "",
    responsable_id: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAlmacenes().then((res) => setLista(res.data));
  }, []);

  const reset = () => {
    setForm({ nombre: "", ubicacion: "", responsable_id: "" });
    setEditId(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateAlmacen(editId, form);
    } else {
      await createAlmacen(form);
    }
    const res = await fetchAlmacenes();
    setLista(res.data);
    reset();
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {editId ? "Editar" : "Nuevo"} Almacén
      </h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={form.ubicacion}
          onChange={(e) =>
            setForm((f) => ({ ...f, ubicacion: e.target.value }))
          }
          className="w-full p-2 border rounded"
        />
        {/* Podrías agregar selector de responsable */}
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {editId ? "Actualizar" : "Crear"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>

      <table className="mt-6 w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Ubicación</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((a) => (
            <tr key={a.id} className="even:bg-gray-50">
              <td className="border p-2">{a.nombre}</td>
              <td className="border p-2">{a.ubicacion}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => {
                    setForm(a);
                    setEditId(a.id);
                  }}
                  className="text-blue-600"
                >
                  ✎
                </button>
                <button
                  onClick={async () => {
                    await deleteAlmacen(a.id);
                    setLista(await fetchAlmacenes().then((r) => r.data));
                  }}
                  className="text-red-600"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
