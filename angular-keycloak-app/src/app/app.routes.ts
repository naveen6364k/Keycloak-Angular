import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './core/guard/auth.guard';
import { IncidentDetailsComponent } from './features/incident-details/incident-details.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { ProfileComponent } from './features/profile/profile.component';
import { IncidentListComponent } from './features/incident-list/incident-list.component';
import { ReportsComponent } from './features/reports/reports.component';
import { CreateIncidentComponent } from './features/create-incident/create-incident';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-incident',
    component: CreateIncidentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'incidents',
    component: IncidentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'incident/:id',
    component: IncidentDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
