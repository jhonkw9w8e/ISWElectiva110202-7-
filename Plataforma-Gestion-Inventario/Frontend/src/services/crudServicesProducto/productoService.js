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

export const updateProducto = async (id, productoData) => {
  try {
    const response = await axios.put(
      `${API_URL}/producto/productos/${id}/`,
      productoData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar el producto",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const deleteProducto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/producto/productos/${id}/`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar el producto",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getProductoPorCategoria = async (categoriaId) => {
  const response = await axios.get(
    `${API_URL}/stock/actualizar/?categoriaId=${categoriaId}`
  );
  if (response.status !== 200) {
    throw new Error("No se pudo obtener los productos para esta categoría");
  }

  return response.data;
};

export const buscarProducto = async (query) => {
  const response = await axios.get(`${API_URL}/productos/buscar/?q=${query}`);
  return response.data;
};
