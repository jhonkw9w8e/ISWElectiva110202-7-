from rest_framework.views import APIView
from rest_framework.response import Response
from models import CategoriaProducto
from serializers import CategoriaProductoSerializer

class CategoriaProductoAPIView(APIView):
    def get(self,request):
        categorias = CategoriaProducto.objects.all()
        serializer = CategoriaProductoSerializer(categorias,many=True)
        return Response(serializer.data)
