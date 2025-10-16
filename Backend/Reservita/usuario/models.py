from django.contrib.auth.models import AbstractUser
from django.db import models

class Rol(models.Model):
    name = models.CharField(
        max_length=50,
        unique=True,
        help_text="Nombre del rol, debe ser único."
    )
    description = models.TextField(
        blank=True,
        help_text="Descripción del rol."
    )



class Usuario(models.Model):
    name = models.CharField(
        max_length=100,
        help_text="Nombre completo del usuario.")
    email = models.EmailField(
        unique=True, help_text="Correo electrónico del usuario.")
    password = models.CharField(
        max_length=100, help_text="Contraseña del usuario.")
    role = models.CharField(
        max_length=10,
        choices=[
            ('admin', 'Administrador'),
            ('cliente', 'Cliente')
        ],
        default='cliente',
        help_text="Rol del usuario.")
    activo = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.role})"

class Usuario(AbstractUser):
    # Podés agregar campos adicionales si querés, por ejemplo:
    # telefono = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.username
