import {Component, computed, effect, inject, signal} from '@angular/core';
import {LoginForm} from '../../components/login-form/login-form';
import {RegisterForm} from '../../components/register-form/register-form';
import {AuthLogin} from '../../interfaces/auth-login.interface';
import {NotificationService} from '../../../../shared/services/notification.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {rxResource} from '@angular/core/rxjs-interop';
import {NEVER, tap} from 'rxjs';
import {FullScreenLoaderService} from '../../../../shared/loaders/full-screen/full-screen-loader.service';
import {FullScreenLoader} from '../../../../shared/loaders/full-screen/full-screen-loader/full-screen-loader';

@Component({
  selector: 'app-register',
  imports: [
    RegisterForm,
    FullScreenLoader
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly #loaderService = inject(FullScreenLoaderService);
  readonly notification = inject(NotificationService);
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  readonly registerSignal = signal<AuthLogin>({email: '', password: ''});
  readonly registerResource = rxResource({
    params: () => this.registerSignal(),
    stream: ({params: register}) => {
      if (this.#isRegisterEmpty(register)) return NEVER;
      this.#loaderService.show();
      return this.#authService.register(register).pipe(tap({
        error: (err) => {
          const errorMsg = err.error.message;
          this.notification.error(errorMsg);
        },
        next: () => {
          this.notification.success('Registration successful, please check your email inbox to confirm your account.');
        },
        finalize: () => this.#loaderService.hide()
      }))
    }
  })

  isRegisterResourceCompleted = computed(() => this.registerResource.status() === 'resolved');

  navigateEffect = effect(() => {
    if (this.isRegisterResourceCompleted()) {
      this.#router.navigate(['/']); /* Temporary */
    }
  })

  #isRegisterEmpty(register: AuthLogin) {
    return register.password === '' || register.email === '';
  }

  register(user: AuthLogin) {
    this.registerSignal.set(user);
  }
}
