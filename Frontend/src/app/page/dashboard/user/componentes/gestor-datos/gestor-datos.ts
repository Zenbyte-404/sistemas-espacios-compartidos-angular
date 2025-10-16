import { Component, Input, ChangeDetectionStrategy, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../../../../../services/reservas/reservas.service';
import { UsuariosService } from '../../../../../services/usuarios/usuarios.service';
import { EspacioService, Espacio } from '../../../../../services/espacios/espacios.service';

export interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
}

export interface Post {
  readonly id: number;
  readonly title: string;
  readonly body: string;
}

// AGREGADO POR AGUSTÍN: Creé esta interface porque el template HTML usaba
// propiedades de 'Reserva' pero no existía la definición. Esto causaba errores TS2339.
export interface Reserva {
  readonly id: number;
  readonly espacio: string;
  readonly tipo: string;
  readonly fecha: string;
  readonly hora: string;
  readonly ubicacion: string;
}

@Component({
  selector: 'app-gestor-datos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestor-datos.html',
  styleUrls: ['./gestor-datos.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GestorDatosComponent implements OnInit {
  reservas = signal<Reserva[]>([]);
  reservaSeleccionada = signal<Reserva | null>(null);

  espacios = signal<Espacio[]>([]);
  espacioSeleccionado = signal<Espacio | null>(null);
  cargandoEspacios = signal(true);
  errorEspacios = signal('');

  userId: number | null = null;

  constructor(
    private reservasService: ReservasService,
    private usuariosService: UsuariosService ,
    private espacioService: EspacioService
  ) {}

  @Input() set usuarioId(value: number | null) {
    this.userId = value;
    if (value) {
      this.cargarReservasUsuario(value);
    }
  }

    ngOnInit(): void {
    this.cargarEspacios();

    if (this.userId) {
      this.cargarReservasUsuario(this.userId);
    }
  }
  cargarEspacios(): void {
    this.cargandoEspacios.set(true);
    this.espacioService.getEspacios().subscribe({
      next: (espacios: Espacio[]) => {
        this.espacios.set(espacios);
        this.cargandoEspacios.set(false);
        this.errorEspacios.set('');
      },
      error: (err: any) => {
        console.error('Error al cargar espacios:', err);
        this.errorEspacios.set('Error al cargar espacios');
        this.cargandoEspacios.set(false);
        this.espacios.set([]);
      }
    });
  }

  cargarReservasUsuario(userId: number) {
    this.reservasService.getReservas().subscribe({
      next: (reservas: any) => {
        // Filtrar reservas por usuario si la API lo permite
        const reservasFiltradas = Array.isArray(reservas)
          ? reservas.filter((r: any) => r.userId === userId)
          : [];
        this.reservas.set(reservasFiltradas);
      },
      error: (err: any) => {
        this.reservas.set([]);
      }
    });
  }

  seleccionarReserva(reserva: Reserva): void {
    this.reservaSeleccionada.set(reserva);
  }

  seleccionarEspacio(espacio: Espacio): void {
    this.espacioSeleccionado.set(espacio);
  }

  cancelarReserva(id: number): void {
    // Lógica para cancelar reserva (ejemplo: DELETE a la API)
    this.reservasService.deleteReserva(id).subscribe({
      next: () => {
        this.reservas.set(this.reservas().filter(r => r.id !== id));
        this.reservaSeleccionada.set(null);
      },
      error: () => {
        // Manejo de error
      }
    });
  }

  reservarEspacio(espacioId: number): void {
    if (!this.userId) {
      console.error('Usuario no identificado');
      return;
    }
    // Por ahora solo el voy a poner el log jose
    console.log('Reservar espacio:', espacioId, 'para usuario:', this.userId);
  }
  
  get espaciosDisponibles(): Espacio[] {
    return this.espacios().filter(e => e.estado === 'disponible');
  }
}