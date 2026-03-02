import {Component, computed, effect, inject, input, output, signal} from '@angular/core';
import {AnimeService} from '../../services/anime.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {FilesService} from '../../services/files.service';
import {of, tap} from 'rxjs';

@Component({
  selector: 'app-anime-header',
  imports: [],
  templateUrl: './anime-header.html',
  styleUrl: './anime-header.css',
})
export class AnimeHeader {
  readonly #fileService = inject(FilesService);
  readonly #animeService = inject(AnimeService);
  id = input.required<string>();
  animeName = output<string>();

  readonly #animeResource = rxResource({
    params: () => this.id(),
    stream: () => this.#animeService.getAnime(this.id()).pipe(tap((anime) => {
      this.animeName.emit(anime.name);
    }))
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

