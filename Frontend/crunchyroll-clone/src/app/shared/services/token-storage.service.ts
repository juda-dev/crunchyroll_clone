import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  #isLogin = signal(false);
  readonly isLogin = computed(() => this.#isLogin());
  #token = localStorage.getItem('token') || '';

  constructor() {
    if (this.token) {
      this.#isLogin.set(true);
    }
  }
  set token(token: string){
    this.#token = token;
    localStorage.setItem('token', token);
    const logged = token !== '';
    this.#isLogin.set(logged);
  }

  get token(){
    return this.#token;
  }

  logout() {
    this.token = '';
  }
}
