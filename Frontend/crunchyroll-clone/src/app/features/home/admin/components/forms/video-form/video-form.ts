import {Component, inject, input, signal, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FilesService} from '../../../../shared/services/files.service';
import {VideoService} from '../../../../shared/services/video.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../../../../shared/services/notification.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-video-form',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatIconButton,
    MatIcon,
    MatProgressBar
  ],
  templateUrl: './video-form.html',
  styleUrl: './video-form.css',
})
export class VideoForm implements OnInit, OnDestroy {
  readonly #fb = inject(FormBuilder);
  readonly #fileService = inject(FilesService);
  readonly #videoService = inject(VideoService);
  readonly #dialogRef = inject(MatDialogRef<VideoForm>);
  readonly #notificationService = inject(NotificationService);
  readonly #dialogData = inject(MAT_DIALOG_DATA, {optional: true});

  isSaving = signal(false);
  isEditMode = signal(false);
  animeId = signal<string>('');
  videoId = signal<string>('');
  originalPosterUuid = signal<string>('');
  originalSrcUuid = signal<string>('');

  form = signal<FormGroup>(this.#fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    duration: [0, [Validators.required, Validators.nullValidator]],
    published: [true, [Validators.required, Validators.nullValidator]],
    src: ['', Validators.required],
    poster: ['', Validators.required],
    animeId: ['', Validators.required]
  }));

  filesState = signal<{
    poster: {preview: string, progress: number, uploading: boolean},
    src: {preview: string, progress: number, uploading: boolean}
  }>({
    poster: {preview: '', progress: 0, uploading: false},
    src: {preview: '', progress: 0, uploading: false}
  });

    ngOnInit() {

    if (this.#dialogData) {
      if (this.#dialogData.animeId) {
        this.animeId.set(this.#dialogData.animeId);
      }

      if (this.#dialogData.video) {
        const video = this.#dialogData.video;
        this.isEditMode.set(true);
        this.videoId.set(video.id);
        this.originalPosterUuid.set(video.poster);
        this.originalSrcUuid.set(video.src);

        this.form().patchValue({
          title: video.title,
          description: video.description,
          duration: video.duration,
          published: video.published,
          poster: video.poster,
          src: video.src,
          animeId: video.animeId
        });

        if (video.poster) {
          this.#fileService.serveImage(video.poster).subscribe({
            next: (blob: Blob) => {
              this.updateFilesState('poster', {preview: URL.createObjectURL(blob)})
            },
            error: () => this.#notificationService.error('Error downloading protected image')
          })
        }
        if (video.src) {
          this.#fileService.serveVideo(video.src).subscribe({
            next: (blob: Blob) => {
              this.updateFilesState('src', {preview: URL.createObjectURL(blob)})
            },
            error: () => this.#notificationService.error('Error downloading protected video')
          })
        }
      }
    }


    this.form().patchValue({ animeId: this.animeId() });
  }

  private updateFilesState(type: 'poster' | 'src', partialState: Partial<{preview: string, progress: number, uploading: boolean}>) {
    this.filesState.update(state => {

      const previousPreview = state[type].preview;
      const newPreview = partialState['preview'];
      if (previousPreview && newPreview && previousPreview !== newPreview) {
        URL.revokeObjectURL(previousPreview);
      }
      return {
        ...state,
        [type]: {...state[type], ...partialState}
      };
    });
  }

  onFileSelected(event: Event, type: 'poster' | 'src') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    this.updateFilesState(type, {preview: localUrl, uploading: true, progress: 0});


    if (type === 'src') {
      this.extractVideoDuration(file).then(duration => {
        this.form().patchValue({ duration: Math.round(duration) });
      }).catch(() => {
        this.#notificationService.error('Could not extract video duration');
      });

      this.#fileService.uploadVideo(file).subscribe({
        next: (res) => {
          if (res.status === 'uploading') {
            this.updateFilesState(type, {progress: res.progress});
          } else if (res.status === 'done' && res.uuid) {
            this.form().patchValue({[type]: res.uuid});
            this.updateFilesState(type, {uploading: false});
            this.#notificationService.success('Video uploaded successfully')
          }
        },
        error: () => {
          this.updateFilesState(type, {preview: '', uploading: false, progress: 0});
          this.#notificationService.error('Error uploading video')
        }
      });
    } else {

      this.#fileService.uploadImage(file).subscribe({
        next: (res) => {
          if (res.status === 'uploading') {
            this.updateFilesState(type, {progress: res.progress});
          } else if (res.status === 'done' && res.uuid) {
            this.form().patchValue({[type]: res.uuid});
            this.updateFilesState(type, {uploading: false});
            this.#notificationService.success('Poster uploaded successfully')
          }
        },
        error: () => {
          this.updateFilesState(type, {preview: '', uploading: false, progress: 0});
          this.#notificationService.error('Error uploading poster')
        }
      });
    }
  }

  private extractVideoDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      const tempUrl = URL.createObjectURL(file);
      video.src = tempUrl;

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(tempUrl);
        resolve(video.duration);
      };

      video.onerror = () => {
        URL.revokeObjectURL(tempUrl);
        reject(new Error('Could not extract video duration'));
      };
    });
  }

  onSubmit() {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    this.isSaving.set(true);

    const currentPosterUuid = this.form().get('poster')?.value;
    const currentSrcUuid = this.form().get('src')?.value;
    const originalPosterUuid = this.originalPosterUuid();
    const originalSrcUuid = this.originalSrcUuid();

    if (this.isEditMode() && this.videoId()) {
      const formData = this.form().getRawValue();
      this.#videoService.updateVideoMetadata(this.videoId(), formData).subscribe({
        next: (resp) => {
          this.isSaving.set(false);
          this.#dialogRef.close(true);
          this.#notificationService.success(resp.message);

          this.deleteOldFilesIfReplaced(originalPosterUuid, originalSrcUuid, currentPosterUuid, currentSrcUuid);
        },
        error: (resp) => {
          this.isSaving.set(false);
          this.#notificationService.error(resp.error.message);
        }
      })
    } else {
      this.#videoService.createVideoMetadata(this.form().getRawValue()).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.#dialogRef.close(true);
          this.#notificationService.success('Video created successfully');
        },
        error: () => {
          this.isSaving.set(false);
          this.#notificationService.error('Error creating video');
        }
      });
    }
  }

  private deleteOldFilesIfReplaced(
    originalPosterUuid: string,
    originalSrcUuid: string,
    currentPosterUuid: string,
    currentSrcUuid: string
  ) {
    const deleteObservables = [];

    if (originalPosterUuid && originalPosterUuid !== currentPosterUuid) {
      deleteObservables.push(this.#fileService.deleteImage(originalPosterUuid));
    }

    if (originalSrcUuid && originalSrcUuid !== currentSrcUuid) {
      deleteObservables.push(this.#fileService.deleteVideo(originalSrcUuid));
    }

    if (deleteObservables.length > 0) {
      forkJoin(deleteObservables).subscribe({
        next: () => {
          this.#notificationService.success('Old files deleted successfully');
          this.originalPosterUuid.set('');
          this.originalSrcUuid.set('');
        },
        error: (resp) => {
          this.#notificationService.error(resp.error.message)
        }
      });
    }
  }

  togglePublished() {
    const currentValue = this.form().get('published')?.value;
    this.form().patchValue({ published: !currentValue });
    this.form().get('published')?.markAsDirty();
  }

  ngOnDestroy() {

    const state = this.filesState();
    if (state.poster.preview) {
      URL.revokeObjectURL(state.poster.preview);
    }
    if (state.src.preview) {
      URL.revokeObjectURL(state.src.preview);
    }
  }

  close() {
    const currentPosterUuid = this.form().get('poster')?.value;
    const currentSrcUuid = this.form().get('src')?.value;
    const originalPosterUuid = this.originalPosterUuid();
    const originalSrcUuid = this.originalSrcUuid();

    if (currentPosterUuid && currentPosterUuid !== originalPosterUuid) {
      this.#fileService.deleteImage(currentPosterUuid).subscribe({
        error: (resp) => this.#notificationService.error(resp.error.message)
      });
    }

    if (currentSrcUuid && currentSrcUuid !== originalSrcUuid) {
      this.#fileService.deleteVideo(currentSrcUuid).subscribe({
        error: (resp) => this.#notificationService.error(resp.error.message)
      });
    }

    this.#dialogRef.close();
  }
}
