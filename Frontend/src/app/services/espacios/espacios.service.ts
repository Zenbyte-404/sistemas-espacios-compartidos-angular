// Servicio base para espacios (puedes expandirlo según tus necesidades)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspaciosService {
  constructor(private http: HttpClient){}

  url='http://localhost:3000/api/espacios'  

  getEspacios(){
    return this.http.get(this.url)
  }
  //Post para crear un espacio
  postEspacio(espacio: any) {
    return this.http.post(this.url, espacio)
  }
  //Put para actualizar un espacio
  putEspacio(espacio: any) {
    return this.http.put(this.url, espacio)
  }
  //Delete para eliminar un espacio
  deleteEspacio(espacio: any) {
    return this.http.delete(this.url, espacio)
  }
}
