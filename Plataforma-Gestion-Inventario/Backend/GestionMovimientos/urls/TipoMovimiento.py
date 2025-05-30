from django.urls import path
from ..views.TipoMovimiento import TipoMovimientoAPIView

urlpatterns = [
    path('tipos-movimiento/', TipoMovimientoAPIView.as_view(), name='tipo-movimiento-list-create'),
    path('tipos-movimiento/<int:pk>/', TipoMovimientoAPIView.as_view(), name='tipo-movimiento-detail'),
]
