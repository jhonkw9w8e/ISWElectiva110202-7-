import axios from "axios";

const BASE_URL =
  "https://plataforma-gestion-inventario-a3affwf6bhesabak.canadacentral-01.azurewebsites.net/api/producto/categorias/";

export const crearCategoria = async (datosCategoria) => {
  try {
    const response = await axios.post(BASE_URL, datosCategoria);
    return response.data;
  } catch (error) {
    throw error;
  }
};
