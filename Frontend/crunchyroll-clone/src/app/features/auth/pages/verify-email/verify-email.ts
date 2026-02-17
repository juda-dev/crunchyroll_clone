import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../../../shared/services/notification.service';
import {FullScreenLoaderService} from '../../../../shared/loaders/full-screen/full-screen-loader.service';
import {FullScreenLoader} from '../../../../shared/loaders/full-screen/full-screen-loader/full-screen-loader';
import {AUTH_PAGES} from '../../auth.routes';

@Component({
  selector: 'app-verify-email',
  imports: [
    FullScreenLoader
  ],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail implements OnInit {
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #authService = inject(AuthService);
  readonly #notificationService = inject(NotificationService);
  readonly #loaderService = inject(FullScreenLoaderService);

  ngOnInit(): void {
    this.#loaderService.show();
    const token = this.#activatedRoute.snapshot.queryParams['token'];
    this.#authService.verifyEmail(token).subscribe({
      next: (resp) => {
        this.#notificationService.success(resp.message);
        this.#loaderService.hide();
        this.#router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN])
      },
      error: (err) => {
        this.#notificationService.error(err.error.message);
        this.#loaderService.hide();
        this.#router.navigate(['/'])
      }
    });
  }
}
