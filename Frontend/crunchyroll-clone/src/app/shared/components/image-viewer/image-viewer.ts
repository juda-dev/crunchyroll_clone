import {Component, effect, inject, input, OnDestroy, signal, untracked} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-image-viewer',
  imports: [],
  templateUrl: './image-viewer.html',
  styleUrl: './image-viewer.css',
})
export class ImageViewer implements OnDestroy {
  readonly #http = inject(HttpClient);

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

    const url = `http://localhost:8080/files/images/animes/posters/${id}`;

    this.#http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob: Blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.imageSrc.set(objectUrl);
      },
      error: (err) => console.error('Error downloading protected image', err)
    });
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
