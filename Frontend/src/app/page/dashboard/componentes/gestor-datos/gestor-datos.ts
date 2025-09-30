import { Component, Input, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class GestorDatosComponent {

  private _users = signal<User[]>([]);
  private _posts = signal<Post[]>([]);
  
  // AGREGADO POR AGUSTÍN: El template HTML usaba reservas() pero no existía.
  // Agregué esta señal con datos de ejemplo para que funcione correctamente.
  // Esto resolvió el error TS2339: Property 'reservas' does not exist.
  reservas = signal<Reserva[]>([
    {
      id: 1,
      espacio: 'Sala de Conferencias A',
      tipo: 'Reunión',
      fecha: '2025-10-05',
      hora: '10:00',
      ubicacion: 'Piso 3'
    },
    {
      id: 2,
      espacio: 'Auditorio Principal',
      tipo: 'Presentación',
      fecha: '2025-10-10',
      hora: '14:00',
      ubicacion: 'Piso 1'
    },
    {
      id: 3,
      espacio: 'Sala de Capacitación B',
      tipo: 'Taller',
      fecha: '2025-10-15',
      hora: '09:00',
      ubicacion: 'Piso 2'
    }
  ]);
  
  // AGREGADO POR AGUSTÍN: Esta señal guarda qué reserva seleccionó el usuario
  // para mostrarla en los modales. Resolvió error TS2339.
  reservaSeleccionada = signal<Reserva | null>(null);

  @Input() set users(value: User[]) {
    this._users.set(value ?? []);
  }

  @Input() set posts(value: Post[]) {
    this._posts.set(value ?? []);
  }

  private queryUsers = signal('');
  private queryPosts = signal('');

  filteredUsers = computed(() => {
    const q = this.queryUsers().toLowerCase();
    return q
      ? this._users().filter(u => u.name.toLowerCase().includes(q))
      : this._users();
  });

  filteredPosts = computed(() => {
    const q = this.queryPosts().toLowerCase();
    return q
      ? this._posts().filter(p => p.title.toLowerCase().includes(q))
      : this._posts();
  });

  searchUsers(query: string): void {
    this.queryUsers.set(query);
  }

  searchPosts(query: string): void {
    this.queryPosts.set(query);
  }

  // AGREGADO POR AGUSTÍN: Este método faltaba y el template lo llamaba en los botones.
  // Permite seleccionar una reserva para modificarla o cancelarla.
  // Resolvió error TS2339: Property 'seleccionarReserva' does not exist.
  seleccionarReserva(reserva: Reserva): void {
    this.reservaSeleccionada.set(reserva);
  }

  // AGREGADO POR AGUSTÍN: Este método faltaba y el template lo llamaba en el modal.
  // Elimina una reserva de la lista cuando el usuario confirma la cancelación.
  // Resolvió error TS2339: Property 'cancelarReserva' does not exist.
  cancelarReserva(id: number): void {
    const reservasActuales = this.reservas();
    const reservasActualizadas = reservasActuales.filter(r => r.id !== id);
    this.reservas.set(reservasActualizadas);
    this.reservaSeleccionada.set(null);
  }
}
