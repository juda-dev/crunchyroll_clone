import { Component, inject, input, output, signal, effect, DestroyRef, OnDestroy } from '@angular/core';
import {FilesService} from '../../../features/home/shared/services/files.service';


@Component({
  selector: 'app-anime-carousel',
  templateUrl: './anime-carousel.html',
  styleUrl: './anime-carousel.css',
})
export class AnimeCarousel implements OnDestroy {
  private readonly filesService = inject(FilesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly animes = input<any[]>([]);
  readonly watchNow = output<any>();

  readonly currentIndex = signal(0);
  readonly bannerUrls = signal<Map<string, string>>(new Map());
  private readonly cleanupUrls = new Set<string>();

  constructor() {
    effect(() => {
      const animesList = this.animes();
      const currentBannerUuids = new Set<string>();

      animesList.forEach(anime => {
        if (anime.banner) {
          currentBannerUuids.add(anime.banner);
          if (!this.bannerUrls().has(anime.banner)) {
            this.loadBannerImage(anime.banner);
          }
        }
      });

      this.cleanupUnusedBanners(currentBannerUuids);
    });
  }

  private loadBannerImage(bannerUuid: string): void {
    this.filesService.serveImage(bannerUuid).subscribe({
      next: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const newMap = new Map(this.bannerUrls());
        newMap.set(bannerUuid, url);
        this.bannerUrls.set(newMap);
        this.cleanupUrls.add(url);
      }
    });
  }

  private cleanupUnusedBanners(currentUuids: Set<string>): void {
    const currentUrls = this.bannerUrls();
    const urlsToRemove: string[] = [];

    currentUrls.forEach((url, uuid) => {
      if (!currentUuids.has(uuid)) {
        urlsToRemove.push(url);
        const newMap = new Map(currentUrls);
        newMap.delete(uuid);
        this.bannerUrls.set(newMap);
      }
    });

    urlsToRemove.forEach(url => {
      URL.revokeObjectURL(url);
      this.cleanupUrls.delete(url);
    });
  }

  ngOnDestroy(): void {
    this.cleanupUrls.forEach(url => URL.revokeObjectURL(url));
    this.cleanupUrls.clear();
  }

  getBannerUrl(anime: any): string {
    if (!anime?.banner) return '';
    return this.bannerUrls().get(anime.banner) || '';
  }

  onWatchNow(anime: any): void {
    this.watchNow.emit(anime);
  }

  nextSlide(): void {
    if (this.animes().length > 0) {
      this.currentIndex.set((this.currentIndex() + 1) % this.animes().length);
    }
  }

  prevSlide(): void {
    if (this.animes().length > 0) {
      this.currentIndex.set((this.currentIndex() - 1 + this.animes().length) % this.animes().length);
    }
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.animes().length) {
      this.currentIndex.set(index);
    }
  }
}
