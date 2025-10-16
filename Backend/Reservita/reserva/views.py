from rest_framework import viewsets, permissions
from .models import Reserva
from .serializers import ReservaSerializer

class ReservaViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite ver y editar las reservas del usuario.
    """
    serializer_class = ReservaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Esta vista solo devuelve las reservas del usuario autenticado.
        """
        return Reserva.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        """
        Asigna el usuario actual automáticamente al crear una reserva.
        """
        serializer.save(usuario=self.request.user)