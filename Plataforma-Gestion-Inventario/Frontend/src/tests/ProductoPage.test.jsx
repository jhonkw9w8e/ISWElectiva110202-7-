import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductoPage from "./ProductoPage";
import * as svc from "../services/productoService";

jest.mock("../services/productoService");

describe("ProductoPage", () => {
  beforeEach(() => {
    svc.fetchProductos.mockResolvedValue([]);
    svc.fetchCategorias.mockResolvedValue([{ id: 1, nombre: "T" }]);
    svc.createProducto.mockResolvedValue({});
  });

  test("renderiza formulario y tabla vacía", async () => {
    render(<ProductoPage />);
    expect(
      screen.getByText(/Registro \/ Edición de Productos/)
    ).toBeInTheDocument();
    await waitFor(() => expect(svc.fetchProductos).toHaveBeenCalled());
  });

  test("validación de código duplicado", async () => {
    svc.createProducto.mockRejectedValue({
      response: { data: { codigo: ["error"] } },
    });
    render(<ProductoPage />);
    fireEvent.change(screen.getByLabelText(/Código/), {
      target: { value: "X" },
    });
    fireEvent.click(screen.getByText("Guardar"));
    await waitFor(() => screen.getByText("error"));
  });
});
