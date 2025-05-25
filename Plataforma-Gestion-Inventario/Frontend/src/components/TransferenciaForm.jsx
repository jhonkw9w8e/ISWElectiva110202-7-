import React, { useState, useEffect } from "react";
import {
  getAlmacenes,
  getProductos,
  getUsuarios,
  createTransferencia,
} from "../services/transferenciaService";

const TransferenciaForm = ({ onNuevaTransferencia }) => {
  const [almacenes, setAlmacenes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [productoId, setProductoId] = useState("");
  const [origenId, setOrigenId] = useState("");
  const [destinoId, setDestinoId] = useState("");
  const [cantidad, setCantidad] = useState("");

  useEffect(() => {
    getAlmacenes().then(setAlmacenes);
    getProductos().then(setProductos);
    getUsuarios().then(setUsuarios);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productoId || !origenId || !destinoId || !cantidad) {
      return alert("Completa todos los campos");
    }
    if (origenId === destinoId) {
      return alert("Origen y destino deben ser distintos");
    }
    const data = {
      producto_id: productoId,
      origen_id: origenId,
      destino_id: destinoId,
      cantidad: parseInt(cantidad, 10),
      usuario_id: usuarios[0]?.id, // o toma el usuario logueado
    };
    try {
      const nueva = await createTransferencia(data);
      onNuevaTransferencia(nueva);
      setProductoId("");
      setOrigenId("");
      setDestinoId("");
      setCantidad("");
    } catch (err) {
      console.error(err);
      alert("Error al registrar transferencia");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Registrar Transferencia</h2>

      <div>
        <label>Producto:</label>
        <select
          value={productoId}
          onChange={(e) => setProductoId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- selecciona --</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} (stock: {p.stock})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Almacén Origen:</label>
          <select
            value={origenId}
            onChange={(e) => setOrigenId(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">-- origen --</option>
            {almacenes.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Almacén Destino:</label>
          <select
            value={destinoId}
            onChange={(e) => setDestinoId(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">-- destino --</option>
            {almacenes.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Registrar
      </button>
    </form>
  );
};

export default TransferenciaForm;
