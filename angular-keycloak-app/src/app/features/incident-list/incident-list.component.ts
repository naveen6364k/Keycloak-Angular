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

  allIncidents: Incident[] = [];
  incidents: Incident[] = [];

  currentPage = 1;
  pageSize = 10;
  totalIncidents = 0;

  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.allIncidents = this.incidentService.getIncidents();
    this.totalIncidents = this.allIncidents.length;
    this.updateIncidents();
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    if (query) {
      this.incidents = this.allIncidents.filter(incident =>
        incident.id.toLowerCase().includes(query) ||
        incident.title.toLowerCase().includes(query)
      );
    } else {
      this.incidents = this.allIncidents;
    }
    this.totalIncidents = this.incidents.length;
    this.updateIncidents();
  }

  onFilter(type: 'status' | 'priority', value: string): void {
    if (value) {
      this.incidents = this.allIncidents.filter(incident => incident[type] === value);
    } else {
      this.incidents = this.allIncidents;
    }
    this.totalIncidents = this.incidents.length;
    this.updateIncidents();
  }

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.incidents.sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    this.updateIncidents();
  }

  updateIncidents(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.incidents = this.allIncidents.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updateIncidents();
  }

  onPageSizeChange(event: Event): void {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.currentPage = 1;
    this.updateIncidents();
  }

  get totalPages(): number {
    return Math.ceil(this.totalIncidents / this.pageSize);
  }
}
