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
}
