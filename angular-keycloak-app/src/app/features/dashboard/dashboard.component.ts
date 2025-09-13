import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../core/services/keycloak.service';
import { UserProfile } from '../../core/model/user-profile';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Incident } from '../../core/model/incident.model';
import { IncidentService } from '../../core/services/incident.service';
import { RecentIncidentsComponent } from './recent-incidents/recent-incidents';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule, RecentIncidentsComponent]
})
export class DashboardComponent implements OnInit {

  profile: UserProfile | undefined;

  openIncidents = 12;
  inProgressIncidents = 8;
  resolvedIncidents = 45;

  recentIncidents: Incident[] = [];

  constructor(
    public keycloakService: KeycloakService,
    private incidentService: IncidentService
  ) { }

  ngOnInit(): void {
    this.profile = this.keycloakService.profile;
    this.fetchIncidents();
  }

  fetchIncidents(): void {
    this.recentIncidents = this.incidentService.getIncidents();
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    console.log('Search query:', query);
    // Implement search logic here
  }

  onViewNotifications(): void {
    console.log('Viewing notifications');
    // Implement notification logic here
  }

  onNewIncident(): void {
    console.log('Creating new incident');
    // Implement new incident logic here
  }

  get userInitial(): string {
    if (this.profile?.firstName && this.profile.firstName.length > 0) {
      return this.profile.firstName.charAt(0).toUpperCase();
    }
    if (this.profile?.username && this.profile.username.length > 0) {
      return this.profile.username.charAt(0).toUpperCase();
    }
    return '';
  }
}
