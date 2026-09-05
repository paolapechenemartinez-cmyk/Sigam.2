import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'recuperar',
    pathMatch: 'full'
  },

  {
    path: 'recuperar',
    redirectTo: 'recuperar',
    pathMatch: 'full'
  },

  {
    path: 'login',
    // Aquí después colocaremos la pantalla de inicio de sesión
  },

  {
    path: '**',
    redirectTo: 'recuperar'
  }

];