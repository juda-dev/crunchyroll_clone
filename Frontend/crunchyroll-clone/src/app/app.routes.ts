import {Routes} from '@angular/router';
import {Landing} from './features/landing/landing';
import {AUTH_PAGES} from './features/auth/auth.routes';
import {HOME_PAGES} from './features/home/home.routes';
import {authGuard} from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: Landing
      },
      {
        path: AUTH_PAGES.AUTH,
        loadChildren: () => import('./features/auth/auth.routes')
          .then(r => r.AUTH_ROUTES)
      },
      {
        path: HOME_PAGES.HOME,
        loadChildren: () => import("./features/home/home.routes")
          .then(p => p.HOME_ROUTES),
        canActivate: [authGuard]
      }
    ]
  },
  {path: '**', redirectTo: ''}
];
