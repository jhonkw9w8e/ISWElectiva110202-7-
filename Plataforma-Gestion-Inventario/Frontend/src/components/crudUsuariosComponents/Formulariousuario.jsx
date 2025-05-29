import React, { useEffect, useState } from "react";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuarioById,
} from "../../services/crudServicesUsuario/UsuarioService";

const ROLES = [
  { value: "admin", label: "Administrador" },
  { value: "encargado", label: "Encargado de Almacen" },
  { value: "consulta", label: "Usuario de consulta" },
];

const FormularioUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    nombre_usuario: "",
    nombre_completo: "",
    correo: "",
    rol: "consulta",
    activo: true,
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const res = await getUsuarios();
      setUsuarios(res.data);
    } catch (error) {
      setError("No se pudieron cargar los usuarios.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.nombre_usuario.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres.");
      return;
    }
    if (!form.correo.includes("@")) {
      setError("Correo invalido.");
      return;
    }
    try {
      if (editId) {
        await updateUsuario(editId, form);
        setEditId(null);
      } else {
        await createUsuario(form);
      }
      setForm({
        nombre_usuario: "",
        nombre_completo: "",
        correo: "",
        rol: "consulta",
        activo: true,
      });
      await cargarUsuarios();
    } catch (error) {
      setError("Error al guardar el usuario.");
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getUsuarioById(id);
      setForm(res.data);
      setEditId(id);
      setError("");
    } catch (error) {
      setError("No se pudo cargar el usuario");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar este usuario?")) return;
    try {
      await deleteUsuario(id);
      await cargarUsuarios();
    } catch (error) {
      setError("Errror al eliminar al usuario");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block font-medium">Usuario*</label>
          <input
            name="nombre_usuario"
            value={form.nombre_usuario}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Nombre Completo*</label>
          <input
            name="nombre_completo"
            value={form.nombre_completo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Correo*</label>
          <input
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Rol*</label>
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <input
            name="activo"
            type="checkbox"
            checked={form.activo}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Activo</label>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Actualizar" : "Crear"}
        </button>
      </form>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {[
              "ID",
              "Usuario",
              "Nombre",
              "Correo",
              "Rol",
              "Activo",
              "Acciones",
            ].map((h) => (
              <th key={h} className="border px-4 py-2">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td className="border px-4 py-2">{u.id}</td>
              <td className="border px-4 py-2">{u.nombre_usuario}</td>
              <td className="border px-4 py-2">{u.nombre_completo}</td>
              <td className="border px-4 py-2">{u.correo}</td>
              <td className="border px-4 py-2">
                {ROLES.find((r) => r.value === u.rol)?.label || u.rol}
              </td>
              <td className="border px-4 py-2">{u.activo ? "Sí" : "No"}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(u.id)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
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
