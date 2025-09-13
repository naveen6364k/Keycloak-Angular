import { Injectable } from '@angular/core';
import { Incident } from '../model/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private incidents: Incident[] = [
    { id: 'INC001', status: 'Open', severity: 'High', assignedTo: 'Alex Bennett', reportedBy: 'Sarah Clark', dateReported: '2024-07-26', title: 'Network Outage', affectedServices: 'Web Application, Database', description: 'Users are experiencing a complete network outage, unable to access the main web application and services. The issue started at approximately 9:55 AM and is impacting all users. Initial diagnostics suggest a potential DNS resolution failure or a core router malfunction. The database service is also unreachable, likely due to the network failure. Engineering team is actively investigating.', activityLog: [
      { icon: 'check_circle', iconClass: 'green', title: 'Incident Reported', timestamp: '2024-01-15 10:00 AM' },
      { icon: 'search', iconClass: 'blue', title: 'Initial Investigation', timestamp: '2024-01-15 10:30 AM', description: 'Team started looking into the network logs.' },
      { icon: 'bug_report', iconClass: 'orange', title: 'Issue Identified', timestamp: '2024-01-15 11:00 AM', description: 'Router B-42 has been identified as the root cause.' }
    ]},
    { id: 'INC002', status: 'In Progress', severity: 'Medium', assignedTo: 'Emily Carter', reportedBy: 'David Lee', dateReported: '2024-07-25', title: 'Slow API Response', affectedServices: 'API Gateway', description: 'API response times are slower than usual.', activityLog: [] },
    { id: 'INC003', status: 'Resolved', severity: 'Low', assignedTo: 'Michael Evans', reportedBy: 'Jessica Brown', dateReported: '2024-07-24', title: 'UI Glitch on Login Page', affectedServices: 'Web Application', description: 'Minor UI glitch on the login page.', activityLog: [] },
    { id: 'INC004', status: 'Open', severity: 'Medium', assignedTo: 'Alex Bennett', reportedBy: 'Robert Green', dateReported: '2024-07-23', title: 'Database Connection Errors', affectedServices: 'Database', description: 'Intermittent database connection errors.', activityLog: [] },
    { id: 'INC005', status: 'In Progress', severity: 'High', assignedTo: 'Emily Carter', reportedBy: 'Laura White', dateReported: '2024-07-22', title: 'Service Unavailable', affectedServices: 'All Services', description: 'All services are currently unavailable.', activityLog: [] }
  ];

  constructor() { }

  getIncidents(): Incident[] {
    return this.incidents;
  }

  getIncidentById(id: string): Incident | undefined {
    return this.incidents.find(incident => incident.id === id);
  }
}

// I need to extend the Incident interface to include the new properties.
// I will do that in the dashboard.component.ts file.
