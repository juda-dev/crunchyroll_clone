import {Component, input} from '@angular/core';
import {HeaderAdmin} from '../../admin/components/header-admin/header-admin';
import {AnimeHeader} from '../../shared/components/anime-header/anime-header';

@Component({
  selector: 'app-anime',
  imports: [
    HeaderAdmin,
    AnimeHeader
  ],
  templateUrl: './anime.html',
  styleUrl: './anime.css',
})
export class Anime {
  id = input.required<string>();
}
