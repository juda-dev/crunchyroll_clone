import {Component, computed, effect, inject, signal} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../../../shared/services/notification.service';
import {AuthResetPassword} from '../../interfaces/auth-reset-password.interface';
import {rxResource} from '@angular/core/rxjs-interop';
import {NEVER, tap} from 'rxjs';
import {AUTH_PAGES} from '../../auth.routes';
import {ResetPasswordForm} from '../../components/reset-password-form/reset-password-form';

@Component({
  selector: 'app-reset-password',
  imports: [
    ResetPasswordForm
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  readonly #router = inject(Router);
  readonly #authService = inject(AuthService);
  readonly #notificationService = inject(NotificationService);

  readonly resetPasswordSignal = signal<AuthResetPassword>({token: '', newPassword: '', confirmPassword: ''});

  readonly resetPasswordResource = rxResource({
    params: () => this.resetPasswordSignal(),
    stream: ({params: rp}) => {
      if (this.#isResetPasswordEmpty(rp)) {
        return NEVER;
      }
      return this.#authService.resetPassword(rp).pipe(
        tap({
          next: (rp) => this.#notificationService.success(rp.message),
          error: (err) => {
            const erroMsg: string = err.error.message;
            this.#notificationService.error(erroMsg);
          }
        })
      )
    }
  });

  isResetPasswordResourceCompleted = computed(() => this.resetPasswordResource.status() === 'resolved' || this.resetPasswordResource.status() === 'error');

  navigateEffect = effect(() => {
    if (this.isResetPasswordResourceCompleted()) {
      this.#router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN]);
    }
  })

  #isResetPasswordEmpty(rp: AuthResetPassword) {
    return rp.newPassword === '' || rp.token === '';
  }

  resetPassword(rp: AuthResetPassword){
    this.resetPasswordSignal.set(rp);
  }
}
