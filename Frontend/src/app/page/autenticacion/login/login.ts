// ============================================================================
// PÁGINA LOGIN - Mejorado por Agustín
// ============================================================================
// Página de inicio de sesión con validación de formulario.
// Incluye login tradicional y login con Google OAuth.

import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Estado del componente
  isLoading = this.authService.isLoading;
  errorMessage: string = '';
  showPassword: boolean = false;
  returnUrl: string = '/dashboard';

  // Formulario de login con validaciones
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]], // Email requerido y válido
    password: ['', [Validators.required, Validators.minLength(8)]], // Mínimo 8 caracteres
    rememberMe: [false] // Recordar sesión
  });

  // Getters para acceder fácilmente a los campos del formulario
  get password() {
    return this.loginForm.get("password");
  }

  get email() {
    return this.loginForm.get("email");
  }

  ngOnInit(): void {
    // Obtener URL de retorno si existe
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    // Inicializar Google Sign-In
    this.authService.initializeGoogleSignIn();
  }

  ngAfterViewInit(): void {
    // Renderizar botón de Google después de que el DOM esté listo
    setTimeout(() => {
      this.authService.renderGoogleButton('google-login-button');
    }, 100);
  }

  /**
   * Maneja el envío del formulario de login
   * MEJORADO POR AGUSTÍN: Ahora usa el servicio de autenticación
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    const { email, password } = this.loginForm.value;

    this.authService.login({
      email: email!,
      password: password!
    }).subscribe({
      next: () => {
        // Login exitoso, el servicio ya redirige al dashboard
        console.log('Login exitoso');
      },
      error: (error) => {
        this.errorMessage = error.message || 'Credenciales inválidas';
      }
    });
  }

  /**
   * Alterna la visibilidad de la contraseña
   * AGREGADO POR AGUSTÍN: Mejora UX mostrando/ocultando password
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}