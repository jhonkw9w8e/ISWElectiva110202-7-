from django.urls import path
from ..views.producto import ProductoAPIView, DeshacerElimancionAPIView, ConfirmarEliminacionAPIView, ProductoSearchAPIView

urlpatterns = [
    path('gestion-productos/productos/',ProductoAPIView.as_view(),name='producto-list-create'),
    path('gestion-productos/productos/<int:pk>/', ProductoAPIView.as_view(),name='producto-detail'),
    path('gestion-productos/productos/deshacer-eliminacion/',DeshacerElimancionAPIView.as_view(), name='producto-deshacer-eliminacion'),
    path('gestion-productos/productos/confirmacion-eliminacion',ConfirmarEliminacionAPIView.as_view(),name='producto-confirmar-eliminacion'),
    path('gestion-productos/productos/search/',ProductoSearchAPIView.as_view(),name='producto-search')
]
