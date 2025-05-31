import { render, screen } from "@testing-library/react";
import ProductForm from "../components/ProductForm";
import { describe, it, expect } from "vitest";

describe("ProductForm", () => {
  it("renderiza el formulario de productos", () => {
    render(<ProductForm />);
    expect(screen.getByText("Registrar Producto")).toBeInTheDocument();
  });
});
