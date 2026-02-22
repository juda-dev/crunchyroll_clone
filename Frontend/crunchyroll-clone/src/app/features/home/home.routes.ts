import {Routes} from '@angular/router';

export enum HOME_PAGES {
  HOME = 'home',
  ANIMES = 'animes'
}

export const HOME_ROUTES: Routes = [{
  path: '',
  children: [
    {
      path: HOME_PAGES.ANIMES,
      loadComponent: () => import('./pages/animes/animes')
        .then(p => p.Animes)
    }
  ]
},
  {path: '**', redirectTo: HOME_PAGES.ANIMES}
]
