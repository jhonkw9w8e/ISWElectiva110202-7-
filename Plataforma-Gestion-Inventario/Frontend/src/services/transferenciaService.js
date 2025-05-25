import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getTransferencias = async () => {
  const resp = await axios.get(`${API_URL}/transferencias/`);
  return resp.data;
};

export const createTransferencia = async (data) => {
  const resp = await axios.post(`${API_URL}/transferencias/`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return resp.data;
};

export const getAlmacenes = async () => {
  const resp = await axios.get(`${API_URL}/almacenes/`);
  return resp.data;
};

export const getProductos = async () => {
  const resp = await axios.get(`${API_URL}/producto/productos/`);
  return resp.data;
};

export const getUsuarios = async () => {
  const resp = await axios.get(`${API_URL}/usuario/usuarios/`);
  return resp.data;
};
