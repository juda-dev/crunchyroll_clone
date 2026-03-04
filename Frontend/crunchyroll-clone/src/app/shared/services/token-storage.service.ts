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

  #roleUser = signal<string>('');
  readonly roleUser = computed(() => this.#roleUser());
  #roleCurrentUser = localStorage.getItem('roleUser') || '';

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

  set currentRoleUser(roleUser: string){
    this.#roleCurrentUser = roleUser;
    localStorage.setItem('roleUser', roleUser);
  }

  get currentRoleUser(){
    return this.#roleCurrentUser;
  }

  logout() {
    this.token = '';
    this.currentUser = '';
    this.currentRoleUser = '';
    this.#router.navigate(['/']);
  }
}
