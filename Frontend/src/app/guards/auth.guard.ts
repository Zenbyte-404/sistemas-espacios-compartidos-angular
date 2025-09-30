// ============================================================================
// GUARD DE AUTENTICACIÓN - Creado por Agustín
// ============================================================================
// Este guard protege las rutas que requieren autenticación.
// Si el usuario no está autenticado, lo redirige al login.

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard para proteger rutas privadas
 * AGREGADO POR AGUSTÍN: Previene acceso no autorizado al dashboard
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  if (authService.isAuthenticated()) {
    return true; // Permitir acceso
  }

  // Redirigir al login guardando la URL intentada
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  
  return false; // Bloquear acceso
};

/**
 * Guard para rutas públicas (login, registro)
 * AGREGADO POR AGUSTÍN: Redirige al dashboard si ya está autenticado
 */
export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si ya está autenticado, redirigir al dashboard
  if (authService.isAuthenticated()) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true; // Permitir acceso a página pública
};
