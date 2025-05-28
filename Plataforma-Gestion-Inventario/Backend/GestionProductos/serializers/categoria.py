from rest_framework import serializers
from ..models.categoria import CategoriaProducto

class CategoriaProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaProducto
        fields=['id','nombre']
    