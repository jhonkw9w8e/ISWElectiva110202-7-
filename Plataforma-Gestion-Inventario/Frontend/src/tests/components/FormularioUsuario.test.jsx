import { render, screen, fireEvent } from "@testing-library/react";
import FormularioUsuario from "../../components/FormularioUsuario";

describe("FormularioUsuario", () => {
  it("muestra mensaje si contraseña es muy corta", async () => {
    render(<FormularioUsuario />);
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText("Guardar"));
    expect(
      await screen.findByText(/La contraseña debe tener al menos 8 caracteres/)
    ).toBeInTheDocument();
  });
});
