import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,FormsModule],
  templateUrl: './singup.html',
  styleUrl: './singup.css', 
})
export class Singup {

  private formBuilder = inject(FormBuilder);

  // formulario de registro
  singupForm = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordsMatchValidator });

  // Getters para acceso más limpio en el template
  get nombre() {
    return this.singupForm.get('nombre');
  }
  get email() {
    return this.singupForm.get('email');
  }
  get password() {
    return this.singupForm.get('password');
  }
  get confirmPassword() {
    return this.singupForm.get('confirmPassword');
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onRegistrar(event: Event) {
    event.preventDefault();
    if (this.singupForm.valid) {
      console.log('Formulario válido', this.singupForm.value);
      // llamar api
    } else {
      console.log('Formulario inválido');
      this.singupForm.markAllAsTouched();
    }
  }
}
