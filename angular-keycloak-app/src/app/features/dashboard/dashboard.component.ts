import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../core/services/keycloak.service';
import { UserProfile } from '../../core/model/user-profile';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
  private allIncidents: Incident[] = [];

  constructor(
    public keycloakService: KeycloakService,
    private incidentService: IncidentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profile = this.keycloakService.profile;
    this.fetchIncidents();
  }

  fetchIncidents(): void {
    this.allIncidents = this.incidentService.getIncidents();
    this.recentIncidents = this.allIncidents.slice(0, 5);
  }

  onSearch(query: string): void {
    const lowerCaseQuery = query.toLowerCase();
    if (lowerCaseQuery) {
      this.recentIncidents = this.allIncidents.filter(incident =>
        incident.description.toLowerCase().includes(lowerCaseQuery) ||
        incident.type.toLowerCase().includes(lowerCaseQuery)
      ).slice(0, 5);
    } else {
      this.recentIncidents = this.allIncidents.slice(0, 5);
    }
  }

  onViewNotifications(): void {
    console.log('Viewing notifications');
    // Implement notification logic here
  }

  onNewIncident(): void {
    this.router.navigate(['/create-incident']);
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
