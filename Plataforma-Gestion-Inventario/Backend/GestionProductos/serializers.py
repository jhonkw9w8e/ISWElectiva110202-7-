from rest_framework import serializers
from .models import CategoriaProducto,Producto

class CategoriaProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaProducto
        fields = ['id','nombre']

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaProductoSerializer(read_only=True)
    categoria_id = serializers.PrimaryKeyRelatedField(queryset=CategoriaProducto.objects.all(),source='categoria',write_only=True)
    creado_por = serializers.StringRelatedField(read_only=True)
    modificado_por = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Producto
        fields = ['id','codigo','nombre','descripcion','precio','stock','umbral_minimo','categoria','modificado_por','fecha_modifico']
        
        def validate_codigo(self,valor):
            qs = Producto.objects.filter(codigo__iexact=valor)
            if self.instance:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise serializers.ValidationError("Ya existe un producto con ese codigo")
            return valor
        
        def validate_precio(self,valor):
            if valor <= 0:
                raise serializers.ValidationError("El precio debe ser mayor que cero.")
            return valor
        
        def validate_stock(self,valor):
            if valor < 0:
                raise serializers.ValidationError("El stock no puede ser negativo.")
            return valor
        
        def validate_umbral_minimo(self,valor):
            if valor < 0:
                raise serializers.ValidationError("El umbral mínimo no puede ser negativo.")
            return valor
        