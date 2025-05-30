from django.db import models
from GestionUsuarios.models import Usuario

class Informe(models.Model):
    nombre_informe = models.CharField(max_length=100)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    autor = models.ForeignKey(Usuario, on_delete=models.SET_NULL,null=True)
    descripcion = models.TextField(blank=True)
    tipo = models.CharField(max_length=50,choices=[('PDF','PDF'),('CSV','CSV')],default='PDF')
    
    def __str__(self):
        return f"{self.nombre_informe} ({self.tipo})"
    
    