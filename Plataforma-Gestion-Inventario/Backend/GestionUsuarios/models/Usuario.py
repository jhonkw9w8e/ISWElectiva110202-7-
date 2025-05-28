from django.db import models

class Usuario(models.Model):
    ROL_CHOICES = [
        ('admin','Administrador'),
        ('encargado','Encargado de Almacen'),
        ('consulta','Usuario de Consulta'),
    ]
    
    nombre_usuario=models.CharField(max_length=50,unique=True)
    nombre_completo = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    rol = models.CharField(max_length=20, choices=ROL_CHOICES, default='consulta')
    activo = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.nombre_usuario} ({self.get_rol_display()})"
    