from django.urls import path
from .models import Almacen
from .serializers import AlmacenSerializer
from rest_framework import generics

urlpatterns = [
    path('',generics.ListCreateAPIView.as_view(
        queryset=Almacen.objects.all(),
        serializer_class= AlmacenSerializer
    ),name='almacen-list-create'),
]
