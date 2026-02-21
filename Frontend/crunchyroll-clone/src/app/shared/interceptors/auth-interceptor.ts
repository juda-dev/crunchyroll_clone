import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorageService = inject(TokenStorageService);

  if (tokenStorageService.token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${tokenStorageService.token}`)
    })
  }

  return next(req);
};
