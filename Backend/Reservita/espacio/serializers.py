from rest_framework import serializers
from .models import Espacio

class EspacioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Espacio
        fields = [
            'id',
            'nombre',
            'ubicacion',
            'capacidad',
            'descripcion',
            'estado',
            'fecha_creacion',
            'fecha_actualizacion'
        ]
        read_only_fields = ['id', 'fecha_creacion', 'fecha_actualizacion']