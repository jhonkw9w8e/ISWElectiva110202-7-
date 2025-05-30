from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import models
from ..models.TipoMovimiento import TipoMovimiento
from ..serializers.TipoMovimiento import TipoMovimientoSerializer

class TipoMovimientoAPIView(APIView):
    def ger(self,request,pk=None):
        if pk:
            try:
                tipo = TipoMovimiento.objects.get(pk=pk)
                serializer = TipoMovimientoSerializer(tipo)
                return Response(serializer.data)
            except TipoMovimiento.DoesNotExist:
                return Response({"error":"Tipo de movimiento no encontrado."},status=status.HTTP_404_NOT_FOUND)
        tipos = TipoMovimiento.objects.all()
        serializer = TipoMovimientoSerializer(tipos,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = TipoMovimientoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,pk):
        try:
            tipo = TipoMovimiento.objects.get(pk=pk)
        except TipoMovimiento.DoesNotExist:
            return Response({"error":"Tipo de movimiento no encontrado."},status=status.HTTP_404_NOT_FOUND)
        serializer = TipoMovimientoSerializer(tipo,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
