// ============================================================================
// SERVICIO DE AUTENTICACIÓN - Creado por Agustín
// ============================================================================
// Este servicio maneja toda la autenticación de la aplicación:
// - Login con email/password
// - Login con Google OAuth
// - Registro de usuarios
// - Manejo de JWT tokens
// - Verificación de sesión

import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// ============================================================================
// INTERFACES
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
  expiresIn?: number;
}

export interface GoogleAuthResponse {
  credential: string;
  clientId: string;
}

// ============================================================================
// SERVICIO DE AUTENTICACIÓN
// ============================================================================

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Señales para manejo de estado reactivo
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Señal moderna de Angular para el usuario actual
  currentUser = signal<User | null>(this.getUserFromStorage());
  isAuthenticated = computed(() => this.currentUser() !== null);
  isLoading = signal<boolean>(false);

  // URLs de la API (ajustar según tu backend)
  private readonly apiUrl = environment.jsonServerApiUrl || 'http://localhost:3000';

  constructor() {
    // Verificar token al iniciar
    this.checkTokenValidity();
  }

  // ==========================================================================
  // MÉTODOS DE AUTENTICACIÓN TRADICIONAL
  // ==========================================================================

  /**
   * Login con email y password
   * AGREGADO POR AGUSTÍN: Maneja el login tradicional con JWT
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this.isLoading.set(true);

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        this.handleAuthSuccess(response);
      }),
      catchError(error => {
        this.isLoading.set(false);
        console.error('Error en login:', error);
        
        // Mensaje de error más específico
        let errorMessage = 'Error al iniciar sesión';
        if (error.status === 0) {
          errorMessage = 'No se puede conectar al servidor. Verifica que el backend esté corriendo en http://localhost:3000';
        } else if (error.status === 400) {
          errorMessage = 'Datos inválidos. Verifica email y contraseña';
        } else if (error.status === 401) {
          errorMessage = 'Credenciales inválidas';
        } else if (error.status === 404) {
          errorMessage = 'Endpoint no encontrado. Verifica que el backend esté corriendo';
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Registro de nuevo usuario
   * AGREGADO POR AGUSTÍN: Permite crear nuevas cuentas
   */
  register(data: RegisterData): Observable<AuthResponse> {
    this.isLoading.set(true);

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data).pipe(
      tap(response => {
        this.handleAuthSuccess(response);
      }),
      catchError(error => {
        this.isLoading.set(false);
        console.error('Error en registro:', error);
        return throwError(() => new Error('Error al registrar usuario'));
      })
    );
  }

  // ==========================================================================
  // MÉTODOS DE GOOGLE OAUTH
  // ==========================================================================

  /**
   * Login con Google OAuth
   * AGREGADO POR AGUSTÍN: Integración con Google Sign-In
   */
  loginWithGoogle(googleToken: string): Observable<AuthResponse> {
    this.isLoading.set(true);

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/google`, {
      token: googleToken
    }).pipe(
      tap(response => {
        this.handleAuthSuccess(response);
      }),
      catchError(error => {
        this.isLoading.set(false);
        console.error('Error en login con Google:', error);
        return throwError(() => new Error('Error al autenticar con Google'));
      })
    );
  }

  /**
   * Inicializa Google Sign-In
   * AGREGADO POR AGUSTÍN: Configura el botón de Google
   */
  initializeGoogleSignIn(): void {
    if (typeof window !== 'undefined' && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response: GoogleAuthResponse) => this.handleGoogleCallback(response),
        auto_select: false,
        cancel_on_tap_outside: true
      });
    }
  }

  /**
   * Renderiza el botón de Google
   * AGREGADO POR AGUSTÍN: Muestra el botón en el DOM
   */
  renderGoogleButton(elementId: string): void {
    if (typeof window !== 'undefined' && (window as any).google) {
      (window as any).google.accounts.id.renderButton(
        document.getElementById(elementId),
        {
          theme: 'outline',
          size: 'large',
          width: 300,
          text: 'continue_with',
          locale: 'es'
        }
      );
    }
  }

  /**
   * Callback de Google OAuth
   * AGREGADO POR AGUSTÍN: Procesa la respuesta de Google
   */
  private handleGoogleCallback(response: GoogleAuthResponse): void {
    this.loginWithGoogle(response.credential).subscribe({
      next: () => {
        console.log('Login con Google exitoso');
      },
      error: (error) => {
        console.error('Error en callback de Google:', error);
      }
    });
  }

  // ==========================================================================
  // MÉTODOS DE GESTIÓN DE SESIÓN
  // ==========================================================================

  /**
   * Maneja el éxito de autenticación
   * AGREGADO POR AGUSTÍN: Guarda token y usuario en localStorage
   */
  private handleAuthSuccess(response: AuthResponse): void {
    // Guardar token en localStorage
    localStorage.setItem('access_token', response.token);
    if (response.refreshToken) {
      localStorage.setItem('refresh_token', response.refreshToken);
    }

    // Guardar usuario
    localStorage.setItem('current_user', JSON.stringify(response.user));

    // Actualizar estado
    this.currentUser.set(response.user);
    this.currentUserSubject.next(response.user);
    this.isLoading.set(false);

    // Redirigir al dashboard
    this.router.navigate(['/dashboard']);
  }

  /**
   * Cierra sesión del usuario
   * AGREGADO POR AGUSTÍN: Limpia todo y redirige al login
   */
  logout(): void {
    // Limpiar localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');

    // Limpiar estado
    this.currentUser.set(null);
    this.currentUserSubject.next(null);

    // Redirigir al login
    this.router.navigate(['/login']);
  }

  /**
   * Obtiene el token JWT
   * AGREGADO POR AGUSTÍN: Para usar en interceptores
   */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  /**
   * Verifica si el token es válido
   * AGREGADO POR AGUSTÍN: Valida expiración del JWT
   */
  private checkTokenValidity(): void {
    const token = this.getToken();
    if (!token) {
      this.currentUser.set(null);
      return;
    }

    try {
      // Decodificar JWT (payload está en base64)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(payload.exp * 1000);
      
      if (expirationDate < new Date()) {
        // Token expirado
        this.logout();
      }
    } catch (error) {
      console.error('Error al validar token:', error);
      this.logout();
    }
  }

  /**
   * Obtiene usuario del localStorage
   * AGREGADO POR AGUSTÍN: Recupera sesión al recargar
   */
  private getUserFromStorage(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userJson = localStorage.getItem('current_user');
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  /**
   * Refresca el token JWT
   * AGREGADO POR AGUSTÍN: Renueva token sin hacer logout
   */
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, {
      refreshToken
    }).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.token);
      }),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  // ==========================================================================
  // MÉTODOS AUXILIARES
  // ==========================================================================

  /**
   * Verifica si el usuario tiene un rol específico
   * AGREGADO POR AGUSTÍN: Para control de acceso por roles
   */
  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user?.role === role;
  }

  /**
   * Obtiene el usuario actual
   * AGREGADO POR AGUSTÍN: Acceso directo al usuario
   */
  getCurrentUser(): User | null {
    return this.currentUser();
  }
}
