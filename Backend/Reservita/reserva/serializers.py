from rest_framework import serializers
from .models import Reserva
from espacio.models import Espacio

# Un serializador simple para mostrar solo el nombre del espacio
class EspacioSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Espacio
        fields = ['id', 'nombre']

class ReservaSerializer(serializers.ModelSerializer):
    # Para que el frontend pueda leer los detalles del espacio (ej: reserva.espacio.nombre)
    espacio = EspacioSimpleSerializer(read_only=True) 
    
    # Para que el frontend pueda enviar solo el ID del espacio al crear la reserva
    espacio_id = serializers.IntegerField(write_only=True) 

    # --- CAMBIO CLAVE ---
    # Añadimos un campo de solo lectura para obtener el 'username' del usuario
    usuario_nombre = serializers.CharField(source='usuario.username', read_only=True)

    class Meta:
        model = Reserva
        # Actualizamos la lista de campos para incluir el nuevo y usar los nombres correctos
        fields = [
            'id', 
            'espacio',
            'espacio_id',
            'usuario_nombre', # <-- Campo nuevo
            'fecha_reserva', 
            'hora_inicio', 
            'hora_fin', 
            'estado',
            'fecha_creacion'
        ]
        read_only_fields = ['fecha_creacion', 'espacio']

    def create(self, validated_data):
        # El 'usuario' se asigna en la vista (perform_create), así que aquí solo manejamos el espacio_id
        espacio = Espacio.objects.get(id=validated_data.pop('espacio_id'))
        reserva = Reserva.objects.create(espacio=espacio, **validated_data)
        return reserva
