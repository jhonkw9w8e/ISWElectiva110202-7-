import React, { useState } from "react";
import TransferenciaForm from "../components/TransferenciaForm";
import TransferenciaList from "../components/TransferenciaList";

export default function TransferenciasPage() {
  const [actualizar, setActualizar] = useState(false);

  const handleNueva = () => {
    setActualizar((u) => !u);
  };

  return (
    <main className="p-4 bg-[#CCE6CC] min-h-screen">
      <TransferenciaForm onNuevaTransferencia={handleNueva} />
      <TransferenciaList key={actualizar} />
    </main>
  );
}
