import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getInformes = () => axios.get(`${API_URL}/informe/informes/`);
export const getInformeById = (id) =>
  axios.get(`${API_URL}/informe/informes/${id}/`);
export const createInforme = (data) =>
  axios.post(`${API_URL}/informe/informes/`, data);
export const updateInforme = (id, data) =>
  axios.put(`${API_URL}/informe/informes/${id}/`, data);
export const deleteInforme = (id) =>
  axios.delete(`${API_URL}/informe/informes/${id}/`);
