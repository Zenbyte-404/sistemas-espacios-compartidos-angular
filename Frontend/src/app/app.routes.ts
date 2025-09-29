import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';

import { Home } from './page/public/home/home';
import { Objetivo } from './page/info/objetivo/objetivo';
import { QuienesSomos } from './page/info/quienes-somos/quienes-somos';
import { Login } from './page/autenticacion/login/login';
import { GestorDatos } from './page/dashboard/componentes/gestor-datos/gestor-datos';
import { Dashboard } from './page/dashboard/dashboard';
import { from } from 'rxjs';
import { Error404 } from './page/error/error-404/error-404';
import { Singup } from './page/autenticacion/singup/singup';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'objetivo', component: Objetivo },
      { path: 'quienes-somos', component: QuienesSomos },
      { path: 'login', component: Login },
      { path: 'singup', component: Singup },
      { path: 'gestor-datos', component: GestorDatos },


      { path: '**', component: Error404}
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      { path: '', component: Dashboard }
    ]
  }
];
