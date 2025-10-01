import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { 
  provideClientHydration, 
  withEventReplay,
  withNoHttpTransferCache
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

/** 
 * CONFIGURACIÓN GLOBAL DE LA APLICACIÓN
 * Configurado por Agustín para incluir todas las funcionalidades necesarias
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // ROUTER: Configuración de rutas con scroll automático
    // Restaura la posición del scroll al navegar entre páginas
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled', // Restaura scroll al volver atrás
      anchorScrolling: 'enabled' // Permite scroll a anclas (#section)
    })),
    
    // HTTP CLIENT: Configuración del cliente HTTP
    provideHttpClient(
      withFetch()
    ),
    
    // CLIENT HYDRATION: Configuración para SSR (Server-Side Rendering)
    // Mejora el rendimiento inicial de la aplicación
    provideClientHydration(
      withEventReplay(), // Reproduce eventos durante la hidratación
      withNoHttpTransferCache() // No transfiere cache HTTP del servidor
    ),
    
    // ZONE.JS: Configuración de detección de cambios
    // Optimiza el rendimiento agrupando eventos
    provideZoneChangeDetection({
      eventCoalescing: true, // Agrupa eventos del mismo tipo
      runCoalescing: true // Agrupa múltiples detecciones de cambios
    })
  ]
};