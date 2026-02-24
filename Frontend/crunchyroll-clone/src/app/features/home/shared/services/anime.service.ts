import {computed, inject, Injectable, signal} from '@angular/core';
import {AnimeServiceAbstract} from './anime.service.abstract';
import {Observable, tap} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnimeService extends AnimeServiceAbstract {
  readonly #httpClient = inject(HttpClient);
  readonly #animesSignal = signal<any>(null);
  readonly animes = computed(() => this.#animesSignal);

  override getAllAnimes(page: number, size: number, search: string): Observable<any> {
    return this.#httpClient.get<any>(`${this.API_ENDPOINT}?page=${page}&size=${size}&search=${search}`)
      .pipe(tap(resp => this.#animesSignal.set(resp.content)))
  }

  override createAnime(animeData: any): Observable<any> {
    return this.#httpClient.post(`${this.API_ENDPOINT}`, animeData);
  }

  override removeAnime(animeId: string): Observable<any> {
    return this.#httpClient.delete<any>(`${this.API_ENDPOINT}/${animeId}`);
  }
}
