// ============================================================================
// PÁGINA LOGIN - Mejorado por Agustín
// ============================================================================
// Página de inicio de sesión con validación de formulario.
// Incluye login tradicional y login con Google OAuth.

import { Component, inject, OnInit} from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login{
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
  /**
   * Maneja el envío del formulario de login
   * MEJORADO POR AGUSTÍN: Ahora usa el servicio de autenticación
   */

    ngOnInit() {
  console.log('🟡 Componente Login montado correctamente');
}

  funciona(): void {
    console.log('funciona ejecutado');
  }
  onSubmit(): void {
    console.log('onSubmit ejecutado');
    if (this.loginForm.invalid) {
      console.log('Formulario inválido');
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log('✅ Formulario válido');
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