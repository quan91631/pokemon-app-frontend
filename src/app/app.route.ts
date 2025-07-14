import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
export const APP_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('./pages/pokemon/info/pokemon-info.component').then(
        (r) => r.PokemonInfoComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/pokemon/info/pokemon-info.component').then(
        (r) => r.PokemonInfoComponent
      ),
  },
];
