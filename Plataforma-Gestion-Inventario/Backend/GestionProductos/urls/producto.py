from django.urls import path
from views import ProductoAPIView, DeshacerElimancionAPIView, ConfirmarEliminacionAPIView

urlpatterns = [
    path('/gestion-productos/productos/',ProductoAPIView.as_view()),
    path('/gestion-productos/productos/deshacer-eliminacion/',DeshacerElimancionAPIView.as_view()),
    path('/gestion-productps/productos/confirmacion-eliminacion',ConfirmarEliminacionAPIView.as_view())
]