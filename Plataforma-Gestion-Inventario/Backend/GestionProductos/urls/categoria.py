from django.urls import path
from views import CategoriaProductoAPIView
urlpatterns = [
    path('/gestion-productos/categorias/',CategoriaProductoAPIView.as_view(),related_name='categorias')
]
