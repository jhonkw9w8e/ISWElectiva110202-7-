from django.urls import path
from ..views.MovimientoStock import  MovimientoStockListAPIView

urlpatterns = [
    path('movimientos/', MovimientoStockListAPIView.as_view(), name='movimiento-stock-list'),
]
