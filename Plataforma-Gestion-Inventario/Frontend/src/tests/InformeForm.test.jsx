import { render, screen } from "@testing-library/react";
import InformeForm from "../components/InformeForm";
import { describe, it, expect } from "vitest";

describe("InformeForm", () => {
  it("renderiza el formulario de informes", () => {
    render(<InformeForm />);
    expect(screen.getByText(/Generar Informe/i)).toBeInTheDocument();
  });
});
