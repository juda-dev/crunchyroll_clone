import {Component, computed, inject, output, Signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthLogin} from '../../interfaces/auth-login.interface';
import {Router} from '@angular/router';
import {AUTH_PAGES} from '../../auth.routes';

@Component({
  selector: 'app-register-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  readonly #router = inject(Router);
  readonly #formBuilder = inject(FormBuilder);
  sendRegister = output<AuthLogin>();

  registerForm: Signal<FormGroup> = computed(() => this.#formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  }))

  register() {
    if (!this.registerForm().invalid) {
      const register: AuthLogin = this.registerForm().value;
      this.sendRegister.emit(register);
    }
  }

  login(){
    this.#router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN])
  }
}
