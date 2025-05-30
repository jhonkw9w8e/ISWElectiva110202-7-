from rest_framework import serializers
from ..models.MovimientoStock import  MovimientoStock

class MovimientoStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovimientoStock
        fields = '__all__'