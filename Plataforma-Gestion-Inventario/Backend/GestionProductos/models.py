from django.db import models
from django.conf import settings
# Create your models here.

class CategoriaProducto(models.Model):
    nombre = models.CharField(max_length=100)
    def __str__(self):
        return self.nombre
    

class Producto(models.Model):
    nombre = models.CharField(max_length=150)
    codigo = models.CharField(max_length=50, unique=True)
    categoria = models.ForeignKey(CategoriaProducto, on_delete=models.CASCADE, related_name='productos')
    descripcion = models.CharField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    umbral_minimo = models.PositiveIntegerField(default=0)
    creado_por = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL, null=True, related_name='+')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    modificado_por = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL, null=True,related_name='+')
    fecha_modifico = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.codigo}-{self.nombre}"