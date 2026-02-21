import {Routes} from '@angular/router';
import {Landing} from './features/landing/landing';
import {AUTH_PAGES} from './features/auth/auth.routes';

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
      }
    ]
  },
  {path: '**', redirectTo: ''}
];
