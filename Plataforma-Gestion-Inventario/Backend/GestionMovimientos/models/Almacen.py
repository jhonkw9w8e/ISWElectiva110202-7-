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
