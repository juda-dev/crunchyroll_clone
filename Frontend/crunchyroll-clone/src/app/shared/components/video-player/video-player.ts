import { Component, ElementRef, inject, input, output, signal, viewChild, effect, afterNextRender, computed, DestroyRef, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.html',
  styleUrl: './video-player.css',
})
export class VideoPlayer {
  private readonly dialogRef = inject(MatDialogRef<VideoPlayer>, { optional: true });
  private readonly dialogData = inject<any>(MAT_DIALOG_DATA, { optional: true });
  private readonly destroyRef = inject(DestroyRef);

  readonly videoUrlInput = input<string>();
  readonly posterUrlInput = input<string>();
  readonly titleInput = input<string>('');
  readonly animeNameInput = input<string>('');

  readonly closed = output<void>();

  readonly videoUrl = computed(() => this.dialogData?.videoUrl ?? this.videoUrlInput());
  readonly posterUrl = computed(() => this.dialogData?.posterUrl ?? this.posterUrlInput());
  readonly title = computed(() => this.dialogData?.title ?? this.titleInput());
  readonly animeName = computed(() => this.dialogData?.episode ?? this.animeNameInput());

  readonly videoRef = viewChild<ElementRef<HTMLVideoElement>>('videoElement');

  readonly isPlaying = signal(false);
  readonly currentTime = signal(0);
  readonly duration = signal(0);
  readonly volume = signal(1);
  readonly isMuted = signal(false);
  readonly isFullscreen = signal(false);
  readonly showControls = signal(true);
  readonly controlsTimeout = signal<any>(null);

  private readonly elementRef = inject(ElementRef);
  private videoElement: HTMLVideoElement | null = null;

  constructor() {
    afterNextRender(() => {
      this.videoElement = this.videoRef()?.nativeElement ?? null;
      if (this.videoElement) {
        this.setupVideoEvents();
        this.videoElement.volume = this.volume();
        this.videoElement.muted = this.isMuted();
      }
      this.setupFullscreenEvents();
    });

    effect(() => {
      const volume = this.volume();
      if (this.videoElement) {
        this.videoElement.volume = volume;
      }
    });

    effect(() => {
      const muted = this.isMuted();
      if (this.videoElement) {
        this.videoElement.muted = muted;
      }
    });
  }

  ngOnDestroy(): void {
    this.cleanupBlobUrls();
    if (this.controlsTimeout()) clearTimeout(this.controlsTimeout());
  }

  private cleanupBlobUrls(): void {
    const videoUrl = this.videoUrl();
    const posterUrl = this.posterUrl();
    if (videoUrl?.startsWith('blob:')) URL.revokeObjectURL(videoUrl);
    if (posterUrl?.startsWith('blob:')) URL.revokeObjectURL(posterUrl);
  }

  private setupVideoEvents(): void {
    if (!this.videoElement) return;

    this.videoElement.addEventListener('timeupdate', () => {
      this.currentTime.set(this.videoElement!.currentTime);
    });

    this.videoElement.addEventListener('loadedmetadata', () => {
      this.duration.set(this.videoElement!.duration);
    });

    this.videoElement.addEventListener('ended', () => {
      this.isPlaying.set(false);
    });

    this.videoElement.addEventListener('play', () => {
      this.isPlaying.set(true);
    });

    this.videoElement.addEventListener('pause', () => {
      this.isPlaying.set(false);
    });
  }

  togglePlay(): void {
    if (!this.videoElement) return;
    if (this.isPlaying()) {
      this.videoElement.pause();
    } else {
      this.videoElement.play().catch(() => {
        this.isPlaying.set(false);
      });
    }
  }

  seekForward(): void {
    if (!this.videoElement) return;
    this.videoElement.currentTime = Math.min(this.duration(), this.videoElement.currentTime + 2);
  }

  seekBackward(): void {
    if (!this.videoElement) return;
    this.videoElement.currentTime = Math.max(0, this.videoElement.currentTime - 2);
  }

  toggleMute(): void {
    this.isMuted.set(!this.isMuted());
  }

  setVolume(value: number): void {
    this.volume.set(value);
    if (value > 0) this.isMuted.set(false);
  }

  toggleFullscreen(): void {
    const container = this.elementRef.nativeElement.querySelector('.video-wrapper');
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        this.isFullscreen.set(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        this.isFullscreen.set(false);
      }).catch(() => {});
    }
  }

  closePlayer(): void {
    this.closed.emit();
    this.dialogRef?.close();
  }

  seekTo(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.videoElement || this.duration() <= 0) return;
    const progressContainer = event.currentTarget as HTMLElement;
    const rect = progressContainer.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * this.duration();
    this.videoElement.currentTime = Math.max(0, Math.min(this.duration(), newTime));
  }

  formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` : `${m}:${s.toString().padStart(2, '0')}`;
  }

  hideControls(): void {
    if (this.controlsTimeout()) clearTimeout(this.controlsTimeout());
    this.controlsTimeout.set(setTimeout(() => this.showControls.set(false), 2000));
  }

  showControlsAndReset(): void {
    this.showControls.set(true);
    this.hideControls();
  }

  private setupFullscreenEvents(): void {
    const handleFullscreenChange = () => {
      this.isFullscreen.set(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    this.destroyRef.onDestroy(() => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    });
  }
}
