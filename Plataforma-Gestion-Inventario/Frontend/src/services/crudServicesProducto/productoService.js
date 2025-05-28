import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const createProducto = async (data) => {
  const { data: res } = await axios.post(
    `${API_URL}/gestion-productos/productos/`,
    data
  );
  return res;
};

export const getProducto = async () => {
  const { data: res } = await axios.get(
    `${API_URL}/gestion-productos/productos/`
  );
  return res;
};

export const updateProducto = async (id, data) => {
  const { data: res } = await axios.put(
    `${API_URL}/gestion-productos/productos/${id}/`,
    data
  );
  return res;
};

export const deleteProducto = async (ids) => {
  const { data: res } = await axios.delete(
    `${API_URL}/gestion-productos/productos/`,
    { data: { ids } }
  );
  return res;
};

export const deshacerEliminacion = async (ids) => {
  const { data: res } = await axios.post(
    `${API_URL}/gestion-productos/productos/deshacer-eliminacion/`,
    { ids }
  );
  return res;
};

export const confirmarEliminacion = async () => {
  const { data: res } = await axios.post(
    `${API_URL}/gestion-productos/productos/confirmar-eliminacion/`
  );
  return res;
};

export const buscarProductos = async ({ q, categoria }) => {
  const params = {};
  if (q) params.q = q;
  if (categoria) params.categoria = categoria;
  const { data } = await axios.get(
    `${API_URL}/gestion-productos/productos/search/`,
    { params }
  );
  return data;
};
