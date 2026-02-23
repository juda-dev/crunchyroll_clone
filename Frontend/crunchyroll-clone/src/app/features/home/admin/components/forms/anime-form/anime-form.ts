import {Component, computed, inject, Signal, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AnimeService} from '../../../../shared/services/anime.service';
import {FilesService} from '../../../../shared/services/files.service';
import {MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../../../../shared/services/notification.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';

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

  isSaving = signal(false);
  imagesState = signal({
    poster: {preview: '', progress: 0, uploading: false},
    banner: {preview: '', progress: 0, uploading: false}
  });

  form: Signal<FormGroup> = computed(() => this.#fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    categories: [[] as string[], Validators.required],
    poster: ['', [Validators.required, Validators.nullValidator]],
    banner: ['', [Validators.required, Validators.nullValidator]]
  }));

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

    this.#animeService.createAnime(this.form().getRawValue()).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.#dialogRef.close(true);
        this.#notification.success('Anime created successfully')
      },
      error: () => {
        this.isSaving.set(false);
        this.#notification.error('Error creating anime');
      }
    });
  }

  private updateImageState(type: 'poster' | 'banner', partialState: Partial<any>) {
    this.imagesState.update(state => ({
      ...state,
      [type]: {...state[type], ...partialState}
    }));
  }

  close() {
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
