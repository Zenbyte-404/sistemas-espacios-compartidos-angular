import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { EspacioService, Espacio } from '../../../services/espacios/espacios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  adminId: number | null = null;
  userName: string = '';
  seccionActiva: string = 'dashboard';
  espacios: Espacio[] = [];
  router = inject(Router);
  cargando = true;
  error = '';

  private authService = inject(AuthService);
  private espacioService = inject(EspacioService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.adminId = user && user.id ? Number(user.id) : null;
    this.userName = user && user.name ? user.name : 'Administrador';
    this.cargarEspacios();
  }
    logout(): void {
    // Eliminar los datos de sesión
    localStorage.removeItem('usuario'); // si guardaste info del usuario

    // Redirigir a la pantalla de login
    this.router.navigate(['/login']);
  }

  setSeccion(seccion: string): void {
    this.seccionActiva = seccion;
    this.cdr.markForCheck();
  }

  cargarEspacios(): void {
    this.cargando = true;
    this.error = '';
    this.cdr.markForCheck();

    this.espacioService.getEspacios().subscribe({
      next: (datos: Espacio[]) => {
        this.espacios = datos;
        this.cargando = false;
        this.cdr.markForCheck();
        console.log('Espacios cargados:', datos);
      },
      error: (err: any) => {
        this.error = 'Error al cargar espacios. Por favor, intenta nuevamente.';
        this.cargando = false;
        this.cdr.markForCheck();
        console.error('Error al cargar espacios:', err);
      }
    });
  }

  crearEspacio(): void {
    console.log('Iniciando creación de nuevo espacio...');

    const nombre = prompt('Nombre del nuevo espacio:');
    if (!nombre) return;

    const capacidadStr = prompt('Capacidad de personas:');
    if (!capacidadStr) return;
    const capacidad = parseInt(capacidadStr, 10);
    if (isNaN(capacidad) || capacidad <= 0) {
      alert('Error: La capacidad debe ser un número positivo.');
      return;
    }


    const ubicacion = prompt('Ubicación del espacio:');
    if (ubicacion === null) return; 


    const nuevoEspacio: Omit<Espacio, 'id'> = {
      nombre: nombre,
      capacidad: capacidad,
      ubicacion: ubicacion || 'Sin especificar', 
      estado: 'disponible'
    };

    this.espacioService.crearEspacio(nuevoEspacio).subscribe({
      next: (espacioCreado) => {
        alert(`Espacio "${espacioCreado.nombre}" creado exitosamente!`);
        this.cargarEspacios();
      },
      error: (err) => {
        alert('Error al crear el espacio. Revisa la consola para más detalles.');
        console.error('Error en la creación del espacio:', err);
      }
    });
  }

  // Se añade el tipo 'Espacio' al parámetro para evitar errores
  verDetalles(espacio: Espacio): void {
    console.log('Ver detalles de:', espacio);
    // Reescribimos el template literal para asegurar que es válido
    const detalles = `
      DETALLES DEL ESPACIO
      --------------------
      ID: ${espacio.id}
      Nombre: ${espacio.nombre}
      Ubicación: ${espacio.ubicacion || 'Sin ubicación'}
      Capacidad: ${espacio.capacidad} personas
      Estado: ${espacio.estado}
      Descripción: ${espacio.descripcion || 'Sin descripción'}
    `;
    alert(detalles);
  }

  editarEspacio(espacio: Espacio): void {
    console.log('Editar espacio:', espacio);
    const nuevoNombre = prompt(`Editar nombre para "${espacio.nombre}":`, espacio.nombre);

    if (nuevoNombre && nuevoNombre !== espacio.nombre) {
      const espacioActualizado = { ...espacio, nombre: nuevoNombre };
      this.espacioService.actualizarEspacio(espacio.id!, espacioActualizado).subscribe({
        next: () => {
          alert('Espacio actualizado correctamente');
          this.cargarEspacios();
        },
        error: (err: any) => {
          alert('Error al actualizar el espacio');
          console.error(err);
        }
      });
    }
  }

  cambiarEstadoEspacio(espacio: Espacio): void {
    console.log('Cambiar estado de:', espacio);

    const estados = ['disponible', 'no_disponible', 'mantenimiento'];
    const estadoActualIndex = estados.indexOf(espacio.estado);
    const nuevoEstado = estados[(estadoActualIndex + 1) % estados.length] as 'disponible' | 'no_disponible' | 'mantenimiento';

    // Se reescribe la cadena de confirmación para limpiarla
    const mensaje = `¿Cambiar estado de "${espacio.nombre}"?\n\n` +
                    `Estado actual: ${espacio.estado}\n` +
                    `Nuevo estado: ${nuevoEstado}`;

    if (confirm(mensaje) && espacio.id) {
      const espacioActualizado = { ...espacio, estado: nuevoEstado };
      this.espacioService.actualizarEspacio(espacio.id, espacioActualizado).subscribe({
        next: (actualizado: Espacio) => {
          alert(`Estado cambiado a: ${actualizado.estado}`);
          this.cargarEspacios();
        },
        error: (err: any) => {
          alert('Error al cambiar el estado');
          console.error('Error al cambiar estado:', err);
        }
      });
    }
  }

  eliminarEspacio(espacio: Espacio): void {
    console.log('Eliminar espacio:', espacio);

    // Se reescriben las cadenas de texto para evitar caracteres corruptos
    const mensaje1 = `¿ESTAS SEGURO?\n\n` +
                     `Esta acción eliminará permanentemente el espacio:\n` +
                     `"${espacio.nombre}" (ID: ${espacio.id})\n\n` +
                     `Esta acción NO se puede deshacer.`;

    if (confirm(mensaje1)) {
      const mensaje2 = `ULTIMA CONFIRMACION\n\n` +
                       `¿Realmente deseas eliminar "${espacio.nombre}"?`;
      if (confirm(mensaje2) && espacio.id) {
        this.espacioService.eliminarEspacio(espacio.id).subscribe({
          next: () => {
            alert(`Espacio "${espacio.nombre}" eliminado correctamente`);
            this.cargarEspacios();
          },
          error: (err) => {
            alert('Error al eliminar el espacio');
            console.error('Error al eliminar:', err);
          }
        });
      }
    }
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  getEspaciosDisponibles(): number {
    return this.espacios.filter(e => e.estado === 'disponible').length;
  }

  getEspaciosOcupados(): number {
    return this.espacios.filter(e => e.estado === 'no_disponible').length;
  }

  getEspaciosMantenimiento(): number {
    return this.espacios.filter(e => e.estado === 'mantenimiento').length;
  }

  getPorcentajeOcupacion(): number {
    if (this.espacios.length === 0) return 0;
    return Math.round((this.getEspaciosOcupados() / this.espacios.length) * 100);
  }
}
