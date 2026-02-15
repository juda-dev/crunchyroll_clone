import {Routes} from '@angular/router';

export enum AUTH_PAGES {
  AUTH = 'auth',
  LOGIN = 'login',
  REGISTER = 'register'
}

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: AUTH_PAGES.LOGIN,
        loadComponent: () => import('./pages/login/login')
          .then(p => p.Login)
      },
    ]
  }
]
