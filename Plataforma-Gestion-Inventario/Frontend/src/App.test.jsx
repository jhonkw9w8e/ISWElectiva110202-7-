import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "../../Frontend/src/App";
import { MemoryRouter } from "react-router-dom";

describe("App component", () => {
  test("renders the app title", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByText(
        "Bienvenido a nuestra Plataforma de Gestion de Inventario de Almacen"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Gestion de Inventario de Productos/i)
    ).toBeInTheDocument();
  });
});
