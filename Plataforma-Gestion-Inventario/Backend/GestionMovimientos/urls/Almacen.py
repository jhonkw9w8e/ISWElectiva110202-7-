from django.urls import path
from ..views.Almacen import (
    AlmacenListCreateAPIView,
    AlmacenDetailAPIView,
)

urlpatterns = [
    # almacén
    path('almacenes/', AlmacenListCreateAPIView.as_view(), name='almacen-list-create'),
    path('almacenes/<int:pk>/', AlmacenDetailAPIView.as_view(), name='almacen-detail'),
]
