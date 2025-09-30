// ARREGLADO POR AGUSTÍN: Faltaba importar Zone.js y causaba el error NG0908.
// Angular requiere Zone.js para la detección de cambios. Sin esta importación
// la aplicación no podía iniciar correctamente.
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));
