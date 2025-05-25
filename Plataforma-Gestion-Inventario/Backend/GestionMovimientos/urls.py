from django.urls import path
from .views import MovimientoStockDetailAPIView,ActualizarStockPorProductoAPIView, MovimientoStockListCreateAPIView, TransferenciaListCreateAPIView, TransferenciaDetailAPIView

urlpatterns = [
    path('',    TransferenciaListCreateAPIView.as_view(), name='transferencia-list-create'),
    path('<int:pk>/', TransferenciaDetailAPIView.as_view(), name='transferencia-detail'),
    path('movimientos/', MovimientoStockListCreateAPIView.as_view(), name='movimiento-list-create'),
    path('movimientos/<int:producto_id>/', MovimientoStockDetailAPIView.as_view(), name='movimiento-detail'),
    path("actualizar/<int:producto_id>/", ActualizarStockPorProductoAPIView.as_view(), name="actualizar-stock-producto"),
]

