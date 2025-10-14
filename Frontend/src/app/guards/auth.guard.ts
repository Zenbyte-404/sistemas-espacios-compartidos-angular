/**
 * Guard para rutas de admin
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.hasRole('admin')) {
    return true;
  }
  // Si no es admin, redirigir a dashboard de usuario o login
  if (authService.isAuthenticated()) {
    router.navigate(['/dashboard/user']);
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  }
  return false;
};

/**
 * Guard para rutas de usuario normal
 */
export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.hasRole('user')) {
    return true;
  }
  // Si no es user, redirigir a dashboard de admin o login
  if (authService.isAuthenticated()) {
    router.navigate(['/dashboard/admin']);
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  }
  return false;
};
// ============================================================================
// GUARD DE AUTENTICACIÓN - Creado por Agustín
// ============================================================================
// Este guard protege las rutas que requieren autenticación.
// Si el usuario no está autenticado, lo redirige al login.

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

/**
 * Guard para proteger rutas privadas
 * AGREGADO POR AGUSTÍN: Previene acceso no autorizado al dashboard
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  if (authService.isAuthenticated()) {
    // Redirigir según el rol si intenta acceder a /dashboard directamente
    const user = authService.getCurrentUser();
    if (state.url === '/dashboard' || state.url === '/dashboard/') {
      if (user?.role === 'admin') {
        router.navigate(['/dashboard/admin']);
        return false;
      } else {
        router.navigate(['/dashboard/user']);
        return false;
      }
    }
    return true; // Permitir acceso a rutas hijas
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

  // Si ya está autenticado, redirigir al dashboard según el rol
  if (authService.isAuthenticated()) {
    const user = authService.getCurrentUser();
    if (user?.role === 'admin') {
      router.navigate(['/dashboard/admin']);
    } else {
      router.navigate(['/dashboard/user']);
    }
    return false;
  }

  return true; // Permitir acceso a página pública
};
