import { Component, Input, ChangeDetectionStrategy, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../../../../../services/reservas/reservas.service';
import { UsuariosService } from '../../../../../services/usuarios/usuarios.service';

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
  userId: number | null = null;

  constructor(
    private reservasService: ReservasService,
    private usuariosService: UsuariosService
  ) {}

  @Input() set usuarioId(value: number | null) {
    this.userId = value;
    if (value) {
      this.cargarReservasUsuario(value);
    }
  }

  ngOnInit(): void {
    if (this.userId) {
      this.cargarReservasUsuario(this.userId);
    }
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
}
