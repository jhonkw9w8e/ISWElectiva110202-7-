import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getTiposMovimiento = () =>
  axios.get(`${API_URL}/movimiento/tipos/`);
export const createTipoMovimiento = (data) =>
  axios.post(`${API_URL}/movimiento/tipos/`, data);
