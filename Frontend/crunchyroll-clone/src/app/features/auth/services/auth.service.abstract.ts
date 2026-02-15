import {Observable} from 'rxjs';
import {AuthLogin} from '../interfaces/auth-login.interface';

export abstract class AuthServiceAbstract {
  protected readonly API_ENDPOINT = 'http://localhost:8080/auth';

  abstract login(user: AuthLogin): Observable<AuthLogin>;

  abstract register(user: AuthLogin): Observable<AuthLogin>;
}
