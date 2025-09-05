import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from '../services/keycloak.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);
  const token = keycloakService.keycloak.token;

  if (token && req.url.startsWith('http://localhost:8081')) {
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  return next(req);
};
