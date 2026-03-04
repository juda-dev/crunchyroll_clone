import {Component, inject, input, output} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ImageViewer} from '../../../../../shared/components/image-viewer/image-viewer';
import {TokenStorageService} from '../../../../../shared/services/token-storage.service';

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
  readonly #tokenStorageService = inject(TokenStorageService);
  isAdmin = this.#tokenStorageService.currentRoleUser == 'ADMIN';

  readonly anime = input.required<any>();
  removeAnime = output<any>();
  editAnime = output<any>();
  viewAnime = output<any>();

  remove(anime: any){
    this.removeAnime.emit(anime);
  }

  edit(anime: any) {
    this.editAnime.emit(anime);
  }

  view(anime: any){
    this.viewAnime.emit(anime);
  }
}
