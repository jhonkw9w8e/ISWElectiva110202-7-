from rest_framework import serializers
from ..models.TipoMovimiento import TipoMovimiento

class TipoMovimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoMovimiento
        fields = '__all__'