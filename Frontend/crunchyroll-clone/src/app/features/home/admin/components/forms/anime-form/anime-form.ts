import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AnimeService} from '../../../../shared/services/anime.service';
import {FilesService} from '../../../../shared/services/files.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NotificationService} from '../../../../../../shared/services/notification.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-anime-form',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatIconButton,
    MatIcon,
    MatProgressBar
  ],
  templateUrl: './anime-form.html',
  styleUrl: './anime-form.css',
})
export class AnimeForm {
  readonly #fb = inject(FormBuilder);
  readonly #animeService = inject(AnimeService);
  readonly #filesService = inject(FilesService);
  readonly #dialogRef = inject(MatDialogRef<AnimeForm>);
  readonly #notification = inject(NotificationService);
  readonly #http = inject(HttpClient);
  readonly #dialogData = inject(MAT_DIALOG_DATA, { optional: true });

  isSaving = signal(false);
  isEditMode = signal(false);
  animeId = signal<string>('');
  originalPosterUuid = signal<string>('');
  originalBannerUuid = signal<string>('');

  form = signal<FormGroup>(this.#fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    categories: [[] as string[], Validators.required],
    poster: ['', [Validators.required, Validators.nullValidator]],
    banner: ['', [Validators.required, Validators.nullValidator]]
  }));

  imagesState = signal({
    poster: {preview: '', progress: 0, uploading: false},
    banner: {preview: '', progress: 0, uploading: false}
  });

  constructor() {
    if (this.#dialogData && this.#dialogData.anime) {
      const anime = this.#dialogData.anime;
      this.isEditMode.set(true);
      this.animeId.set(anime.id);
      this.originalPosterUuid.set(anime.poster);
      this.originalBannerUuid.set(anime.banner);

      this.form().patchValue({
        name: anime.name,
        description: anime.description,
        categories: anime.categories || [],
        poster: anime.poster,
        banner: anime.banner
      });

      if (anime.poster) {
        const url = `http://localhost:8080/files/images/animes/posters/${anime.poster}`;
        let posterUrl: string = '';

        this.#http.get(url, { responseType: 'blob' }).subscribe({
          next: (blob: Blob) => {
            posterUrl = URL.createObjectURL(blob);
            this.updateImageState('poster', {
              preview: posterUrl
            });
          },
          error: () => this.#notification.error('Error downloading protected image')
        });

      }
      if (anime.banner) {
        const url = `http://localhost:8080/files/images/animes/banners/${anime.banner}`;
        let bannerUrl: string = '';

        this.#http.get(url, { responseType: 'blob' }).subscribe({
          next: (blob: Blob) => {
            bannerUrl = URL.createObjectURL(blob);
            this.updateImageState('banner', {
              preview: bannerUrl
            });
          },
          error: () => this.#notification.error('Error downloading protected image')
        });

      }
    }
  }

  availableCategories = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Music',
    'Romance',
    'Sci-Fi',
    'Seinen',
    'Shojo',
    'Shonen',
    'Slice of Life',
    'Sports',
    'Supernatural',
    'Thriller'
  ];

  onFileSelected(event: Event, type: 'poster' | 'banner') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    this.updateImageState(type, {preview: localUrl, uploading: true, progress: 0});

    this.#filesService.uploadImage(file).subscribe({
      next: (res) => {
        if (res.status === 'uploading') {
          this.updateImageState(type, {progress: res.progress});
        } else if (res.status === 'done' && res.uuid) {
          this.form().patchValue({[type]: res.uuid});
          this.updateImageState(type, {uploading: false});
          this.#notification.success('Image uploaded successfully')
        }
      },
      error: () => {
        this.updateImageState(type, {preview: '', uploading: false, progress: 0});
        this.#notification.error('Error uploading image')
      }
    });
  }

  onSubmit() {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    this.isSaving.set(true);

    const currentPosterUuid = this.form().get('poster')?.value;
    const currentBannerUuid = this.form().get('banner')?.value;
    const originalPosterUuid = this.originalPosterUuid();
    const originalBannerUuid = this.originalBannerUuid();

    if (this.isEditMode() && this.animeId()) {
      const formData = this.form().getRawValue();
      this.#animeService.updateAnime(this.animeId(), formData).subscribe({
        next: (resp) => {
          this.isSaving.set(false);
          this.#dialogRef.close(true);
          this.#notification.success(resp.message);

          this.deleteOldImagesIfReplaced(originalPosterUuid, originalBannerUuid, currentPosterUuid, currentBannerUuid);
        },
        error: (resp) => {
          this.isSaving.set(false);
          this.#notification.error(resp.error.message);
        }
      })
    } else {
      this.#animeService.createAnime(this.form().getRawValue()).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.#dialogRef.close(true);
          this.#notification.success('Anime created successfully');
        },
        error: () => {
          this.isSaving.set(false);
          this.#notification.error('Error creating anime');
        }
      });
    }
  }

  private updateImageState(type: 'poster' | 'banner', partialState: Partial<any>) {
    this.imagesState.update(state => ({
      ...state,
      [type]: {...state[type], ...partialState}
    }));
  }

  private deleteOldImagesIfReplaced(
    originalPosterUuid: string,
    originalBannerUuid: string,
    currentPosterUuid: string,
    currentBannerUuid: string
  ) {
    const deleteObservables = [];

    if (originalPosterUuid && originalPosterUuid !== currentPosterUuid) {
      deleteObservables.push(this.#filesService.deleteImage(originalPosterUuid));
    }

    if (originalBannerUuid && originalBannerUuid !== currentBannerUuid) {
      deleteObservables.push(this.#filesService.deleteImage(originalBannerUuid));
    }

    if (deleteObservables.length > 0) {
      forkJoin(deleteObservables).subscribe({
        next: () => {
          this.#notification.success('Old images deleted successfully');
          this.originalPosterUuid.set('');
          this.originalBannerUuid.set('');
        },
        error: (resp) => {
          this.#notification.error(resp.error.message)
        }
      });
    }
  }

  close() {
    const currentPosterUuid = this.form().get('poster')?.value;
    const currentBannerUuid = this.form().get('banner')?.value;
    const originalPosterUuid = this.originalPosterUuid();
    const originalBannerUuid = this.originalBannerUuid();

    if (currentPosterUuid && currentPosterUuid !== originalPosterUuid) {
      this.#filesService.deleteImage(currentPosterUuid).subscribe({
        error: (resp) => this.#notification.error(resp.error.message)
      });
    }

    if (currentBannerUuid && currentBannerUuid !== originalBannerUuid) {
      this.#filesService.deleteImage(currentBannerUuid).subscribe({
        error: (resp) => this.#notification.error(resp.error.message)
      });
    }

    this.#dialogRef.close();
  }

  toggleCategory(category: string) {
    const currentCategories = this.form().get('categories')?.value as string[];
    const index = currentCategories.indexOf(category);

    if (index > -1) {
      currentCategories.splice(index, 1);
    } else {
      currentCategories.push(category);
    }
    this.form().get('categories')?.setValue([...currentCategories]);
    this.form().get('categories')?.markAsDirty();
  }

  isCategorySelected(category: string): boolean {
    return (this.form().get('categories')?.value as string[]).includes(category);
  }
}
