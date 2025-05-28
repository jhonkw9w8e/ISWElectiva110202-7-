import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getUsuarios = () => {
  return axios.get(`${API_URL}usuarios/${id}/`);
};

export const getUsuarioById = () => {
  return axios.get(`${API_URL}usuarios/`, data);
};

export const createUsuario = () => {
  return axios.get(`${API_URL}usuarios/${id}/`, data);
};

export const updateUsuario = () => {
  return axios.get(`${API_URL}usuarios/${id}/`);
};

export const deleteUsuario = () => {
  return axios.get(`${API_URL}usuarios/${id}/`);
};
