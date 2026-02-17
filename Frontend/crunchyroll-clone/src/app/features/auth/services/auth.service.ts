import {inject, Injectable} from '@angular/core';
import {AuthServiceAbstract} from './auth.service.abstract';
import {map, Observable} from "rxjs";
import {AuthLogin} from "../interfaces/auth-login.interface";
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {email} from '@angular/forms/signals';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AuthServiceAbstract {
  readonly #httpClient = inject(HttpClient);
  readonly #tokenStorageService = inject(TokenStorageService);

  override login(user: AuthLogin): Observable<AuthLogin> {
    return this.#httpClient.post<AuthLogin>(`${this.API_ENDPOINT}/login`, user)
      .pipe(
        map((resp: any) => {
          this.#tokenStorageService.token = resp.token;
          return resp;
        })
      )
  }

  override register(user: AuthLogin): Observable<AuthLogin> {
    return this.#httpClient.post<AuthLogin>(`${this.API_ENDPOINT}/signup`, user)
  }

  override resendVerificationEmail(email: string): Observable<any> {
    return this.#httpClient.post<any>(`${this.API_ENDPOINT}/resend-verification-email`, {email});
  }

  override forgotPassword(email: string): Observable<any> {
    return this.#httpClient.post<any>(`${this.API_ENDPOINT}/forgot-password`, {email});
  }

  override verifyEmail(token: string): Observable<any> {
    return this.#httpClient.get(`${this.API_ENDPOINT}/verify-email?token=${token}`);
  }
}
