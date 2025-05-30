from django.urls import path
from ..views.Informe import InformeAPIView

urlpatterns = [
    path('informes/', InformeAPIView.as_view()),
    path('informes/<int:pk>/', InformeAPIView.as_view()),
]