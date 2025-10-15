from django.db import models
from django.core.exceptions import ValidationError
from django.conf import settings

class Reserva(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('confirmada', 'Confirmada'),
        ('cancelada', 'Cancelada'),
        ('rechazada', 'Rechazada'),
    ]

    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE)
    
    espacio = models.ForeignKey(
        'espacio.Espacio',  # relaciona con la app espacio
        on_delete=models.CASCADE,
        related_name='reservas'
    )
    fecha_hora_inicio = models.DateTimeField()
    fecha_hora_fin = models.DateTimeField()
    motivo = models.CharField(max_length=255, blank=True, null=True)
    estado = models.CharField(max_length=15, choices=ESTADOS, default='pendiente')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'reservas'
        indexes = [
            models.Index(fields=['espacio', 'fecha_hora_inicio', 'fecha_hora_fin']),
        ]
        constraints = [
            models.CheckConstraint(check=models.Q(fecha_hora_fin__gt=models.F('fecha_hora_inicio')),
                                   name='chk_fecha_reserva')
        ]

    def clean(self):
        if self.fecha_hora_fin <= self.fecha_hora_inicio:
            raise ValidationError("La fecha de fin debe ser posterior a la de inicio.")

    def __str__(self):
        return f"Reserva #{self.id} - {self.usuario} ({self.estado})"
