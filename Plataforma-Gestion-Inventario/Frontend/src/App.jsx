import React from "react";
import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import RegistrarProducto from "./pages/crudProductosPages/RegistrarProducto";

const App = () => {
  return (
    <div className="bg-[#CCE6CC]">
      <h1 className="flex justify-center items-center">
        Plataforma de Gestion de Inventario de Almacen
      </h1>
      <p className="flex justify-center items-center">
        Bienvenido a nuestra Plataforma de Gestion de Inventario de Almacen
      </p>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/crear-producto" element={<RegistrarProducto />} />
      </Routes>
      <div>
        <p>
          Aqui encontramos nuestro sistema de Gestion de Inventario de productos
          de Almacen
        </p>
      </div>
    </div>
  );
};

export default App;
