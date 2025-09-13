import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header';
import { StatCardComponent } from './stat-card/stat-card';
import { RecentIncidentsComponent } from './recent-incidents/recent-incidents';

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
  standalone: true,
  imports: [CommonModule, HeaderComponent, StatCardComponent, RecentIncidentsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  statCards = [
    { label: 'Open Incidents', value: 12, color: 'red' },
    { label: 'In Progress', value: 8, color: 'yellow' },
    { label: 'Resolved', value: 45, color: 'green' }
  ];

  incidents: Incident[] = [
    { id: 'INC001', status: 'Open', severity: 'High', assignedTo: 'Alex Bennett', reportedBy: 'Sarah Clark', dateReported: '2024-07-26' },
    { id: 'INC002', status: 'In Progress', severity: 'Medium', assignedTo: 'Emily Carter', reportedBy: 'David Lee', dateReported: '2024-07-25' },
    { id: 'INC003', status: 'Resolved', severity: 'Low', assignedTo: 'Michael Evans', reportedBy: 'Jessica Brown', dateReported: '2024-07-24' },
    { id: 'INC004', status: 'Open', severity: 'Medium', assignedTo: 'Alex Bennett', reportedBy: 'Robert Green', dateReported: '2024-07-23' },
    { id: 'INC005', status: 'In Progress', severity: 'High', assignedTo: 'Emily Carter', reportedBy: 'Laura White', dateReported: '2024-07-22' }
  ];

}
