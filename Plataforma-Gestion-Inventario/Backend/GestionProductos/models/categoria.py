from django.db import models

class CategoriaProducto(models.model):
    nombre = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre
    