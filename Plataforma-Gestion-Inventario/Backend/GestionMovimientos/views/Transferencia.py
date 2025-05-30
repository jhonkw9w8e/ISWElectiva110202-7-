from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.Almacen import Almacen, Transferencia
from ..serializers.Almacen import AlmacenSerializer, TransferenciaSerializer


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


class TransferenciaListCreateAPIView(APIView):
    def get(self, request):
        qs = Transferencia.objects.select_related(
            'producto', 'almacen_origen', 'almacen_destino', 'usuario'
        ).all()


        fecha_desde = request.query_params.get('fecha_desde')
        fecha_hasta = request.query_params.get('fecha_hasta')
        producto_id = request.query_params.get('producto_id')
        origen = request.query_params.get('origen')
        destino = request.query_params.get('destino')

        if fecha_desde:
            qs = qs.filter(fecha__date__gte=fecha_desde)
        if fecha_hasta:
            qs = qs.filter(fecha__date__lte=fecha_hasta)
        if producto_id:
            qs = qs.filter(producto_id=producto_id)
        if origen:
            qs = qs.filter(almacen_origen_id=origen)
        if destino:
            qs = qs.filter(almacen_destino_id=destino)

        serializer = TransferenciaSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TransferenciaSerializer(data=request.data)
        if serializer.is_valid():
            # aquí podrías validar stock disponible en origen
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
