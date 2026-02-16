import {Component, computed, effect, inject, signal} from '@angular/core';
import {LoginForm} from '../../components/login-form/login-form';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AuthLogin} from '../../interfaces/auth-login.interface';
import {rxResource} from '@angular/core/rxjs-interop';
import {NEVER, tap} from 'rxjs';
import {NotificationService} from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-login',
  imports: [
    LoginForm
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly notification = inject(NotificationService);
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  readonly loginSignal = signal<AuthLogin>({email: '', password: ''});
  readonly loginResource = rxResource({
    params: () => this.loginSignal(),
    stream: ({params: login}) => this.#isLoginEmpty(login) ? NEVER : this.#authService.login(login).pipe(
      tap({
        error: (err) => {
          const errorMsg = err.error.message;
          this.notification.error(errorMsg);
        }
      })
    )
  })

  isLoginResourceCompleted = computed(() => this.loginResource.status() === 'resolved');

  navigateEffect = effect(() => {
    if (this.isLoginResourceCompleted()) {
      this.#router.navigate(['/']); /* Temporary */
    }
  })

  #isLoginEmpty(login: AuthLogin) {
    return login.password === '' || login.email === '';
  }

  login(login: AuthLogin) {
    this.loginSignal.set(login);
  }
}
