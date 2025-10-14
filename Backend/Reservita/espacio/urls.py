from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EspacioViewSet

router = DefaultRouter()
router.register(r'espacios', EspacioViewSet, basename='espacios')

urlpatterns = [
    path('', include(router.urls)),
]
