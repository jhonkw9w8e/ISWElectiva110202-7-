from rest_framework import serializers
from ..models import Almacen
from GestionUsuarios.models import Usuario
from GestionUsuarios.serializers import UsuarioSerializer

class AlmacenSerializer(serializers.ModelSerializer):
    responsable = UsuarioSerializer(read_only=True)
    responsable_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), source='responsable',write_only=True, allow_null =True
    )
    class Meta:
        model = Almacen
        fields =['id','nombre','ubicacion','responsable','responsable_id']
    