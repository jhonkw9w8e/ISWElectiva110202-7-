import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const createProducto = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/gestion-productos/productos/`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProducto = async () => {
  try {
    const response = await axios.get(`${API_URL}/gestion-productos/productos/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProducto = async (id, data) => {
  try {
    const response = await axios.put(
      `${API_URL}/gestion-productos/productos${id}/`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProducto = async (ids) => {
  try {
    const response = await axios.delete(
      `${API_URL}/gestion-productos/producto`,
      { data: { ids } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deshacerEliminacion = async (ids) => {
  try {
    const response = await axios.post(
      `${API_URL}/gestion-productos/deshacer-eliminación/`,
      { ids }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const confirmarEliminacion = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/gestion-productos/productos/confirmar-eliminacion/`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
