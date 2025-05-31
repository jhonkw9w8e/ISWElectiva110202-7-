from django.db import models 
from GestionProductos.models import Producto
from GestionUsuarios.models import Usuario

class Almacen(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    ubicacion = models.CharField(max_length=200, blank=True)
    responsable = models.ForeignKey(
        Usuario, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='almacenes_responsable'
    )

    def __str__(self):
        return self.nombre
    
class Transferencia(models.Model):
    producto = models.ForeignKey(
        Producto, on_delete=models.CASCADE, related_name='transferencias'
    )
    almacen_origen = models.ForeignKey(
        Almacen, on_delete=models.CASCADE, related_name='salidas'
    )
    almacen_destino = models.ForeignKey(
        Almacen, on_delete=models.CASCADE, related_name='entradas'
    )
    cantidad = models.PositiveIntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(
        Usuario, on_delete=models.SET_NULL, null=True, related_name='transferencias'
    )
    comentario = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.producto.nombre} ({self.cantidad}) {self.almacen_origen}→{self.almacen_destino}"
