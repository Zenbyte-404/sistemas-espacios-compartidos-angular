// ============================================================================
// COMPONENTE PRINCIPAL DE LA APLICACIÓN - Revisado por Agustín
// ============================================================================
// Este es el componente raíz que contiene toda la aplicación.
// Usa RouterOutlet para mostrar las diferentes páginas según la ruta.

import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root', // Selector usado en index.html
  standalone: true, // Componente standalone (no necesita NgModule)
  imports: [RouterOutlet], // Importa RouterOutlet para mostrar rutas
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Título de la aplicación usando signals (Angular moderno)
  protected readonly title = signal('sistemas-compartidos-angular');
}