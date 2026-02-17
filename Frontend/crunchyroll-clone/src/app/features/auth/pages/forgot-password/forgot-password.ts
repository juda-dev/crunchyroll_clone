import {Component, inject, signal} from '@angular/core';
import {ForgotPasswordForm} from '../../components/forgot-password-form/forgot-password-form';
import {FullScreenLoader} from '../../../../shared/loaders/full-screen/full-screen-loader/full-screen-loader';
import {FullScreenLoaderService} from '../../../../shared/loaders/full-screen/full-screen-loader.service';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../../../shared/services/notification.service';
import {NEVER, tap} from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ForgotPasswordForm,
    FullScreenLoader
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  readonly #loaderService = inject(FullScreenLoaderService);
  readonly #authService = inject(AuthService);
  readonly #notificationService = inject(NotificationService);

  readonly forgotPasswordSignal = signal<string>( '');

  readonly forgotPasswordResource = rxResource({
    params: () => this.forgotPasswordSignal(),
    stream: ({params: email}) => {
      if (!email) {
        return NEVER;
      }
      this.#loaderService.show();
      return this.#authService.forgotPassword(email).pipe(
        tap({
          error: (err) => {
            const errorMsg = err.error.message;
            this.#notificationService.error(errorMsg);
          },
          next: (resp) => {
            this.#notificationService.success(resp.message)
          },
          finalize: () => this.#loaderService.hide()
        })
      )
    }
  });

  forgotPassword(forgotPassword: any) {
    this.forgotPasswordSignal.set(forgotPassword.email);
  }
}
