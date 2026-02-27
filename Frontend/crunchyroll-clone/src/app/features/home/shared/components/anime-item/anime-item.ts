import {Component, input, output} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ImageViewer} from '../../../../../shared/components/image-viewer/image-viewer';

@Component({
  selector: 'app-anime-item',
  imports: [
    MatIconButton,
    MatIcon,
    ImageViewer
  ],
  templateUrl: './anime-item.html',
  styleUrl: './anime-item.css',
})
export class AnimeItem {
  readonly anime = input.required<any>();
  removeAnime = output<any>();

  remove(anime: any){
    this.removeAnime.emit(anime);
  }
}
