import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {HOME_PAGES} from '../../../home.routes';
import {TokenStorageService} from '../../../../../shared/services/token-storage.service';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header-admin',
  imports: [
    MatToolbar,
    MatMenuTrigger,
    MatMenu,
    MatIcon,
    MatButton,
    MatMenuItem,
    NgOptimizedImage
  ],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.css',
})
export class HeaderAdmin {
  readonly #router = inject(Router);
  readonly #tokenStorageService = inject(TokenStorageService);

  readonly user = this.#tokenStorageService.currentUser;

  navigateHome() {
    this.#router.navigate([HOME_PAGES.HOME, HOME_PAGES.ANIMES])
  }

  logout() {
    this.#tokenStorageService.logout();
  }
}
