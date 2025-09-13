import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Incident } from '../dashboard.component';

@Component({
  selector: 'app-recent-incidents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-incidents.html',
  styleUrls: ['./recent-incidents.css']
})
export class RecentIncidentsComponent {
  @Input() incidents: Incident[] = [];
}
