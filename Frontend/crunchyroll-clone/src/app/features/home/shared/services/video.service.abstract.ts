import {Observable} from 'rxjs';

export abstract class VideoServiceAbstract{
  protected readonly API_ENDPOINT = 'http://localhost:8080/videos';

  abstract getAllVideosAnime(animeUuid: string): Observable<any>;
  abstract resetVideosPage(): void;
  abstract updateVideoMetadata(videoUuid: string, videoData: any): Observable<any>;
  abstract createVideoMetadata(videoData: any): Observable<any>;
  abstract deleteVideoMetadata(videoUuid: string): Observable<any>;
}
