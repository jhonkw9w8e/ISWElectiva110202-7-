from django.test import TestCase
from ..models.Informe import Informe

class InformeModelTest(TestCase):
    def test_crear_informe(self):
        informe = Informe.objects.create(nombre="Informe de prueba")
        self.assertEqual(informe.nombre, "Informe de prueba")
