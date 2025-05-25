from django.shortcuts import render
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Producto, CategoriaProducto
from .serializers import ProductoSerializer, CategoriaProductoSerializer

class ProductoListCreateAPIView(APIView):
    def get(self, request):
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            producto = serializer.save(
                creado_por = request.user,
                modificado_por = request.user
            )
            return Response(ProductoSerializer(producto).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductoDetailAPIView(APIView):
    def get_object(self, pk):
        try: return Producto.objects.get(pk=pk)
        except Producto.DoesNotExist: return None

    def get(self, request, pk):
        p = self.get_object(pk)
        if not p: return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(ProductoSerializer(p).data)

    def put(self, request, pk):
        p = self.get_object(pk)
        if not p: return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProductoSerializer(p, data=request.data)
        if serializer.is_valid():
            producto = serializer.save(modificado_por=request.user)
            return Response(ProductoSerializer(producto).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        p = self.get_object(pk)
        if not p: return Response(status=status.HTTP_404_NOT_FOUND)
        p.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CategoriaProductoListAPIView(APIView):
    def get(self, request):
        cats = CategoriaProducto.objects.all()
        serializer = CategoriaProductoSerializer(cats, many=True)
        return Response(serializer.data)