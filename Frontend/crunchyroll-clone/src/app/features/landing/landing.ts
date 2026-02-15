import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AUTH_PAGES} from '../auth/auth.routes';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  readonly #router = inject(Router);

  login(){
    this.#router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN])
  }
}
