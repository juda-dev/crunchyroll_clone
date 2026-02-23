import {Observable} from 'rxjs';

export abstract class AnimeServiceAbstract{
  protected readonly API_ENDPOINT = 'http://localhost:8080/anime';

  abstract getAllAnimes(page: number, size: number, search: string): Observable<any>;

  abstract createAnime(animeData: any): Observable<any>;
}
