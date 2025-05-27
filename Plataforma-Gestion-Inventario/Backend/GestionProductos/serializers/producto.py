from rest_framework import serializers
from models import Producto
from .categoria import CategoriaProductoSerializer, CategoriaProducto

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaProductoSerializer(read_only=True)
    categoria_id = serializers.PrimaryKeyRelatedField(
        queryset = CategoriaProducto.objects.all(),
        source='categoria',
        write_only=True
    ) 
    created_by = serializers.StringRelatedField(read_only=True)
    updated_by = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Producto
        fields = [
            'id','nombre','codigo','categoria','categoria_id',
            'descripcion','precio','stock','umbral_minimo',
            'created_at','created_by','updated_at','updated_by'
        ]