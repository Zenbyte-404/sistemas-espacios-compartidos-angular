import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Agrega esta línea si tu componente es standalone
import { DataService } from '../../services/data.ts'; // O 'data.service.ts' si así se llama.

@Component({
  selector: 'app-dashboard',
  standalone: true, // Si es un componente standalone
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  reqresData: any[] = [];
  jsonServerData: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getReqresData();
    this.getJsonServerData();
  }

  getReqresData() {
    this.dataService.getReqresUsers().subscribe({
      next: (response) => {
        this.reqresData = response.data;
      },
      error: (error) => {
        console.error('Error al obtener datos de Reqres:', error);
      }
    });
  }

  getJsonServerData() {
   this.dataService.getJsonServerPosts().subscribe({
   next: (response) => {
      this.jsonServerData = response;
      },
      error: (error) => {
        console.error('Error al obtener datos de JSON Server:', error);
      }
   });
 }
}