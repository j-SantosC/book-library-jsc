// app.routes.ts
import { Routes } from '@angular/router';
import { Login } from './library/pages/login/login';
import { Register } from './library/pages/register/register';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Rutas de autenticación (sin lazy loading)
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Ruta de la biblioteca (con lazy loading y guard)
  {
    path: 'library',
    loadChildren: () => import('./library/library-module').then(m => m.LibraryModule),
    canActivate: [AuthGuard], // Proteger con el guard
  },

  // Redirección por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Ruta wildcard para manejar rutas no encontradas
  { path: '**', redirectTo: 'login' },
];
