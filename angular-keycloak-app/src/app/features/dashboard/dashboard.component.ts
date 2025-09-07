import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../core/services/keycloak.service';
import { UserProfile } from '../../core/model/user-profile';
import { CommonModule } from '@angular/common';

export interface Incident {
  id: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  severity: 'High' | 'Medium' | 'Low';
  assignedTo: string;
  reportedBy: string;
  dateReported: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {

  profile: UserProfile | undefined;

  openIncidents = 12;
  inProgressIncidents = 8;
  resolvedIncidents = 45;

  recentIncidents: Incident[] = [];

  constructor(
    public keycloakService: KeycloakService,
  ) { }

  ngOnInit(): void {
    this.profile = this.keycloakService.profile;
    this.fetchIncidents();
  }

  fetchIncidents(): void {
    // Placeholder for fetching incidents from a backend API
    this.recentIncidents = [
      { id: 'INC001', status: 'Open', severity: 'High', assignedTo: 'Alex Bennett', reportedBy: 'Sarah Clark', dateReported: '2024-07-26' },
      { id: 'INC002', status: 'In Progress', severity: 'Medium', assignedTo: 'Emily Carter', reportedBy: 'David Lee', dateReported: '2024-07-25' },
      { id: 'INC003', status: 'Resolved', severity: 'Low', assignedTo: 'Michael Evans', reportedBy: 'Jessica Brown', dateReported: '2024-07-24' },
      { id: 'INC004', status: 'Open', severity: 'Medium', assignedTo: 'Alex Bennett', reportedBy: 'Robert Green', dateReported: '2024-07-23' },
      { id: 'INC005', status: 'In Progress', severity: 'High', assignedTo: 'Emily Carter', reportedBy: 'Laura White', dateReported: '2024-07-22' }
    ];
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
}
