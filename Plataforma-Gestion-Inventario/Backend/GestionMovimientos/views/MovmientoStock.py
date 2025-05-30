from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.MovimientoStock import MovimientoStock
from ..serializers.MovimientoStock import MovimientoStockSerializer

class MovimientoStockListAPIView(APIView):
    def get(self, request):
        qs = MovimientoStock.objects.select_related(
            'producto', 'usuario', 'tipo_movimiento'
        ).all()

        fecha_desde = request.query_params.get('fecha_desde')
        fecha_hasta = request.query_params.get('fecha_hasta')
        producto_id = request.query_params.get('producto_id')
        tipo = request.query_params.get('tipo')

        if fecha_desde:
            qs = qs.filter(fecha__date__gte=fecha_desde)
        if fecha_hasta:
            qs = qs.filter(fecha__date__lte=fecha_hasta)
        if producto_id:
            qs = qs.filter(producto_id=producto_id)
        if tipo:
            qs = qs.filter(tipo_movimiento__nombre__iexact=tipo)

        serializer = MovimientoStockSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
