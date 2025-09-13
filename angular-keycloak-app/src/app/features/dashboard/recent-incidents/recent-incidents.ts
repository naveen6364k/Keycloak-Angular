import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Incident } from '../../../core/model/incident.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recent-incidents',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recent-incidents.html',
  styleUrls: ['./recent-incidents.scss']
})
export class RecentIncidentsComponent {
  @Input() incidents: Incident[] = [];
}
