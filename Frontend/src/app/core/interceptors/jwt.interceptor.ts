// ============================================================================
// JWT INTERCEPTOR - Creado por Agustín
// ============================================================================
// Este interceptor agrega automáticamente el token JWT a todas las peticiones.
// También maneja la renovación automática de tokens expirados.

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Interceptor funcional para JWT
 * AGREGADO POR AGUSTÍN: Agrega token a todas las peticiones HTTP
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Si hay token, agregarlo al header Authorization
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Manejar la petición y errores
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el error es 401 (no autorizado), intentar refrescar el token
      if (error.status === 401 && token) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            // Reintentar la petición con el nuevo token
            const newToken = authService.getToken();
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            // Si falla el refresh, hacer logout
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
