import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/public/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/public/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/public/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  {
  path: 'profile',
  canActivate: [AuthGuard],
  loadComponent: () =>
    import('./pages/private/profile/profile.component').then(
      (m) => m.ProfileComponent
    ),
},

  { path: '**', redirectTo: 'login' },
];
