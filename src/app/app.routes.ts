import { Routes } from '@angular/router';
import { Home } from './page/home/home';
import { Objetivo } from './page/objetivo/objetivo';
import { QuienesSomos } from './page/quienes-somos/quienes-somos';
import { Login } from './page/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'objetivo', component: Objetivo },
  { path: 'quienes-somos', component: QuienesSomos },
  { path: 'login', component: Login } 
];
