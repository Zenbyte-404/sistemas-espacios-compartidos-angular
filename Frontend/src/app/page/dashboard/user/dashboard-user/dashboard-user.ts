import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservasService } from '../../../../../app/services/reservas/reservas.service';
import { EspacioService } from '../../../../../app/services/espacios/espacios.service'; 
import { Reserva, NuevaReserva, Espacio } from '../../../../../app/services/reservas/index';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './dashboard-user.html',
  styleUrls: ['./dashboard-user.css']
})
export class DashboardUserComponent implements OnInit {

  misReservas: Reserva[] = [];
  espaciosDisponibles: Espacio[] = []; 
  nuevaReserva: NuevaReserva = {
    espacio_id: 0,
    fecha_reserva: '',
    hora_inicio: '',
    hora_fin: ''
  };
  
  constructor(
    private reservasService: ReservasService,
    private espacioService: EspacioService
  ) { }

  ngOnInit(): void {
    this.cargarMisReservas();
    this.cargarEspacios();
  }

  cargarMisReservas(): void {
    this.reservasService.getMisReservas().subscribe({
      next: (data) => {
        this.misReservas = data;
        console.log('Reservas cargadas:', this.misReservas);
      },
      error: (err) => console.error('Error al cargar las reservas', err)
    });
  }
  
  cargarEspacios(): void {
    this.espacioService.getEspacios().subscribe({
      next: (data) => {
        this.espaciosDisponibles = data as Espacio[];
        console.log('Espacios cargados:', this.espaciosDisponibles);
      },
      error: (err) => console.error('Error al cargar los espacios', err)
    });
  }

  onSubmitNuevaReserva(): void {
    const payload: NuevaReserva = {
      ...this.nuevaReserva,
      hora_inicio: `${this.nuevaReserva.hora_inicio}:00`,
      hora_fin: `${this.nuevaReserva.hora_fin}:00`,
    };

    this.reservasService.crearReserva(payload).subscribe({
      next: (reservaCreada: Reserva) => {
        console.log('Reserva creada con éxito', reservaCreada);
        

        this.misReservas.unshift(reservaCreada);



        this.nuevaReserva = { espacio_id: 0, fecha_reserva: '', hora_inicio: '', hora_fin: '' };
      },
      error: (err: any) => console.error('Error al crear la reserva', err)
    });
  }
  onCancelarReserva(id: number): void {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      this.reservasService.cancelarReserva(id).subscribe({
        next: () => {
          console.log('Reserva cancelada con éxito');
          this.misReservas = this.misReservas.filter(reserva => reserva.id !== id);
        },
        error: (err) => console.error('Error al cancelar la reserva', err)
      });
    }
  }
}