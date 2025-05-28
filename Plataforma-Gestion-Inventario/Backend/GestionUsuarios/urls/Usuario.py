from django.urls import path
from ..views.Usuario import UsuarioAPIView

urlpatterns = [
    path('usuarios/',UsuarioAPIView.as_view(),name='usuario-list-create'),
    path('usuarios/<int:pk>/',UsuarioAPIView.as_view(),name='usuario-detail')
]