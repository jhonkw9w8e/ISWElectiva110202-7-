from django.urls import path
from ..views.categoria import CategoriaProductoAPIView
urlpatterns = [
    path('gestion-productos/categorias/',CategoriaProductoAPIView.as_view(),name='categorias')
]
