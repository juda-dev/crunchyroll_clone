import {Component, effect, inject, input, OnDestroy, signal, untracked} from '@angular/core';
import {FilesService} from '../../../features/home/shared/services/files.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-image-viewer',
  imports: [],
  templateUrl: './image-viewer.html',
  styleUrl: './image-viewer.css',
})
export class ImageViewer implements OnDestroy {
  readonly #fileService = inject(FilesService);
  readonly #notificationService = inject(NotificationService);

  readonly imageId = input.required<string>();
  readonly altText = input<string>('Anime Image');

  readonly imageSrc = signal<string | null>(null);

  constructor() {
    effect(() => {
      const currentId = this.imageId();
      if (currentId) {
        this.fetchProtectedImage(currentId);
      }
    });
  }

  fetchProtectedImage(id: string) {
    this.cleanupMemory();
    this.imageSrc.set(null);

    this.#fileService.serveImage(id).subscribe({
      next: (blob: Blob) => {
        this.imageSrc.set(URL.createObjectURL(blob))
      },
      error: (resp) => {
        this.#notificationService.error(resp.error.message);
      }
    })
  }

  ngOnDestroy() {
    this.cleanupMemory();
  }

  private cleanupMemory() {
    const currentUrl = untracked(() => this.imageSrc());
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }
  }
}
