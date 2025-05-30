from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from ..models.Almacen import Almacen
from ..serializers.Almacen import AlmacenSerializer


class AlmacenListCreateAPIView(APIView):
    def get(self, request):
        almacenes = Almacen.objects.all()
        serializer = AlmacenSerializer(almacenes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AlmacenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AlmacenDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Almacen.objects.get(pk=pk)
        except Almacen.DoesNotExist:
            return None

    def get(self, request, pk):
        almacen = self.get_object(pk)
        if not almacen:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = AlmacenSerializer(almacen)
        return Response(serializer.data)

    def put(self, request, pk):
        almacen = self.get_object(pk)
        if not almacen:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = AlmacenSerializer(almacen, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        almacen = self.get_object(pk)
        if not almacen:
            return Response(status=status.HTTP_404_NOT_FOUND)
        almacen.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

