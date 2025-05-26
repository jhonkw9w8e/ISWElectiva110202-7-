import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App";

describe("App component", () => {
  it("renders the app title", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(
      getByText("Plataforma de Gestión de Inventario de Almacen")
    ).toBeDefined();
    expect(
      getByText(
        "Bienvenido a nuestra Plataforma de Gestion de Inventario de Almacen"
      )
    ).toBeDefined();
  });
  it("renders routes correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(getByText(/Gestion de Inventario de Productos/i)).toBeDefined();
  });
});
