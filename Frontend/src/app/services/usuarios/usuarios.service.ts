// Servicio base para usuarios
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private http:HttpClient) {}
  url = 'http://localhost:3000/api/reservas';


}
