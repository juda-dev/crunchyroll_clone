import {Component, inject} from '@angular/core';
import {HeaderAdmin} from '../../admin/components/header-admin/header-admin';
import {AnimeItem} from '../../shared/components/anime-item/anime-item';
import {AnimeService} from '../../shared/services/anime.service';
import {rxResource} from '@angular/core/rxjs-interop';

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
  readonly #animeService = inject(AnimeService);
  animes: any = this.#animeService.animes();
  animesResource = rxResource({
    stream: () => this.#animeService.getAllAnimes(0, 10, '')
  })

}
