import {Component, computed, effect, inject, signal} from '@angular/core';
import {LoginForm} from '../../components/login-form/login-form';
import {RegisterForm} from '../../components/register-form/register-form';
import {AuthLogin} from '../../interfaces/auth-login.interface';
import {NotificationService} from '../../../../shared/services/notification.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {rxResource} from '@angular/core/rxjs-interop';
import {NEVER, tap} from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    RegisterForm
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly notification = inject(NotificationService);
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  readonly registerSignal = signal<AuthLogin>({email: '', password: ''});
  readonly registerResource = rxResource({
    params: () => this.registerSignal(),
    stream: ({params: register}) => this.#isRegisterEmpty(register) ? NEVER : this.#authService.register(register).pipe(tap({
      error: (err) => {
        const errorMsg = err.error.message;
        this.notification.error(errorMsg);
      }
    }))
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
