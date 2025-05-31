from django.test import TestCase
from ..models.Usuario import Usuario

class UsuarioModelTest(TestCase):
    def test_crear_usuario(self):
        usuario = Usuario.objects.create(nombre="Juan", email="juan@mail.com")
        self.assertEqual(usuario.nombre, "Juan")
