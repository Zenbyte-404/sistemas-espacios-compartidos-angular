import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva, NuevaReserva } from './index';
// Ruta corregida para encontrar el archivo de environment
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private apiUrl = `${environment.apiUrl}/reservas/`; // URL base de la API de reservas

  constructor(private http: HttpClient) { }

  getMisReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  crearReserva(reservaData: NuevaReserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reservaData);
  }

  cancelarReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}