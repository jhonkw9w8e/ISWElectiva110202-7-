from django.urls import path
from ..views.Transferencia import (
    TransferenciaListCreateAPIView,
)

urlpatterns = [    
    path('transferencias/', TransferenciaListCreateAPIView.as_view(), name='transferencia-list-create'),
]
