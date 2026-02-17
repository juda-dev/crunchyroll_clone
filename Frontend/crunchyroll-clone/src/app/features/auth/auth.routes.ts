import {Routes} from '@angular/router';

export enum AUTH_PAGES {
  AUTH = 'auth',
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot-password'
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
      {
        path: AUTH_PAGES.REGISTER,
        loadComponent: () => import('./pages/register/register')
          .then(p => p.Register)
      },
      {
        path: AUTH_PAGES.FORGOT_PASSWORD,
        loadComponent: () => import('./pages/forgot-password/forgot-password')
          .then(p => p.ForgotPassword)
      }
    ]
  }
]
