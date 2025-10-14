// ============================================================================
// CONFIGURACIÓN DEL SERVIDOR (SSR) - Revisado por Agustín
// ============================================================================
// Este archivo configura el Server-Side Rendering (SSR).
// Combina la configuración del cliente con la del servidor.

import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

// Configuración específica del servidor
const serverConfig: ApplicationConfig = {
  providers: [
    // Habilita SSR con rutas específicas del servidor
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

// Combina configuración del cliente + servidor
export const config = mergeApplicationConfig(appConfig, serverConfig);
