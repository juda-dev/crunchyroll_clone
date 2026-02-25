import {Component, inject, signal} from '@angular/core';
import {HeaderAdmin} from '../../admin/components/header-admin/header-admin';
import {AnimeItem} from '../../shared/components/anime-item/anime-item';
import {SearchAnime} from '../../shared/components/search-anime/search-anime';
import {AnimeService} from '../../shared/services/anime.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {MatDialog} from '@angular/material/dialog';
import {AnimeForm} from '../../admin/components/forms/anime-form/anime-form';
import {NotificationService} from '../../../../shared/services/notification.service';
import {NEVER, tap, catchError, EMPTY} from 'rxjs';
import {DialogService} from '../../../../shared/services/dialog.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-animes',
  imports: [
    HeaderAdmin,
    AnimeItem,
    SearchAnime,
  ],
  templateUrl: './animes.html',
  styleUrl: './animes.css',
})
export class Animes {
  readonly dialog = inject(MatDialog);

  readonly search = signal<string>('');
  readonly resultsCount = signal<number>(0);

  readonly #animeService = inject(AnimeService);
  readonly #notification = inject(NotificationService);
  readonly #dialogService = inject(DialogService);
  animes: any = this.#animeService.animes();
  animesResource = rxResource({
    stream: () => this.#animeService.getAllAnimes(0, 10, this.search())
      .pipe(tap((pag) => {
        this.resultsCount.set(pag.totalElements)
      }))
  });

  #animeToRemoveSignal = signal<string>('');

  #animeToRemoveResource = rxResource({
    params: () => this.#animeToRemoveSignal(),
    stream: ({params: animeId}) => {
      if (animeId == '') return NEVER;
      return this.#animeService.removeAnime(animeId).pipe(
        tap(() => {
          this.#notification.success('Anime deleted successfully');
          this.#animeToRemoveSignal.set('');
          this.animesResource.reload();
        }),
        catchError(() => {
          this.#notification.error('Error deleting anime');
          return EMPTY;
        })
      );
    }
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

  removeAnime(animeId: string){
    this.#dialogService.confirm({
      title: 'Delete Anime',
      message: `Are you sure you want to delete anime. This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel'
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.#animeToRemoveSignal.set(animeId);
      }
    });
  }

  onSearch(searchTerm: string): void {
    this.search.set(searchTerm);
    this.animesResource.reload();
  }

  onClearSearch(): void {
    this.search.set('');
    this.animesResource.reload();
  }

  onResetSearch(): void {
    this.search.set('');
    this.animesResource.reload();
  }
}
