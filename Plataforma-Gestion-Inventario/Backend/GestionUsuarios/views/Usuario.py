from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.Usuario import Usuario
from ..serializers.Usuario import UsuarioSerializer

class UsuarioAPIView(APIView):
    def get(self,request,pk=None):
        if pk:
            try:
                usuario = Usuario.objects.get(pk=pk)
                serializer = UsuarioSerializer(usuario)
                return Response(serializer.data)
            except Usuario.DoesNotExist:
                return Response({"error":"Usuario no encontrado."},status=status.HTTP_404_NOT_FOUND)
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,pk):
        try:
            usuario = Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            return Response({"error":"Usuario no encontrado"},status=status.HTTP_404_NOT_FOUND)
        serializer = UsuarioSerializer(usuario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        try:
            usuario = Usuario.objects.get(pk=pk)
            usuario.delete()
            return Response(status.HTTP_204_NO_CONTENT)
        except:
            return Response({"error":"Usuario no encontrado"},status=status.HTTP_404_NOT_FOUND)
        
    