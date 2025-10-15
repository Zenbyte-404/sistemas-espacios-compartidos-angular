import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();
  currentUser = signal<User | null>(this.getUserFromStorage());
  isAuthenticated = computed(() => this.currentUser() !== null);
  isLoading = signal<boolean>(false);

  private readonly apiUrl = 'http://localhost:8000/api/v1';

  constructor() {}


  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this.isLoading.set(true);
    return this.http.post<AuthResponse>(`${this.apiUrl}/users/login/`, credentials).pipe(
      tap(response => {
        this.handleAuthSuccess(response);
      }),
      catchError(error => {
        this.isLoading.set(false);
        return throwError(() => new Error('Error al iniciar sesión'));
      })
    );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    this.isLoading.set(true);
    return this.http.post<AuthResponse>(`${this.apiUrl}/users/register/`, data).pipe(
      tap(response => {
        this.handleAuthSuccess(response);
      }),
      catchError(error => {
        this.isLoading.set(false);
        return throwError(() => new Error('Error al registrar usuario'));
      })
    );
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem('current_user', JSON.stringify(response.user));
    this.currentUser.set(response.user);
    this.currentUserSubject.next(response.user);
    this.isLoading.set(false);
    // Redirigir según el rol
    if (response.user.role === 'admin') {
      this.router.navigate(['/dashboard/admin']);
    } else {
      this.router.navigate(['/dashboard/user']);
    }
  }

  logout(): void {
    localStorage.removeItem('current_user');
    this.currentUser.set(null);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

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

  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user?.role === role;
  }
}
