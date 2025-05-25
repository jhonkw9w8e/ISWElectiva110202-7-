import axios from "axios";
const API = import.meta.env.VITE_API_URL + "/producto";

export const fetchProductos = () =>
  axios.get(`${API}/productos/`).then((r) => r.data);

export const createProducto = (data) =>
  axios.post(`${API}/productos/`, data).then((r) => r.data);

export const updateProducto = (id, data) =>
  axios.put(`${API}/productos/${id}/`, data).then((r) => r.data);

export const deleteProducto = (id) => axios.delete(`${API}/productos/${id}/`);

export const fetchCategorias = () =>
  axios.get(`${API}/categorias/`).then((r) => r.data);
