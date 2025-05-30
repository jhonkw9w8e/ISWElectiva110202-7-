import React from "react";
import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import RegistrarProducto from "./pages/crudProductosPages/RegistrarProducto";
import ActualizarStock from "./pages/crudProductosPages/ActualizarStock";
import BusquedadeProductos from "./pages/crudProductosPages/BusquedaProductos";
import RegistrarUsuario from "./pages/crudUsuariosPages/RegistrarUsuario";
import Movimientos from "./pages/crudMovimientosPages/MovimientosPage";

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
        <Route path="/actualizar-stock" element={<ActualizarStock />} />
        <Route path="/busqueda-productos" element={<BusquedadeProductos />} />
        <Route path="/registrar-usuario" element={<RegistrarUsuario />} />
        <Route path="/movimientos" element={<Movimientos />} />
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
