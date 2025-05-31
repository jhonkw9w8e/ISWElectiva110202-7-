from django.db import models
from django.conf import settings
from .categoria import CategoriaProducto

class Producto(models.Model):
    nombre = models.CharField(max_length=150)
    codigo = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        help_text="Codigo unico para cada producto"
    )
    categoria = models.ForeignKey(
        CategoriaProducto,
        on_delete=models.CASCADE,
        related_name='productos'
    )
    descripcion = models.CharField(max_length=255,blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    umbral_minimo = models.PositiveIntegerField(default=0)
    ubicacion = models.CharField(
        max_length=100,
        blank=True,
        help_text="Almacen del producto"
    )
    eliminado = models.BooleanField(default=False)
    eliminado_temporal = models.BooleanField(default=0)
    eliminado_at = models.DateTimeField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        editable=False,
        related_name='productos_actualizados'
    )
    updated_at = models.DateTimeField(auto_now=True)

    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        editable=False,
        related_name='productos_modificados'
    )

    
    def __str__(self):
        return self.nombre
    
    