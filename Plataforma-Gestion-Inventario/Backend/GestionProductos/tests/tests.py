from django.test import TestCase
from ..models.producto import Producto

class ProductoModelTest(TestCase):
    def test_crear_producto(self):
        producto = Producto.objects.create(
            nombre="Monitor", descripcion="Monitor HD", precio=300.00
        )
        self.assertEqual(producto.nombre, "Monitor")
        self.assertEqual(producto.precio, 300.00)
