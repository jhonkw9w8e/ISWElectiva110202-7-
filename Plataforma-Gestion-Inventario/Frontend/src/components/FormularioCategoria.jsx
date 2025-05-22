import React, { useState } from "react";
import { crearCategoria } from "../services/registroCategoriaProducto";

const FormularioCategoria = () => {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      await crearCategoria({ nombre });
      setMensaje("✅ Categoría creada correctamente.");
      setNombre("");
    } catch (err) {
      console.error(err);
      setError("❌ Error al crear la categoría.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-bold mb-4 text-center">
        Crear Nueva Categoría
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block font-semibold mb-1">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Crear Categoría
        </button>
      </form>

      {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default FormularioCategoria;
