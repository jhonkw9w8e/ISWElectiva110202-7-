from django.db import models

class TipoMovimiento(models.Model):
    nombre = models.CharField(max_length=20,unique=True)
    descripcion = models.TextField(blank=True,null=True)
    
    def __str__(self):
        return self.nombre.capitalize()
    