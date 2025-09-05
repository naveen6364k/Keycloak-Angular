# Angular Keycloak Integration

This document provides the complete code and configuration to integrate an Angular application with Keycloak for authentication.

## File Structure

```
angular-keycloak-app
├── src
│   ├── app
│   │   ├── core
│   │   │   ├── guard
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptor
│   │   │   │   └── auth.interceptor.ts
│   │   │   ├── model
│   │   │   │   └── user-profile.ts
│   │   │   └── services
│   │   │       └── keycloak.service.ts
│   │   ├── features
│   │   │   └── dashboard
│   │   │       ├── dashboard.component.css
│   │   │       ├── dashboard.component.html
│   │   │       └── dashboard.component.ts
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── main.ts
│   ...
...
```

## Code

### `keycloak.service.ts`

```typescript
import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from '../model/user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'ICQ',
        clientId: 'angular-client'
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  constructor() { }

  async init() {
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required',
    });

    if (authenticated) {
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak.token;
      // console.log(this._profile);
    }
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout({ redirectUri: 'http://localhost:4200' });
  }
}
```

### `user-profile.ts`

```typescript
export interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
}
```

### `auth.interceptor.ts`

```typescript
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
```

### `auth.guard.ts`

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  if (keycloakService.keycloak.authenticated) {
    return true;
  }

  await keycloakService.login();
  return false;
};
```

### `app.config.ts`

```typescript
import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { KeycloakService } from './core/services/keycloak.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';

function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ]
};
```

### `app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
```

### `dashboard.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../core/services/keycloak.service';
import { UserProfile } from '../../core/model/user-profile';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {

  profile: UserProfile | undefined;
  apiResponse: string | undefined;

  constructor(
    private keycloakService: KeycloakService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.profile = this.keycloakService.profile;
  }

  callApi() {
    this.http.get('http://localhost:8081/api/hello', { responseType: 'text' })
      .subscribe(response => this.apiResponse = response);
  }
}
```

### `dashboard.component.html`

```html
<div *ngIf="profile">
  <h1>Welcome, {{ profile.username }}</h1>
  <p>First Name: {{ profile.firstName }}</p>
  <p>Last Name: {{ profile.lastName }}</p>
  <p>Email: {{ profile.email }}</p>

  <button (click)="callApi()">Call Secured API</button>
  <div *ngIf="apiResponse">
    <h2>API Response:</h2>
    <p>{{ apiResponse }}</p>
  </div>

  <button (click)="keycloakService.logout()">Logout</button>
</div>
```

### `app.component.html`

```html
<router-outlet></router-outlet>
```

## How to run the application

1.  Make sure you have a running Keycloak instance on `http://localhost:8080` with the `ICQ` realm and `angular-client` client.
2.  Make sure you have a running Spring Boot application on `http://localhost:8081` with a secured endpoint at `/api/hello`.
3.  Run `npm install` to install the dependencies.
4.  Run `ng serve` to start the application.
5.  Open your browser to `http://localhost:4200`. You will be redirected to the Keycloak login page.
6.  After successful login, you will be redirected to the dashboard, where you can see your user information and call the secured API.
