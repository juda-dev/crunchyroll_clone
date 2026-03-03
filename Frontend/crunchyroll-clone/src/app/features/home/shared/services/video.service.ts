import {inject, Injectable, signal} from '@angular/core';
import {VideoServiceAbstract} from './video.service.abstract';
import {delay, EMPTY, finalize, Observable, tap} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideoService extends VideoServiceAbstract {
  readonly #httpClient = inject(HttpClient);
  private videosPage = signal(0);
  public loading = signal(false);

    override getAllVideosAnime(animeUuid: string): Observable<any> {
      if (this.loading()) return EMPTY;

      this.loading.set(true);

      return this.#httpClient.get<any>(`${this.API_ENDPOINT}/${animeUuid}?page=${this.videosPage()}&size=4`).pipe(
        delay(350),
        tap(() => {
          this.videosPage.update(page => page + 1);
        }),
        finalize(() => {
          this.loading.set(false);
        })
      )
    }

  override resetVideosPage() {
    this.videosPage.set(0);
  }

  override updateVideoMetadata(videoUuid: string, videoData: any): Observable<any> {
    return this.#httpClient.put(`${this.API_ENDPOINT}/${videoUuid}`, videoData);
  }

  override createVideoMetadata(videoData: any): Observable<any> {
    return this.#httpClient.post(`${this.API_ENDPOINT}`, videoData);
  }

  override deleteVideoMetadata(videoUuid: string): Observable<any> {
    return this.#httpClient.delete(`${this.API_ENDPOINT}/${videoUuid}`);
  }
}
