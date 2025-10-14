// Servicio base para reservas 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/api/reservas';

  getReservas() {
    return this.http.get(this.url);
  }

  getReservasPorUsuario(userId: number) {
    return this.http.get(`${this.url}?userId=${userId}`);
  }

  deleteReserva(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
