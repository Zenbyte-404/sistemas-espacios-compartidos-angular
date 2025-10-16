from django.contrib import admin
from .models import Espacio

@admin.register(Espacio)
class EspacioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'ubicacion', 'capacidad', 'estado', 'fecha_creacion')
    list_filter = ('estado', 'capacidad')
    search_fields = ('nombre', 'ubicacion', 'descripcion')
    ordering = ('-fecha_creacion',)
    
    fieldsets = (
        ('Información básica', {
            'fields': ('nombre', 'ubicacion', 'capacidad', 'descripcion')
        }),
        ('Estado', {
            'fields': ('estado',)
        }),
        ('Fechas', {
            'fields': ('fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('fecha_creacion', 'fecha_actualizacion')