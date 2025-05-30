import React from "react";
import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import RegistrarProducto from "./pages/crudProductosPages/RegistrarProducto";
import ActualizarStock from "./pages/crudProductosPages/ActualizarStock";
import BusquedadeProductos from "./pages/crudProductosPages/BusquedaProductos";
import RegistrarUsuario from "./pages/crudUsuariosPages/RegistrarUsuario";
import Movimientos from "./pages/crudServicesPages/MovimientosPage";
import FormularioInforme from "./components/crudInformeComponents/FormularioInforme";
import Transferencia from "./pages/crudTransferenciasPages/Transferencia";

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
        <Route path="/informe" element={<FormularioInforme />} />
        <Route path="/transferencias" element={<Transferencia />} />
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
