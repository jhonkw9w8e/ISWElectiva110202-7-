from django.urls import path
from ..views.TipoMovimiento import  MovimientoStockListAPIView

urlpatterns = [
    path('movimientos/', MovimientoStockListAPIView.as_view(), name='movimiento-stock-list'),
]
