import {Observable} from 'rxjs';
import {AuthLogin} from '../interfaces/auth-login.interface';
import {AuthResetPassword} from '../interfaces/auth-reset-password.interface';

export abstract class AuthServiceAbstract {
  protected readonly API_ENDPOINT = 'http://localhost:8080/auth';

  abstract login(user: AuthLogin): Observable<AuthLogin>;

  abstract register(user: AuthLogin): Observable<AuthLogin>;

  abstract resendVerificationEmail(email: string): Observable<any>;

  abstract forgotPassword(email: string): Observable<any>;

  abstract verifyEmail(token: string): Observable<any>;

  abstract resetPassword(resetPassword: AuthResetPassword): Observable<any>;
}
