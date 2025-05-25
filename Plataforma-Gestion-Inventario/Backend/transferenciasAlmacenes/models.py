from django.db import models

# Create your models here.
class Almacen(models.Model):
    nombre = models.CharField(max_length=100)
    ubicacion = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.nombre