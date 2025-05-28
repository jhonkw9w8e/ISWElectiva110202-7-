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
            if serializer.validated_data['stock'] < 0 or serializer.validated_data['umbral_minimo'] < 0:
                raise ValidationError("El stock y el umbral mínimo deben ser mayores o iguales a cero.")
            if serializer.validated_data['precio'] <= 0:
                raise ValidationError("El precio debe ser mayor que cero.")
            serializer.save(created_by=request.user, updated_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,pk):
        try:
            producto = Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProductoSerializer(producto, data=request.data, partial=True)
        if serializer.is_valid():
            if serializer.validated_data.get('stock',0) < 0 or serializer.validated_data.get('umbral_minimo',0) <0:
                 raise ValidationError("El stock y el umbral minimo deben ser mayores o iguales a cero.")
            if serializer.validated_data('precio',1)<=0:
                raise ValidationError("El precio debe ser mayor a cero.")
            serializer.save(updated_by=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request):
        ids = request.data.get('ids',[])
        productos = Producto.objects.filter(id__in=ids)
        for producto in productos:
            if hasattr(producto, 'movimientos') and producto.movimientos.exists():
                continue
            producto.eliminado_temporal = True
            producto.eliminado_at = timezone.now()
            producto.save()
        return Response({"detalle":"Eliminación marcada.Puede deshacer en 10 minutos."},status=status.HTTP_200_OK)
    
class DeshacerElimancionAPIView(APIView):
        def post(self,request):
            ids = request.data.get('ids',[])
            productos = Producto.objects.filter(id__in=ids, eliminado_temporal=True)
            for producto in productos:
                producto.eliminado_temporal = False
                producto.eliminado_at = None
                producto.save()
            return Response({"detalle":"Eliminación deshecha"},status=status.HTTP_200_OK)
        
class ConfirmarEliminacionAPIView(APIView):
                def post(self,request):
                    ahora = timezone.now()
                    productos = Producto.objects.filter(eliminado_temporal=True, eliminado_at__ite=ahora - timezone.timedelta(minutes=10))
                    for producto in productos:
                        producto.eliminado = True
                        producto.save()
                    return Response({"detalle":"Eliminaciones confirmadas."},status=status.HTTP_200_OK)
                
