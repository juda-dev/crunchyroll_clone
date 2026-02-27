import {Component, inject, OnInit, signal} from '@angular/core';
import {HeaderAdmin} from '../../admin/components/header-admin/header-admin';
import {AnimeItem} from '../../shared/components/anime-item/anime-item';
import {SearchAnime} from '../../shared/components/search-anime/search-anime';
import {AnimeService} from '../../shared/services/anime.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {MatDialog} from '@angular/material/dialog';
import {AnimeForm} from '../../admin/components/forms/anime-form/anime-form';
import {NotificationService} from '../../../../shared/services/notification.service';
import {NEVER, tap, catchError, EMPTY, forkJoin} from 'rxjs';
import {DialogService} from '../../../../shared/services/dialog.service';
import {LoadingMoreLoader} from '../../../../shared/loaders/loading-more/loading-more-loader/loading-more';
import {LoadingMoreLoaderService} from '../../../../shared/loaders/loading-more/loading-more-loader.service';
import {FilesService} from '../../shared/services/files.service';

@Component({
  selector: 'app-animes',
  imports: [
    HeaderAdmin,
    AnimeItem,
    SearchAnime,
    LoadingMoreLoader,
  ],
  templateUrl: './animes.html',
  styleUrl: './animes.css',
})
export class Animes implements OnInit {
  readonly dialog = inject(MatDialog);

  readonly search = signal<string>('');
  readonly resultsCount = signal<number>(0);

  readonly #animeService = inject(AnimeService);
  readonly #notification = inject(NotificationService);
  readonly #dialogService = inject(DialogService);
  readonly #loaderService = inject(LoadingMoreLoaderService);
  readonly #fileService = inject(FilesService);

  animes: any = signal<any>([]);
  loadedAnimesIds = new Set<string>();

  isLoading = this.#loaderService.isLoading;

  onScroll(event: Event) {
    const target = event.target as HTMLElement;

    const pos = target.scrollTop + target.clientHeight;
    const max = target.scrollHeight;

    if (pos >= max - 200) {
      this.#loaderService.show();
      this.loadMoreAnimes();
    }
  }

  constructor() {
    this.#animeService.resetAnimePage();
  }

  ngOnInit(): void {
    this.loadAnimes()
  }

  loadAnimes() {
    this.#loaderService.show();
    this.#animeService.resetAnimePage();
    this.#animeService.getAllAnimes(this.search()).subscribe({
      next: (res) => {
        this.resultsCount.set(res.totalElements);
        this.animes.set(res.content);
        this.loadedAnimesIds.clear();
        this.updateLoadedAnimesIds();
      },
      complete: () => this.#loaderService.hide()
    });
  }

  loadMoreAnimes() {
    this.#loaderService.show();
    this.#animeService.getAllAnimes(this.search()).subscribe({
      next: (res) => {
        const newAnimes = res.content.filter((anime: { id: string; }) => !this.loadedAnimesIds.has(anime.id));

        this.animes.update((current: any) => [...current, ...newAnimes]);

        this.updateLoadedAnimesIds();
        this.#loaderService.hide()
      }
    });
  }

  updateLoadedAnimesIds() {
    this.animes().forEach((anime: { id: string; }) => this.loadedAnimesIds.add(anime.id))
  }

  #animeToRemoveSignal = signal<string>('');

  #animeToRemoveResource = rxResource({
    params: () => this.#animeToRemoveSignal(),
    stream: ({params: animeId}) => {
      if (animeId == '') return NEVER;
      return this.#animeService.removeAnime(animeId).pipe(
        tap(() => {
          this.#notification.success('Anime deleted successfully');
          this.#animeToRemoveSignal.set('');
          this.loadAnimes();
        }),
        catchError(() => {
          this.#notification.error('Error deleting anime');
          return EMPTY;
        })
      );
    }
  })

  #imagesToRemoveSignal = signal<{posterUuid: string, bannerUuid: string}>({bannerUuid: '', posterUuid: ''});

  #imagesToRemoveResource = rxResource({
    params: () => this.#imagesToRemoveSignal(),
    stream: ({params: images}) => {
      if (images.bannerUuid === '' && images.posterUuid === '') return NEVER;

      const deleteObservables = [];
      if (images.posterUuid !== '') {
        deleteObservables.push(this.#fileService.deleteImage(images.posterUuid));
      }
      if (images.bannerUuid !== '') {
        deleteObservables.push(this.#fileService.deleteImage(images.bannerUuid));
      }

      return forkJoin(deleteObservables).pipe(
        tap(() => {
          this.#notification.success('Images deleted successfully');
          this.#imagesToRemoveSignal.set({bannerUuid: '', posterUuid: ''});
        }),
        catchError((error) => {
          this.#notification.error(error.error?.message || 'Error deleting images');
          return EMPTY;
        })
      );
    }
  })

  openAnimeModal(animeData?: any) {
    const dialogRef = this.dialog.open(AnimeForm, {
      width: '95vw',
      maxWidth: '1600px',
      height: 'auto',
      maxHeight: '95vh',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      autoFocus: false,
      data: animeData ? { anime: animeData } : null
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadAnimes()
      }
    });
  }

  editAnime(anime: any) {
    this.openAnimeModal(anime);
  }

  removeAnime(anime: any) {
    this.#dialogService.confirm({
      title: 'Delete Anime',
      message: `Are you sure you want to delete anime. This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel'
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.#animeToRemoveSignal.set(anime.id);
        this.#imagesToRemoveSignal.set({posterUuid: anime.poster, bannerUuid: anime.banner});
      }
    });
  }

  onSearch(searchTerm: string): void {
    this.search.set(searchTerm);
    this.loadAnimes()
  }

  onClearSearch(): void {
    this.search.set('');
    this.loadAnimes()
  }

  onResetSearch(): void {
    this.search.set('');
    this.loadAnimes()
  }
}
