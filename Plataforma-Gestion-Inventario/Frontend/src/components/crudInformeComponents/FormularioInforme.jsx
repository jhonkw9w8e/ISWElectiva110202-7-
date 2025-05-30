import React, { useEffect, useState } from "react";
import {
  getInformes,
  createInforme,
  deleteInforme,
} from "../../services/crudServicesInforme/InformeService";

const FormularioInforme = () => {
  const [informes, setInformes] = useState([]);
  const [form, setForm] = useState({
    nombre_informe: "",
    descripcion: "",
    tipo: "PDF",
    autor: 1,
  });

  useEffect(() => {
    cargarInformes();
  }, []);

  const cargarInformes = async () => {
    const res = await getInformes();
    setInformes(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createInforme(form);
    setForm({ nombre_informe: "", descripcion: "", tipo: "PDF", autor: 1 });
    cargarInformes();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar informe?")) return;
    await deleteInforme(id);
    cargarInformes();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Informe</h2>
      <form onSubmit={handleSubmit} className="space-y-4 my-4">
        <input
          name="nombre_informe"
          value={form.nombre_informe}
          onChange={handleChange}
          placeholder="Nombre del informe"
          className="border p-2 w-full"
          required
        />
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="border p-2 w-full"
        />
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="PDF">PDF</option>
          <option value="CSV">CSV</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Crear Informe
        </button>
      </form>

      <table className="w-full border mt-4">
        <thead>
          <tr>
            <th className="border px-2">ID</th>
            <th className="border px-2">Nombre</th>
            <th className="border px-2">Tipo</th>
            <th className="border px-2">Fecha</th>
            <th className="border px-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {informes.map((i) => (
            <tr key={i.id}>
              <td className="border px-2">{i.id}</td>
              <td className="border px-2">{i.nombre_informe}</td>
              <td className="border px-2">{i.tipo}</td>
              <td className="border px-2">{i.fecha_creacion}</td>
              <td className="border px-2">
                <button
                  onClick={() => handleDelete(i.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormularioInforme;
