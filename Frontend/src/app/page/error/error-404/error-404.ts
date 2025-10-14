// ============================================================================
// PÁGINA ERROR 404 - Revisado por Agustín
// ============================================================================
// Página que se muestra cuando el usuario intenta acceder a una ruta
// que no existe. Es la ruta comodín (**) en app.routes.ts

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-404',
  imports: [RouterLink], // RouterLink para el botón de volver al inicio
  templateUrl: './error-404.html',
  styleUrl: './error-404.css'
})
export class Error404 {
  // Página de error simple
}
