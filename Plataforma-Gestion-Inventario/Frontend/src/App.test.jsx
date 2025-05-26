import { render, screen } from "@testing-library/react";
import App from "../../Frontend/src/App";
import { BrowserRouter } from "react-router-dom";

describe("App component", () => {
  it("renders the app title", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(
      screen.getByText(
        "Bienvenido a nuestra Plataforma de Gestion de Inventario de AppInventario"
      )
    ).toBeDefined();
  });
});
