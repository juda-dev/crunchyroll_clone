import {Component, computed, effect, inject, signal} from '@angular/core';
import {LoginForm} from '../../components/login-form/login-form';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AuthLogin} from '../../interfaces/auth-login.interface';
import {rxResource} from '@angular/core/rxjs-interop';
import {NEVER, tap} from 'rxjs';
import {NotificationService} from '../../../../shared/services/notification.service';
import {FullScreenLoaderService} from '../../../../shared/loaders/full-screen/full-screen-loader.service';
import {FullScreenLoader} from '../../../../shared/loaders/full-screen/full-screen-loader/full-screen-loader';

@Component({
  selector: 'app-login',
  imports: [
    LoginForm,
    FullScreenLoader
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showResendButtonSignal = signal<boolean>(false);

  readonly notification = inject(NotificationService);
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  readonly #loaderService = inject(FullScreenLoaderService);

  readonly loginSignal = signal<AuthLogin>({email: '', password: ''});
  readonly resendEmailSignal = signal<string>('');

  readonly loginResource = rxResource({
    params: () => this.loginSignal(),
    stream: ({params: login}) => this.#isLoginEmpty(login) ? NEVER : this.#authService.login(login).pipe(
      tap({
        subscribe: () => this.#loaderService.show(),
        error: (err) => {
          if (err.error.code == 'ERR_AUTH_004'){
            this.showResendButtonSignal.set(true);
          }
          const errorMsg = err.error.message;
          this.notification.error(errorMsg);
        },
        finalize: () => this.#loaderService.hide()
      })
    )
  });
  readonly resendEmailResource = rxResource({
    params: () => this.resendEmailSignal(),
    stream: ({params: email}) => {
      if (!email) {
        return NEVER;
      }

      return this.#authService.resendVerificationEmail(email)
        .pipe(
          tap({
            subscribe: () => this.#loaderService.show(),
            next: () => this.notification.success('Verification email send successfully'),
            error: (err) => this.notification.error(err.error.messsage),
            finalize: () => {
              this.#loaderService.hide();
              this.showResendButtonSignal.set(false)
            }
          })
        )
    }
  });


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

  resendVerificationEmail(){
    const email = this.loginSignal().email;
    if (!email) {
      this.notification.error('Please enter your email address first.');
      return;
    }
    this.resendEmailSignal.set(email);
  }

}
