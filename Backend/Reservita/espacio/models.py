from django.db import models

class Espacio(models.Model):
    ESTADOS = [
        ('disponible', 'Disponible'),
        ('no_disponible', 'No Disponible'),
        ('mantenimiento', 'Mantenimiento'),
    ]

    nombre = models.CharField(max_length=200)
    ubicacion = models.CharField(max_length=255, null=True, blank=True)
    capacidad = models.IntegerField(default=1)
    descripcion = models.TextField(null=True, blank=True)
    estado = models.CharField(
        max_length=20,
        choices=ESTADOS,
        default='disponible'
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-fecha_creacion']
        verbose_name = 'Espacio'
        verbose_name_plural = 'Espacios'

    def __str__(self):
        return self.nombre

