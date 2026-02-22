import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  readonly #router = inject(Router);

  #isLogin = signal(false);
  readonly isLogin = computed(() => this.#isLogin());
  #token = localStorage.getItem('token') || '';

  #user = signal<string>('');
  readonly user = computed(() => this.#user());
  #currentUser = localStorage.getItem('user') || '';

  constructor() {
    if (this.token) {
      this.#isLogin.set(true);
    }
  }

  set token(token: string) {
    this.#token = token;
    localStorage.setItem('token', token);
    const logged = token !== '';
    this.#isLogin.set(logged);
  }

  get token() {
    return this.#token;
  }

  set currentUser(user: string) {
    this.#currentUser = user;
    localStorage.setItem('user', user);
  }

  get currentUser() {
    return this.#currentUser;
  }

  logout() {
    this.token = '';
    this.currentUser = '';
    this.#router.navigate(['/']);
  }
}
