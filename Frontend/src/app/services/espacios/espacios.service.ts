import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Espacio {
  id?: number;
  nombre: string;
  ubicacion: string;
  capacidad: number;
  descripcion?: string;
  estado: 'disponible' | 'no_disponible' | 'mantenimiento';
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}
@Injectable({
  providedIn: 'root'
})
export class EspacioService {
  
  private apiUrl = 'http://127.0.0.1:8000/api/espacios';

  constructor(private http: HttpClient) { }

  getEspacios(): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(this.apiUrl + '/');
  }

  getEspacioById(id: number): Observable<Espacio> {
    return this.http.get<Espacio>(`${this.apiUrl}/${id}/`);
  }
  
  crearEspacio(espacio: Espacio): Observable<Espacio> {
    return this.http.post<Espacio>(this.apiUrl + '/', espacio);
  }

  actualizarEspacio(id: number, espacio: Espacio): Observable<Espacio> {
    return this.http.put<Espacio>(`${this.apiUrl}/${id}/`, espacio);
  }
  eliminarEspacio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }
  getEspaciosDisponibles(): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(this.apiUrl + '/disponibles/');
  }
  getEspaciosPorCapacidad(capacidadMinima: number): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(
      `${this.apiUrl}/por_capacidad/?min=${capacidadMinima}`
    );
  }
}
