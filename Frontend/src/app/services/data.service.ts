
// SERVICIO DE DATOS - Revisado por Agustín

// Este servicio maneja todas las peticiones HTTP a las APIs externas.
// Usa Reqres API y JSON Server para obtener datos de usuarios y posts.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// 
// INTERFACES - Definen la estructura de los datos

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

interface ApiResponse<T> {
  data: T;
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
}

@Injectable({
  providedIn: 'root' // Disponible en toda la aplicación (singleton)
})
export class DataService {
  // URLs base de las APIs
  private readonly reqresApiUrl = `${environment.reqresApiUrl}/${environment.apiVersion}`;
  private readonly jsonServerApiUrl = environment.jsonServerApiUrl;
  
  // Headers por defecto para todas las peticiones
  private readonly defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  // Inyección del HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) {}


  /**
   * Obtiene usuarios de Reqres API con paginación
   * @param page Número de página (por defecto: 1)
   * @param perPage Items por página (por defecto: 6)
   */
  getReqresUsers(page: number = 1, perPage: number = 6): Observable<ApiResponse<User[]>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http.get<ApiResponse<User[]>>(
      `${this.reqresApiUrl}/users`,
      { headers: this.defaultHeaders, params }
    ).pipe(
      catchError(this.handleError<ApiResponse<User[]>>('getReqresUsers'))
    );
  }

  /**
   * Obtiene un usuario específico por ID de Reqres API
   * @param id ID del usuario
   */
  getReqresUser(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(
      `${this.reqresApiUrl}/users/${id}`,
      { headers: this.defaultHeaders }
    ).pipe(
      catchError(this.handleError<ApiResponse<User>>('getReqresUser'))
    );
  }

  /**
   * Obtiene todos los posts del JSON Server local
   */
  getJsonServerPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${this.jsonServerApiUrl}/posts`,
      { headers: this.defaultHeaders }
    ).pipe(
      catchError(this.handleError<Post[]>('getJsonServerPosts', []))
    );
  }

  /**
   * Crea un nuevo post en JSON Server
   * @param post Datos del post a crear (sin ID)
   */
  createPost(post: Omit<Post, 'id'>): Observable<Post> {
    return this.http.post<Post>(
      `${this.jsonServerApiUrl}/posts`,
      post,
      { headers: this.defaultHeaders }
    ).pipe(
      catchError(this.handleError<Post>('createPost'))
    );
  }

  
  /**
   * Maneja errores HTTP de forma centralizada
   * @param operation Nombre de la operación que falló
   * @param result Valor opcional a retornar como resultado
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} falló:`, error);
      
      // Aquí se podría agregar manejo de errores más sofisticado
      // Por ejemplo: enviar el error a un servicio de logging
      
      // Permite que la app siga funcionando lanzando un error controlado
      return throwError(() => new Error('Algo salió mal. Por favor intenta de nuevo.'));
    };
  }
}
