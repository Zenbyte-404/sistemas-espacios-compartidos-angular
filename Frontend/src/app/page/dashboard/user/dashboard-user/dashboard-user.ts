import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestorDatosComponent } from '../componentes/gestor-datos/gestor-datos';
import { AuthService } from '../../../../services/auth/auth.service';
import { User } from '../../../../services/data/data.service';

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
  private authService = inject(AuthService);

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.usuarioId = user && user.id ? Number(user.id) : null;
  }
}
