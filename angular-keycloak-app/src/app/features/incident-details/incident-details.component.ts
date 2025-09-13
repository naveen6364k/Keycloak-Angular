import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../dashboard/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { Incident } from '../../core/model/incident.model';
import { IncidentService } from '../../core/services/incident.service';

@Component({
  selector: 'app-incident-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './incident-details.component.html',
  styleUrl: './incident-details.component.scss'
})
export class IncidentDetailsComponent implements OnInit {

  incident: Incident | undefined;

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.incident = this.incidentService.getIncidentById(id);
    }
  }
}
