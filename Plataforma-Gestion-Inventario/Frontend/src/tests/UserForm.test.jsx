import { render, screen } from "@testing-library/react";
import UserForm from "../components/UserForm";
import { describe, it, expect } from "vitest";

describe("UserForm", () => {
  it("muestra campos de usuario", () => {
    render(<UserForm />);
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
  });
});
