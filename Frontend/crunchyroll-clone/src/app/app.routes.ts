import { Routes } from '@angular/router';
import {Landing} from './features/landing/landing';

export enum FEATURES_PAGES {
}

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: Landing
      }
    ]
  }
];
