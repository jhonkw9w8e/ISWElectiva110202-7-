import React, { useEffect, useState } from "react";
import {
  getMovimientos,
  createMovimiento,
  deleteMovimiento,
} from "../../services/crudServicesMovimientoStock/MovimientoStockService";
import { getTiposMovimiento } from "../../services/crudServicesTipoMovimiento/TipoMovimientoService";

const FormularioMovimientoStock = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({
    producto_id: "",
    tipo_movimiento: "",
    cantidad: 0,
    descripcion: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [movRes, tipoRes] = await Promise.all([
        getMovimientos(),
        getTiposMovimiento(),
      ]);
      setMovimientos(movRes.data);
      setTipos(tipoRes.data);
    } catch {
      setError("Error al cargar los datos.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.producto_id || !form.tipo_movimiento || form.cantidad <= 0) {
      setError(
        "Todos los campos son obligatorios y la cantidad debe ser mayor que 0."
      );
      return;
    }
    try {
      await createMovimiento(form);
      setForm({
        producto_id: "",
        tipo_movimiento: "",
        cantidad: 0,
        descripcion: "",
      });
      await cargarDatos();
    } catch {
      setError("Error al registrar el movimiento.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este movimiento?")) return;
    try {
      await deleteMovimiento(id);
      await cargarDatos();
    } catch {
      setError("Error al eliminar el movimiento.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Registrar Movimiento de Stock</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          name="producto_id"
          value={form.producto_id}
          onChange={handleChange}
          placeholder="ID Producto"
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="tipo_movimiento"
          value={form.tipo_movimiento}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Seleccionar tipo</option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </option>
          ))}
        </select>
        <input
          name="cantidad"
          type="number"
          value={form.cantidad}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full border p-2 rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Registrar
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Historial de Movimientos</h3>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2">ID</th>
            <th className="border px-2">Producto</th>
            <th className="border px-2">Tipo</th>
            <th className="border px-2">Cantidad</th>
            <th className="border px-2">Descripción</th>
            <th className="border px-2">Fecha</th>
            <th className="border px-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((m) => (
            <tr key={m.id}>
              <td className="border px-2">{m.id}</td>
              <td className="border px-2">{m.producto}</td>
              <td className="border px-2">
                {m.tipo_nombre || m.tipo_movimiento}
              </td>
              <td className="border px-2">{m.cantidad}</td>
              <td className="border px-2">{m.descripcion}</td>
              <td className="border px-2">{m.fecha || "-"}</td>
              <td className="border px-2">
                <button
                  onClick={() => handleDelete(m.id)}
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

export default FormularioMovimientoStock;
