import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getUsuarios = () => {
  return axios.get(`${API_URL}/usuario/usuarios/`);
};

export const getUsuarioById = (id) => {
  return axios.get(`${API_URL}/usuario/usuarios/${id}/`);
};

export const createUsuario = (data) => {
  return axios.post(`${API_URL}/usuario/usuarios/`, data);
};

export const updateUsuario = (id, data) => {
  return axios.get(`${API_URL}usuarios/${id}/`, data);
};

export const deleteUsuario = (id) => {
  return axios.get(`${API_URL}usuarios/${id}/`);
};
