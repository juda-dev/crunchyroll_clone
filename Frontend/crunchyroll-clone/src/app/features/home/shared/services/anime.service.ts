import {computed, inject, Injectable, signal} from '@angular/core';
import {AnimeServiceAbstract} from './anime.service.abstract';
import {delay, EMPTY, finalize, Observable, of, tap} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnimeService extends AnimeServiceAbstract {
  readonly #httpClient = inject(HttpClient);
  private animePage = signal(0);
  public loading = signal(false);

  override getAllAnimes(search: string): Observable<any> {
    if (this.loading()) return EMPTY;

    this.loading.set(true);

    return this.#httpClient.get<any>(`${this.API_ENDPOINT}?page=${this.animePage()}&size=10&search=${search}`).pipe(
      delay(1000),
      tap(() => {
        this.animePage.update(page => page + 1);
      }),
      finalize(() => {
        this.loading.set(false);
      })
    )
  }

  override createAnime(animeData: any): Observable<any> {
    return this.#httpClient.post(`${this.API_ENDPOINT}`, animeData);
  }

  override removeAnime(animeId: string): Observable<any> {
    return this.#httpClient.delete<any>(`${this.API_ENDPOINT}/${animeId}`);
  }

  override resetAnimePage() {
    this.animePage.set(0);
  }
}
