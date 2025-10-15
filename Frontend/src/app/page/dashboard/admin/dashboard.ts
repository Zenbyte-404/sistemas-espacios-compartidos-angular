import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';


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
  private authService = inject(AuthService);

  setSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.adminId = user && user.id ? Number(user.id) : null;
    this.userName = user && user.name ? user.name : 'Usuario';
  }
}
