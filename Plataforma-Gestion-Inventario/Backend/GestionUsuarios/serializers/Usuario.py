from rest_framework import serializers
from ..models.Usuario import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario 
        fields = '__all__'