import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../../../../../services/reservas/reservas.service';

@Component({
  selector: 'app-gestor-datos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestor-datos.html',
  styleUrls: ['./gestor-datos.css'],
  providers:[ReservasService]
})
export class GestorDatosComponent {
  datos = signal<string[]>(['Item 1', 'Item 2', 'Item 3']);

  agregar(item: string) {
    this.datos.update(lista => [...lista, item]);
  }

  eliminar(index: number) {
    this.datos.update(lista => lista.filter((_, i) => i !== index));
  }
}
