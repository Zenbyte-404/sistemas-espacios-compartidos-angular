from django.db import models
from django.contrib.auth.models import User
from espacio.models import Espacio

class Reserva(models.Model):
    ESTADOS = [
        ('PENDIENTE', 'Pendiente'),
        ('CONFIRMADA', 'Confirmada'),
        ('CANCELADA', 'Cancelada'),
    ]

    espacio = models.ForeignKey(Espacio, on_delete=models.CASCADE, related_name='reservas')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reservas')
    
    # CAMPOS SEPARADOS PARA FECHA Y HORA
    fecha_reserva = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    
    estado = models.CharField(max_length=20, choices=ESTADOS, default='PENDIENTE')
    fecha_creacion = models.DateTimeField(auto_now_add=True) # Campo útil para ordenar

    def __str__(self):

        return f"{self.espacio.nombre} ({self.fecha_reserva})"
