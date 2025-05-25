export function validarCodigo(codigo, productosExistentes = []) {
  if (productosExistentes.some((p) => String(p.codigo) === String(codigo))) {
    return { valido: false, mensaje: "El codigo ya existe" };
  }
  if (!isNaN(codigo) && parseFloat(codigo) < 0) {
    return { valido: false, mensaje: "El valor debe ser mayor que cero" };
  }
  return { valido: true, mensaje: "Codigo Disponible" };
}
