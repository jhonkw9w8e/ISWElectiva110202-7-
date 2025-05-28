import React, { useEffect, useState } from "react";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuarioById,
} from "../../services/crudServicesUsuario/usuarioService";

const roles = ["Administrador", "Encargado de Almacén", "Usuario de Consulta"];

const FormularioUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    rol: "Usuario de Consulta",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchUsuarios = async () => {
    try {
      const res = await getUsuarios();
      setUsuarios(res.data);
    } catch (err) {
      setError("Error al cargar los usuarios.");
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateUsuario(editId, formData);
        setEditId(null);
      } else {
        await createUsuario(formData);
      }
      setFormData({ nombre: "", email: "", rol: "Usuario de Consulta" });
      fetchUsuarios();
    } catch (err) {
      setError("Error al guardar el usuario.");
    }
  };

  const handleEdit = async (id) => {
    const res = await getUsuarioById(id);
    setFormData(res.data);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar este usuario?")) {
      await deleteUsuario(id);
      fetchUsuarios();
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Gestión de Usuarios</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {roles.map((rol) => (
            <option key={rol} value={rol}>
              {rol}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Actualizar" : "Crear"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Rol</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td className="border px-4 py-2">{u.id}</td>
              <td className="border px-4 py-2">{u.nombre}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.rol}</td>
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

export default FormularioUsuario;
