// ARREGLADO POR AGUSTÍN: Faltaba Zone.js para el servidor (SSR).
// En el servidor necesitamos 'zone.js/node' en lugar de solo 'zone.js'.
// Esto es necesario para que el Server-Side Rendering funcione correctamente.
import 'zone.js/node';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(App, config);

export default bootstrap;
