import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Incident } from '../../core/model/incident';
import { KeycloakService } from '../../core/services/keycloak.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  incidents: Incident[] = [];
  openIncidents: number = 0;
  inProgressIncidents: number = 0;
  resolvedIncidents: number = 0;

  constructor(public keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.loadIncidents();
    this.calculateIncidentCounts();
  }

  private loadIncidents(): void {
    this.incidents = [
      {
        id: 'INC-001',
        status: 'Open',
        severity: 'High',
        assignedTo: 'John Doe',
        reportedBy: 'Jane Smith',
        dateReported: '2023-10-27',
      },
      {
        id: 'INC-002',
        status: 'In Progress',
        severity: 'Medium',
        assignedTo: 'Peter Jones',
        reportedBy: 'Robert Brown',
        dateReported: '2023-10-26',
      },
      {
        id: 'INC-003',
        status: 'Resolved',
        severity: 'Low',
        assignedTo: 'Mary White',
        reportedBy: 'Susan Green',
        dateReported: '2023-10-25',
      },
      {
        id: 'INC-004',
        status: 'Open',
        severity: 'High',
        assignedTo: 'John Doe',
        reportedBy: 'James Wilson',
        dateReported: '2023-10-28',
      },
    ];
  }

  private calculateIncidentCounts(): void {
    this.openIncidents = this.incidents.filter(
      (incident) => incident.status === 'Open'
    ).length;
    this.inProgressIncidents = this.incidents.filter(
      (incident) => incident.status === 'In Progress'
    ).length;
    this.resolvedIncidents = this.incidents.filter(
      (incident) => incident.status === 'Resolved'
    ).length;
  }
}
