import {Component, computed, inject, output, Signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthLogin} from '../../interfaces/auth-login.interface';
import {Router} from '@angular/router';
import {AUTH_PAGES} from '../../auth.routes';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  readonly #router = inject(Router);
  readonly #formBuilder = inject(FormBuilder);
  sendLogin = output<AuthLogin>();

  loginForm: Signal<FormGroup> = computed(() => this.#formBuilder
    .group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  )

  login() {
    if (!this.loginForm().invalid) {
      const login: AuthLogin = this.loginForm().value;
      this.sendLogin.emit(login);
    }
  }

  register() {
    this.#router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.REGISTER])
  }

  forgotPassword(){
    this.#router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.FORGOT_PASSWORD])
  }
}
