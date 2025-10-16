from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Espacio
from .serializers import EspacioSerializer

class EspacioViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar espacios con operaciones CRUD completas.
    Proporciona endpoints para listar, crear, actualizar y eliminar espacios.
    """
    queryset = Espacio.objects.all()
    serializer_class = EspacioSerializer
    
    def create(self, request, *args, **kwargs):
        """
        Crear un nuevo espacio.
        POST /api/espacios/
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        """
        Actualizar un espacio existente.
        PUT /api/espacios/{id}/
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        """
        Eliminar un espacio.
        DELETE /api/espacios/{id}/
        """
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {'detail': 'Espacio eliminado correctamente'},
            status=status.HTTP_204_NO_CONTENT
        )
    
    @action(detail=False, methods=['get'])
    def disponibles(self, request):
        """
        Obtener solo espacios disponibles.
        GET /api/espacios/disponibles/
        """
        espacios = Espacio.objects.filter(estado='disponible')
        serializer = self.get_serializer(espacios, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def por_capacidad(self, request):
        """
        Filtrar espacios por capacidad mínima.
        GET /api/espacios/por_capacidad/?min=10
        """
        capacidad = request.query_params.get('min', None)
        if capacidad:
            try:
                espacios = Espacio.objects.filter(capacidad__gte=int(capacidad))
                serializer = self.get_serializer(espacios, many=True)
                return Response(serializer.data)
            except ValueError:
                return Response(
                    {'error': 'El parámetro min debe ser un número'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(
            {'error': 'Parámetro min requerido'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    @action(detail=True, methods=['post'])
    def cambiar_estado(self, request, pk=None):
        """
        Cambiar el estado de un espacio específico.
        POST /api/espacios/{id}/cambiar_estado/
        Body: {"estado": "mantenimiento"}
        """
        espacio = self.get_object()
        nuevo_estado = request.data.get('estado')
        
        estados_validos = ['disponible', 'no_disponible', 'mantenimiento']
        if nuevo_estado not in estados_validos:
            return Response(
                {'error': f'Estado debe ser uno de: {", ".join(estados_validos)}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        espacio.estado = nuevo_estado
        espacio.save()
        serializer = self.get_serializer(espacio)
        return Response(
            {'detail': f'Estado cambiado a {nuevo_estado}', 'espacio': serializer.data},
            status=status.HTTP_200_OK
        )