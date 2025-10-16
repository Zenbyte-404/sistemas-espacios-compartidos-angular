from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, register, login

router = DefaultRouter()
router.register(r'users', UsuarioViewSet)

urlpatterns = [
    path('users/register/', register, name='user-register'),
    path('users/login/', login, name='user-login'),
    path('', include(router.urls)),
]
