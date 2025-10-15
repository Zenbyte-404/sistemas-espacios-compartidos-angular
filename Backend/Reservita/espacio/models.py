from django.db import models

class Espacio(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    capacidad = models.PositiveIntegerField()

    def __str__(self):
        return self.nombre
