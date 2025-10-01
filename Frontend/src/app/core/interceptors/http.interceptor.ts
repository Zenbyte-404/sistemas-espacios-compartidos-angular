// ============================================================================
// HTTP INTERCEPTOR - Revisado por Agustín
// ============================================================================
// Este interceptor intercepta TODAS las peticiones HTTP de la aplicación.
// Agrega headers de seguridad, maneja timeouts y errores globalmente.

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  /**
   * Intercepta cada petición HTTP antes de enviarla
   * @param request Petición HTTP original
   * @param next Handler para continuar con la petición
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // PASO 1: Agregar headers de seguridad a todas las peticiones
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff', // Previene MIME sniffing
      'X-Frame-Options': 'DENY', // Previene clickjacking
      'X-XSS-Protection': '1; mode=block', // Protección XSS
    });

    // PASO 2: Clonar la petición con los nuevos headers
    // (Las peticiones HTTP son inmutables, por eso se clona)
    const authReq = request.clone({
      headers,
      withCredentials: true // Permite enviar cookies (si se usa auth con cookies)
    });

    // PASO 3: Configurar timeout para evitar peticiones colgadas
    const timeoutValue = Number(request.headers.get('timeout') || environment.defaultTimeout);

    // PASO 4: Enviar la petición y manejar errores
    return next.handle(authReq).pipe(
      timeout(timeoutValue), // Aplica timeout
      catchError((error: HttpErrorResponse | TimeoutError) => {
        // Manejo de timeout
        if (error instanceof TimeoutError) {
          return throwError(() => new Error('La petición tardó demasiado. Intenta de nuevo.'));
        }

        let errorMessage = 'Ocurrió un error';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente (red, etc.)
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor (404, 500, etc.)
          errorMessage = `Código de Error: ${error.status}\nMensaje: ${error.message}`;
        }
        
        console.error('Error HTTP:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
