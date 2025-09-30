// ============================================================================
// PÁGINA DE REGISTRO - Creado por Agustín
// ============================================================================
// Página para crear nuevas cuentas de usuario.
// Incluye validación de formulario y opción de registro con Google.

import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Estado del componente
  isLoading = this.authService.isLoading;
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Formulario de registro con validaciones
  registroForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: this.passwordMatchValidator
  });

  // Getters para acceder fácilmente a los campos
  get name() {
    return this.registroForm.get('name');
  }

  get email() {
    return this.registroForm.get('email');
  }

  get password() {
    return this.registroForm.get('password');
  }

  get confirmPassword() {
    return this.registroForm.get('confirmPassword');
  }

  ngOnInit(): void {
    // Inicializar Google Sign-In
    this.authService.initializeGoogleSignIn();
  }

  ngAfterViewInit(): void {
    // Renderizar botón de Google después de que el DOM esté listo
    setTimeout(() => {
      this.authService.renderGoogleButton('google-register-button');
    }, 100);
  }

  /**
   * Validador personalizado para verificar que las contraseñas coincidan
   * AGREGADO POR AGUSTÍN: Valida que password y confirmPassword sean iguales
   */
  private passwordMatchValidator(form: any) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  /**
   * Maneja el envío del formulario de registro
   * AGREGADO POR AGUSTÍN: Registra nuevo usuario
   */
  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    const { name, email, password } = this.registroForm.value;

    this.authService.register({
      name: name!,
      email: email!,
      password: password!
    }).subscribe({
      next: () => {
        // Registro exitoso, redirige al dashboard
        console.log('Registro exitoso');
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error al registrar usuario';
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

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
