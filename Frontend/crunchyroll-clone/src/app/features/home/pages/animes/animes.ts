import {Component, inject} from '@angular/core';
import {HeaderAdmin} from '../../admin/components/header-admin/header-admin';
import {AnimeItem} from '../../shared/components/anime-item/anime-item';
import {AnimeService} from '../../shared/services/anime.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {MatDialog} from '@angular/material/dialog';
import {AnimeForm} from '../../admin/components/forms/anime-form/anime-form';
import {NotificationService} from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-animes',
  imports: [
    HeaderAdmin,
    AnimeItem,
  ],
  templateUrl: './animes.html',
  styleUrl: './animes.css',
})
export class Animes {
  readonly dialog = inject(MatDialog);
  readonly #animeService = inject(AnimeService);
  readonly #notification = inject(NotificationService);
  animes: any = this.#animeService.animes();
  animesResource = rxResource({
    stream: () => this.#animeService.getAllAnimes(0, 10, '')
  })

  openAnimeModal() {
    const dialogRef = this.dialog.open(AnimeForm, {
      width: '95vw',
      maxWidth: '1600px',
      height: 'auto',
      maxHeight: '95vh',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.animesResource.reload()
      }
    });
  }
}
