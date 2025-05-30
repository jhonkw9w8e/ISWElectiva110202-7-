import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getMovimientos = () =>
  axios.get(`${API_URL}/movimiento/movimientos/`);
export const getMovimientoById = (id) =>
  axios.get(`${API_URL}/movimiento/movimientos/${id}/`);
export const createMovimiento = (data) =>
  axios.post(`${API_URL}/movimiento/movimientos/`, data);
export const updateMovimiento = (id, data) =>
  axios.put(`${API_URL}/movimiento/movimientos/${id}/`, data);
export const deleteMovimiento = (id) =>
  axios.delete(`${API_URL}/movimiento/movimientos/${id}/`);
