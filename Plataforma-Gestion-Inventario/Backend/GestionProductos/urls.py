from django.urls import path
from .views import (
    ProductoListCreateAPIView,ProductoDetailAPIView,
    CategoriaProductoListAPIView
)

urlpatterns = [
    path('productos',ProductoListCreateAPIView.as_view(),name='producto-list-create'),
    path('productos/<int:pk>/',ProductoDetailAPIView.as_view(),name='producto-detail'),
    path('categoriasd/',CategoriaProductoListAPIView.as_view(),name='categoria-list')
]
