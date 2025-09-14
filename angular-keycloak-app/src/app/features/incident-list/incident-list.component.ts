import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../dashboard/header/header.component';
import { RouterModule } from '@angular/router';
import { Incident } from '../../core/model/incident.model';
import { IncidentService } from '../../core/services/incident.service';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './incident-list.component.html',
  styleUrl: './incident-list.component.scss'
})
export class IncidentListComponent implements OnInit {

  incidents: Incident[] = [];

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.incidents = this.incidentService.getIncidents();
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    console.log('Search query:', query);
  }

  onFilter(): void {
    console.log('Filter button clicked');
  }

  onSort(): void {
    console.log('Sort button clicked');
  }

  onNewIncident(): void {
    console.log('New Incident button clicked');
  }
}
