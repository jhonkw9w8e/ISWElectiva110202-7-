from django.urls import path,include
from .categoria import urlpatterns as categoria_urls
from .producto import urlpatterns as producto_urls

urlpatterns = producto_urls + categoria_urls
