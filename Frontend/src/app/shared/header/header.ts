// ============================================================================
// COMPONENTE HEADER - Revisado por Agustín
// ============================================================================
// Header de navegación que aparece en todas las páginas públicas.
// Incluye el menú de navegación y el menú hamburguesa para móviles.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule], // RouterModule para routerLink
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  // Controla si el menú hamburguesa está abierto o cerrado (responsive)
  isCollapsed: boolean = true;
}


