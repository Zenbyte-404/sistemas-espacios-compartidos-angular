// ============================================================================
// LAYOUT PRINCIPAL - Revisado por Agustín
// ============================================================================
// Este layout se usa para las páginas públicas (Home, Login, Objetivo, etc.)
// Incluye el Header y el contenido dinámico de cada página.

import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header], // RouterOutlet muestra las rutas hijas
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {
  // Layout simple que envuelve las páginas públicas
}
