import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestorDatosComponent } from '../componentes/gestor-datos/gestor-datos';
import { AuthService } from '../../../../services/auth/auth.service';
import { EspacioService, Espacio } from '../../../../services/espacios/espacios.service';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule, GestorDatosComponent],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardUser implements OnInit {
  usuarioId: number | null = null;
  espacios: Espacio[] = [];
  cargando = true;
  error = '';

  private authService = inject(AuthService);
  private espacioService = inject(EspacioService);

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.usuarioId = user && user.id ? Number(user.id) : null;
    this.cargarEspacios();
  }

  cargarEspacios(): void {
    this.espacioService.getEspacios().subscribe({
      next: (datos: Espacio[]) => {
        this.espacios = datos;
        this.cargando = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar espacios';
        this.cargando = false;
        console.error(err);
      }
    });
  }
}
