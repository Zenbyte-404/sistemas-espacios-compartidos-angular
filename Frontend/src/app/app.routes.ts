import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';

import { Home } from './page/public/home/home';
import { Objetivo } from './page/info/objetivo/objetivo';
import { QuienesSomos } from './page/info/quienes-somos/quienes-somos';
import { Login } from './page/autenticacion/login/login';
import { Registro } from './page/autenticacion/registro/registro'; // AGREGADO POR AGUSTÍN
// ARREGLADO POR AGUSTÍN: Corregí los nombres de importación porque estaban mal.
// Antes decía 'GestorDatos' y 'Dashboard' pero los componentes se exportan como
// 'GestorDatosComponent' y 'DashboardComponent'. Esto causaba errores TS2305.
import { GestorDatosComponent } from './page/dashboard/componentes/gestor-datos/gestor-datos';
import { DashboardComponent } from './page/dashboard/dashboard';
import { Error404 } from './page/error/error-404/error-404';

// AGREGADO POR AGUSTÍN: Guards para proteger rutas
import { authGuard, publicGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'objetivo', component: Objetivo },
      { path: 'quienes-somos', component: QuienesSomos },
      // AGREGADO POR AGUSTÍN: Rutas de autenticación con guard público
      { path: 'login', component: Login, canActivate: [publicGuard] },
      { path: 'registro', component: Registro, canActivate: [publicGuard] },
      { path: 'gestor-datos', component: GestorDatosComponent },
      { path: '**', component: Error404}
    ]
  },
  // AGREGADO POR AGUSTÍN: Dashboard protegido con authGuard
  {
    path: 'dashboard',
    component: DashboardLayout,
    canActivate: [authGuard], // Requiere autenticación
    children: [
      { path: '', component: DashboardComponent }
    ]
  }
];
