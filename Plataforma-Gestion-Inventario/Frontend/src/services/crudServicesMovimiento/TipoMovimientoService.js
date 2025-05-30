import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getTiposMovimiento = () =>
  axios.get(`${API_URL}/movimiento/tipos-movimiento/`);

export const createTipoMovimiento = (data) =>
  axios.post(`${API_URL}/movimiento/tipos-movimiento/`, data);

export const updateTipoMovimiento = (id, data) =>
  axios.put(`${API_URL}/movimiento/tipos-movimiento/${id}/`, data);

export const deleteTipoMovimiento = (id) =>
  axios.delete(`${API_URL}/movimiento/tipos-movimiento/${id}/`);
