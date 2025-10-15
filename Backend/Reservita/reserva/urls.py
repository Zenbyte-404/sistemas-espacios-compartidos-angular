from django.urls import path
from .views import reservas_usuario

urlpatterns = [
    path('', reservas_usuario, name='reservas_usuario'),
]
