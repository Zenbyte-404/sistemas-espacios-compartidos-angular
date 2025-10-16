// ============================================================================
// PÁGINA OBJETIVO - Revisado por Agustín
// ============================================================================
// Página informativa que explica los objetivos del proyecto.
// Contenido estático con información institucional.

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-objetivo',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './objetivo.html',
  styleUrl: './objetivo.css'
})
export class Objetivo {
  // Página informativa sin lógica compleja
}