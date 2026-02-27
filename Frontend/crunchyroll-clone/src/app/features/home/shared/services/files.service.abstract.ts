import {Observable} from 'rxjs';

export abstract class FilesServiceAbstract{
  protected readonly API_ENDPOINT = 'http://localhost:8080/files';

  abstract uploadImage(file: File): Observable<any>;
  abstract deleteImage(uuid: string): Observable<any>;

}
