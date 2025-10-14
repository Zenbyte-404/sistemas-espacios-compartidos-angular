// ============================================================================
// LAYOUT DEL DASHBOARD - Revisado por Agustín
// ============================================================================
// Este layout se usa para las páginas del dashboard (zona privada).
// Tiene un diseño diferente al layout principal, sin header público.

import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet], // RouterOutlet muestra las rutas del dashboard
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {
  // Layout para la zona privada/administrativa
}
