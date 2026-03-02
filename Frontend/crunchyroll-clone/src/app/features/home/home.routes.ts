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
      pathMatch: "full",
      loadComponent: () => import('./pages/animes/animes')
        .then(p => p.Animes)
    },
    {
      path: `${HOME_PAGES.ANIMES}/:id`,
      pathMatch: "full",
      loadComponent: () => import('./pages/anime/anime')
        .then(p => p.Anime)
    }
  ]
},
  {path: '**', redirectTo: HOME_PAGES.ANIMES}
]
