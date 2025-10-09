import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestorDatosComponent } from '../admin/componentes/gestor-datos/gestor-datos';
import { AuthService } from '../../../services/auth/auth.service';

// ARREGLADO POR AGUSTÍN: El templateUrl y styleUrls estaban mal.
// Buscaba 'dashboard.component.html' y 'dashboard.component.scss' pero los archivos
// reales son 'dashboard.html' y 'dashboard.css'. Esto causaba error NG2008.
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GestorDatosComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  adminId: number | null = null;
  private authService = inject(AuthService);

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.adminId = user && user.id ? Number(user.id) : null;
  }
}
