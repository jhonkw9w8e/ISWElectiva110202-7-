import React, { useState, useEffect } from "react";
import { getTransferencias } from "../services/transferenciaService";

const TransferenciaList = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await getTransferencias();
      setLista(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">
        Historial de Transferencias
      </h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Producto</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Origen</th>
            <th className="p-2 border">Destino</th>
            <th className="p-2 border">Usuario</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((t) => (
            <tr key={t.id}>
              <td className="p-2 border">
                {new Date(t.fecha).toLocaleString()}
              </td>
              <td className="p-2 border">{t.producto.nombre}</td>
              <td className="p-2 border">{t.cantidad}</td>
              <td className="p-2 border">{t.origen.nombre}</td>
              <td className="p-2 border">{t.destino.nombre}</td>
              <td className="p-2 border">{t.usuario?.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransferenciaList;
