import {inject, Injectable, signal} from '@angular/core';
import {FilesServiceAbstract} from './files.service.abstract';
import {filter, map, Observable} from 'rxjs';
import {HttpClient, HttpEventType} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FilesService extends FilesServiceAbstract {
  readonly #httpClient = inject(HttpClient);

  override uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.#httpClient.post<{ uuid: string }>(`${this.API_ENDPOINT}/upload/image`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => {
        if (event.type === HttpEventType.UploadProgress) {
          return {status: 'uploading', progress: Math.round(100 * event.loaded / (event.total || 1))};
        }
        if (event.type === HttpEventType.Response) {
          return {status: 'done', uuid: event.body?.uuid, progress: 100};
        }
        return {status: 'pending', progress: 0};
      }),
      filter(res => res.status !== 'pending')
    );
  }

  override deleteImage(uuid: string): Observable<any> {
    return this.#httpClient.delete<{message: string}>(`${this.API_ENDPOINT}/delete/image/${uuid}`);
  }

  override serveImage(uuid: string): Observable<Blob> {
    return this.#httpClient.get(`${this.API_ENDPOINT}/images/animes/posters/${uuid}`, { responseType: 'blob' });
  }

  override uploadVideo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.#httpClient.post<{ uuid: string }>(`${this.API_ENDPOINT}/upload/video`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => {
        if (event.type === HttpEventType.UploadProgress) {
          return {status: 'uploading', progress: Math.round(100 * event.loaded / (event.total || 1))};
        }
        if (event.type === HttpEventType.Response) {
          return {status: 'done', uuid: event.body?.uuid, progress: 100};
        }
        return {status: 'pending', progress: 0};
      }),
      filter(res => res.status !== 'pending')
    );
  }

  override deleteVideo(uuid: string): Observable<any> {
    return this.#httpClient.delete<{message: string}>(`${this.API_ENDPOINT}/delete/video/${uuid}`);
  }

  override serveVideo(uuid: String): Observable<any> {
    return this.#httpClient.get(`${this.API_ENDPOINT}/videos/${uuid}`, { responseType: 'blob' });
  }
}
