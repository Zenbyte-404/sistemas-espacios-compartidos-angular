import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, User, Post } from '../../services/data.service';
import { GestorDatosComponent } from './componentes/gestor-datos/gestor-datos';

// ARREGLADO POR AGUSTÍN: El templateUrl y styleUrls estaban mal.
// Buscaba 'dashboard.component.html' y 'dashboard.component.scss' pero los archivos
// reales son 'dashboard.html' y 'dashboard.css'. Esto causaba error NG2008.
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GestorDatosComponent],
  templateUrl: './dashboard.html', // Corregido por Agustín
  styleUrls: ['./dashboard.css'], // Corregido por Agustín
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  reqresData: User[] = [];
  jsonServerData: Post[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getReqresData();
    this.getJsonServerData();
  }

  private getReqresData(): void {
    this.dataService.getReqresUsers().subscribe({
      next: (response) => this.reqresData = [...(response?.data ?? [])],
      error: (error) => console.error('Error al obtener datos de Reqres:', error)
    });
  }

  private getJsonServerData(): void {
    this.dataService.getJsonServerPosts().subscribe({
      next: (response) => this.jsonServerData = [...(response ?? [])],
      error: (error) => console.error('Error al obtener datos de JSON Server:', error)
    });
  }
}
