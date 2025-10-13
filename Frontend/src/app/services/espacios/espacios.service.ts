import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EspaciosService {
  private apiUrl = 'http://localhost:8000/api/espacios';

  constructor(private http: HttpClient) {}

  getEspacios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEspacioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/`);
  }

  createEspacio(espacio: any): Observable<any> {
    return this.http.post(this.apiUrl, espacio);
  }

  updateEspacio(id: number, espacio: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/`, espacio);
  }

  deleteEspacio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/`);
  }
}
