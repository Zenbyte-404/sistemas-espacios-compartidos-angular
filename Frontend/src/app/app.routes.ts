import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';

import { Home } from './page/public/home/home';
import { Objetivo } from './page/info/objetivo/objetivo';
import { QuienesSomos } from './page/info/quienes-somos/quienes-somos';
import { Login } from './page/autenticacion/login/login';
import { Registro } from './page/autenticacion/registro/registro'; 
// AGREGADO POR AGUSTÍN
// ARREGLADO POR AGUSTÍN: Corregí los nombres de importación porque estaban mal.
// Antes decía 'GestorDatos' y 'Dashboard' pero los componentes se exportan como
// 'GestorDatosComponent' y 'DashboardComponent'. Esto causaba errores TS2305.
import { GestorDatosComponent } from './page/dashboard/user/componentes/gestor-datos/gestor-datos';
import { GestorEspaciosComponent } from './page/dashboard/admin/componentes/gestor-datos/gestor-datos'; 
import { DashboardComponent } from './page/dashboard/admin/dashboard';
import { DashboardUser } from './page/dashboard/user/dashboard-user/dashboard-user';
import { Error404 } from './page/error/error-404/error-404';

// AGREGADO POR AGUSTÍN: Guards para proteger rutas
// importación de guards eliminada

export const routes: Routes = [
    // Dashboard sin protección de guard
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      { path: 'admin', component: DashboardComponent },
      { path: 'user', component: DashboardUser }
    ]
  },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'objetivo', component: Objetivo },
      { path: 'quienes-somos', component: QuienesSomos },
  // Rutas de autenticación sin guard
      { path: 'login', component: Login },
      { path: 'registro', component: Registro },
      { path: 'gestor-espacios', component: GestorEspaciosComponent },
      { path: '**', component: Error404 } // Página 404
    ]
  }

];
