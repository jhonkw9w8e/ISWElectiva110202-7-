from django.db import models
from GestionProductos.models import Producto
from GestionUsuarios.models import Usuario
from ..models import TipoMovimiento

class MovimientoStock(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="movimientos")
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name="movimientos_realizados")
    tipo_movimiento = models.ForeignKey(TipoMovimiento, on_delete=models.PROTECT)
    cantidad = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    observaciones = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.tipo_movimiento.nombre} de {self.producto.nombre} - {self.cantidad}"