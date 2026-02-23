import {inject, Injectable} from '@angular/core';
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
}
