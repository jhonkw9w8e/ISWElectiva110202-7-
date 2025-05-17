import React from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const getHistorialTransferenciasService = async () => {
  const response = await axios.get(`${API_URL}/movimiento/movimientos/`);
  const data = response.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.resultados;
  }

  if (Array.isArray(data)) {
    return data.movimientos;
  }

  return [];
};
