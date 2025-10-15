from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Reserva
from .serializers import ReservaSerializer
from usuario.models import Usuario 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reservas_usuario(request):
    # Buscar el usuario correcto según el nombre del usuario autenticado
    usuario = Usuario.objects.get(username=request.user.username)
    reservas = Reserva.objects.filter(usuario=usuario)
    serializer = ReservaSerializer(reservas, many=True)
    return Response(serializer.data)