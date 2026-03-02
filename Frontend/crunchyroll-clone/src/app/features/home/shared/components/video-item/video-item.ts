import {Component, inject, input, output} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {FilesService} from '../../services/files.service';
import {ImageViewer} from '../../../../../shared/components/image-viewer/image-viewer';

@Component({
  selector: 'app-video-item',
  imports: [
    MatIconButton,
    MatIcon,
    ImageViewer
  ],
  templateUrl: './video-item.html',
  styleUrl: './video-item.css',
})
export class VideoItem {
  animeName = input.required<string>();
  video = input.required<any>();
  readonly #fileService = inject(FilesService);

  updateVideo = output<any>();

  playVideo() {
  }

  editVideo(video: any) {
    this.updateVideo.emit(video);
  }

  removeVideo() {
  }
}
