import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialog, ConfirmationDialogData} from '../components/confirmation-dialog/confirmation-dialog';
import {Observable} from 'rxjs';
import {VideoPlayer} from '../components/video-player/video-player';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly dialog = inject(MatDialog);

  confirm(data: ConfirmationDialogData): Observable<boolean> {
    return this.dialog.open(ConfirmationDialog, {
      data,
      width: 'auto',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      autoFocus: false
    }).afterClosed();
  }

  video(videoUrl: string, title: string, episode: string, posterUrl: string) {
    this.dialog.open(VideoPlayer, {
      data: {
        videoUrl,
        title,
        episode,
        posterUrl
      },
      panelClass: 'video-player-dialog',
      width: '90vw',
      height: '90vh',
      maxWidth: '1200px',
      disableClose: false
    })
  }
}
