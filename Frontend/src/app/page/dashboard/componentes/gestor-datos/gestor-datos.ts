import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestor-datos',
  standalone: true, // Indica que este componente es standalone
  imports: [CommonModule], // Necesario para usar *ngFor, *ngIf, etc. en el HTML
  templateUrl: './gestor-datos.html',
  styleUrls: ['./gestor-datos.css']
})
export class GestorDatosComponent implements OnInit {

  // @Input() permite que el componente padre (DashboardComponent) le pase datos
  @Input() users: any[] = [];
  @Input() posts: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Puedes agregar lógica aquí si necesitas inicializar algo cuando el componente carga
  }
}