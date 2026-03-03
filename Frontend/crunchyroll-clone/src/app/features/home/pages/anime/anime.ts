import {Component, inject, input, OnInit, signal} from '@angular/core';
import {HeaderAdmin} from '../../admin/components/header-admin/header-admin';
import {AnimeHeader} from '../../shared/components/anime-header/anime-header';
import {VideoItem} from '../../shared/components/video-item/video-item';
import {VideoService} from '../../shared/services/video.service';
import {LoadingMoreLoaderService} from '../../../../shared/loaders/loading-more/loading-more-loader.service';
import {MatDialog} from '@angular/material/dialog';
import {VideoForm} from '../../admin/components/forms/video-form/video-form';
import {NotificationService} from '../../../../shared/services/notification.service';
import {LoadingMoreLoader} from '../../../../shared/loaders/loading-more/loading-more-loader/loading-more';
import {rxResource} from '@angular/core/rxjs-interop';
import {catchError, EMPTY, forkJoin, NEVER, tap} from 'rxjs';
import {FilesService} from '../../shared/services/files.service';
import {DialogService} from '../../../../shared/services/dialog.service';

@Component({
  selector: 'app-anime',
  imports: [
    HeaderAdmin,
    AnimeHeader,
    VideoItem,
    LoadingMoreLoader
  ],
  templateUrl: './anime.html',
  styleUrl: './anime.css',
})
export class Anime implements OnInit {
  readonly #videoService = inject(VideoService);
  readonly #loaderService = inject(LoadingMoreLoaderService);
  readonly #fileService = inject(FilesService);
  readonly #dialogService = inject(DialogService);
  readonly dialog = inject(MatDialog);
  readonly #notification = inject(NotificationService);
  animeName = signal<string>('');

  videos: any = signal<any>([]);
  loadedVideosIds = new Set<string>();

  isLoading = this.#loaderService.isLoading;

  id = input.required<string>();

  onScroll(event: Event) {
    const target = event.target as HTMLElement;

    const pos = target.scrollTop + target.clientHeight;
    const max = target.scrollHeight;

    if (pos >= max - 200) {
      this.#loaderService.show();
      this.loadMoreVideos();
    }
  }

  constructor() {
    this.#videoService.resetVideosPage();
  }

  ngOnInit(): void {
    this.loadVideos();
  }

  setAnimeName(animeName: string) {
    this.animeName.set(animeName);
  }

  loadVideos() {
    this.#loaderService.show();
    this.#videoService.resetVideosPage();
    this.#videoService.getAllVideosAnime(this.id()).subscribe({
      next: (res) => {
        this.videos.set(res.content);
        this.loadedVideosIds.clear();
        this.updateLoadedVideosIds();
      },
      complete: () => this.#loaderService.hide()
    });
  }

  loadMoreVideos() {
    this.#loaderService.show();
    this.#videoService.getAllVideosAnime(this.id()).subscribe({
      next: (res) => {
        const newVideos = res.content.filter((video: { id: string; }) => !this.loadedVideosIds.has(video.id));

        this.videos.update((current: any) => [...current, ...newVideos]);

        this.updateLoadedVideosIds();
        this.#loaderService.hide()
      }
    });
  }

  updateLoadedVideosIds() {
    this.videos().forEach((video: { id: string; }) => this.loadedVideosIds.add(video.id))
  }

  openVideoModal(videoData?: any) {
    const dialogRef = this.dialog.open(VideoForm, {
      width: '95vw',
      maxWidth: '1600px',
      height: 'auto',
      maxHeight: '95vh',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      autoFocus: false,
      data: {
        animeId: this.id(),
        ...(videoData ? { video: videoData } : {})
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadVideos();
      }
    });
  }

  editVideo(video: any) {
    this.openVideoModal(video);
  }

  #videoToRemoveSignal = signal<string>('');

  #videoToRemoveResource = rxResource({
    params: () => this.#videoToRemoveSignal(),
    stream: ({params: videoUuid}) => {
      if (videoUuid == '') return NEVER;

      return this.#videoService.deleteVideoMetadata(videoUuid).pipe(
        tap(() => {
          this.#notification.success('Video deleted successfully');
          this.#videoToRemoveSignal.set('');
          this.loadVideos();
        }),
        catchError(() => {
          this.#notification.error('Error deleting video');
          return EMPTY;
        })
      )
    }
  })

  #filesToRemoveSignal = signal<{posterUuid: string, videoUuid: string}>({posterUuid: '', videoUuid: ''});

  #filesToRemoveResource = rxResource({
    params: () => this.#filesToRemoveSignal(),
    stream: ({params: files}) => {
      if (files.posterUuid == '' && files.videoUuid == '') return NEVER;

      const deleteObservables = [];

      if (files.posterUuid != '') deleteObservables.push(this.#fileService.deleteImage(files.posterUuid));
      if (files.videoUuid != '') deleteObservables.push(this.#fileService.deleteVideo(files.videoUuid));

      return forkJoin(deleteObservables).pipe(
        tap(() => {
          this.#notification.success('Files deleted successfully');
          this.#filesToRemoveSignal.set({videoUuid: '', posterUuid: ''});
        }),
        catchError((error) => {
          this.#notification.error(error.error?.message || 'Error deleting files');
          return EMPTY;
        })
      )
    }
  })

  deleteVideo(video: any){
    this.#dialogService.confirm({
      title: 'Delete Video',
      message: `Are you sure you want to delete video. This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel'
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.#videoToRemoveSignal.set(video.id);
        this.#filesToRemoveSignal.set({videoUuid: video.src, posterUuid: video.poster});
      }
    });
  }

  playVideo(video: any) {
    forkJoin({
      videoBlob: this.#fileService.serveVideo(video.src),
      posterBlob: this.#fileService.serveImage(video.poster)
    }).subscribe({
      next: ({ videoBlob, posterBlob }) => {
        const videoUrl = URL.createObjectURL(videoBlob);
        const posterUrl = URL.createObjectURL(posterBlob);
        this.#dialogService.video(videoUrl, video.title, this.animeName(), posterUrl);
      },
      error: () => this.#notification.error('Error loading video or image')
    });
  }
}
