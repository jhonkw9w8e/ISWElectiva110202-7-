from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from ..models.producto import Producto
from ..serializers.producto import ProductoSerializer

class ProductoAPIView(APIView):
    def get(self,request):
        productos = Producto.objects.select_related('categoria').filter(eliminado=False)
        serializer = ProductoSerializer(productos,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            if serializer.validated_data['stock'] < 0 or serializer.validated_data['umbral minimo'] < 0:
                raise ValidationError("El stock y el umbral mínimo deben ser mayores o iguales a cero.")
            if serializer.validated_data['precio'] <= 0:
                raise ValidationError("El precio debe ser mayor que cero.")
            serializer.save(created_by=request.user, updated_by=request.user)
