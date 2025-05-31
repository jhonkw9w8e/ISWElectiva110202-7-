import React from "react";
import FormularioProducto from "../../components/crudProductosComponents/FormularioProducto";
import { Link } from "react-router-dom";
export default function RegistrarProducto() {
  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-[#CCE6CC]">
      <div>
        <nav className="relative border-2 bg-[#fac28d] p-2 rounded-md">
          <ul className="flex flex-wrap justify-center gap-4 py-2">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/crear-producto">Crear Producto</Link>
            </li>
            <li>
              <Link to="/actualizar-stock">Actualizar stock</Link>
            </li>
            <li>
              <Link to="/busqueda-productos">Buscar Productos</Link>
            </li>
            <li>
              <Link to="/registrar-usuario">Registrar Usuario</Link>
            </li>
            <li>
              <Link to="/informe">Formulario Informe</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <FormularioProducto />
      </div>
    </main>
  );
}
