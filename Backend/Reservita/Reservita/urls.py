from django.contrib import admin
from django.urls import path, include
from django.urls import include,path

urlpatterns = [
    
    path('admin/', admin.site.urls),
    path('api/', include('espacio.urls')),
    path('api/v1/', include('usuario.urls')),
    path('api/', include('reserva.urls')),
]
