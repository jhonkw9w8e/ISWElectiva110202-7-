from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import CategoriaProducto, Producto

# Create your tests here.
class ProductoAPITestCase(APITestCase):
    def setUp(self):
        self.cat = CategoriaProducto.objects.create(nombre="Terminados")
        self.prod = Producto.objects.create(
            codigo="ABC123", nombre="Test", categoria=self.cat,
            descripcion="desc", precio=10.5, stock=5, umbral_minimo=2
        )

    def test_create_producto(self):
        url = reverse('producto-list-create')
        data = {
            "codigo":"XYZ999","nombre":"Nuevo",
            "categoria_id":self.cat.id,"precio":20.0,
            "stock":3,"umbral_minimo":1
        }
        res = self.client.post(url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Producto.objects.filter(codigo="XYZ999").exists(), True)

    def test_create_producto_codigo_duplicado(self):
        url = reverse('producto-list-create')
        data = {"codigo":"ABC123","nombre":"Dup","categoria_id":self.cat.id,"precio":5,"stock":1,"umbral_minimo":1}
        res = self.client.post(url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('codigo', res.data)

    def test_update_producto(self):
        url = reverse('producto-detail', args=[self.prod.id])
        data = {"codigo":"ABC123","nombre":"Edit","categoria_id":self.cat.id,"precio":15,"stock":4,"umbral_minimo":2}
        res = self.client.put(url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.prod.refresh_from_db()
        self.assertEqual(self.prod.nombre, "Edit")

class CategoriaAPITestCase(APITestCase):
    def test_list_categorias(self):
        CategoriaProducto.objects.create(nombre="A")
        res = self.client.get(reverse('categoria-list'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIsInstance(res.data, list)