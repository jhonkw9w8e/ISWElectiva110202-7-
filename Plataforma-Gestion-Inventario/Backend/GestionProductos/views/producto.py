from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from models import CategoriaProducto, Producto
from serializers import CategoriaProductoSerializer,ProductoSerializer

class ProductoAPIView(APIView):
    def get(self,request)
