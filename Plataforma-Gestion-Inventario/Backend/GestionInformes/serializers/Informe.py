from rest_framework import serializers
from ..models.Informe import Informe

class InformeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Informe
        fields = '__all__'