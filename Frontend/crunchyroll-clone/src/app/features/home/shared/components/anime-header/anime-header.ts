import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {AnimeService} from '../../services/anime.service';
import {Router} from '@angular/router';
import {rxResource} from '@angular/core/rxjs-interop';
import {FilesService} from '../../services/files.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-anime-header',
  imports: [],
  templateUrl: './anime-header.html',
  styleUrl: './anime-header.css',
})
export class AnimeHeader {
  readonly #fileService = inject(FilesService);
  readonly #animeService = inject(AnimeService);
  readonly #router = inject(Router);
  id = input.required<string>();

  readonly #animeResource = rxResource({
    params: () => this.id(),
    stream: () => this.#animeService.getAnime(this.id())
  });

  readonly anime = computed(() => this.#animeResource.value() ?? {});

  readonly #bannerUuid = computed(() => this.anime().banner ?? null);
  readonly #bannerResource = rxResource({
    params: () => this.#bannerUuid(),
    stream: ({params: uuid}) => {
      if (!uuid) return of(null);
      return this.#fileService.serveImage(uuid);
    }
  });

  readonly imageSrc = signal<string>('');

  constructor() {
    effect((onCleanup) => {
      const blob = this.#bannerResource.value();

      if (blob) {
        const objectUrl = URL.createObjectURL(blob);
        this.imageSrc.set(objectUrl);

        onCleanup(() => {
          URL.revokeObjectURL(objectUrl);
        });
      } else {
        this.imageSrc.set('');
      }
    });
  }
}

