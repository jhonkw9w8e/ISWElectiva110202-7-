
from django.urls import path,include
from .TipoMovimiento import urlpatterns as TipoMovimiento_urls
from .MovimientoStock import urlpatterns as MovimientoStock_urls
urlpatterns = TipoMovimiento_urls + MovimientoStock_urls 