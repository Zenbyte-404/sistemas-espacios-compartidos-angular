from django.contrib import admin
<<<<<<< HEAD
from django.urls import path, include
=======
from django.urls import include,path

>>>>>>> Develop

urlpatterns = [
    
    path('admin/', admin.site.urls),
<<<<<<< HEAD
    path('api/', include('espacio.urls')),
=======
    path('api/v1/', include('usuario.urls')),
>>>>>>> Develop
]
