from rest_framework import serializers
from ..models.Transferencia import Transferencia
from ..models.Almacen import Almacen
from ..serializers.Almacen import AlmacenSerializer
from GestionProductos.serializers import ProductoSerializer
from GestionProductos.models import Producto
from GestionUsuarios.models import Usuario
from GestionUsuarios.serializers import UsuarioSerializer

class TransferenciaSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(),source='producto',write_only=True
    )
    
    almacen_origen = AlmacenSerializer(read_only=True)
    almacen_origen_id = serializers.PrimaryKeyRelatedField(
        queryset = Almacen.objects.all(),source='almacen_origen',write_only=True
    )
    
    almacen_destino = AlmacenSerializer(read_only=True)
    almacen_destino_id = serializers.PrimaryKeyRelatedField(
        queryset = Almacen.objects.all(),source='almacen_destino',write_only=True
    )
    
    usuario = UsuarioSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset= Usuario.objects.all(),source='usuario',write_only=True
    )
    
    class Meta:
        model = Transferencia
        fields = [
            'id', 'producto', 'producto_id',
            'almacen_origen', 'almacen_origen_id',
            'almacen_destino', 'almacen_destino_id',
            'cantidad', 'fecha',
            'usuario', 'usuario_id',
            'comentario',
        ]
    