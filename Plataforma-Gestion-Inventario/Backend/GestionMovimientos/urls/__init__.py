
from django.urls import path,include
from .TipoMovimiento import urlpatterns as TipoMovimiento_urls
from .MovimientoStock import urlpatterns as MovimientoStock_urls
from .Almacen import urlpatterns as Almacen_urls
from .Transferencia import urlpatterns as Transferencia_urls
urlpatterns = TipoMovimiento_urls + MovimientoStock_urls + Almacen_urls + Transferencia_urls