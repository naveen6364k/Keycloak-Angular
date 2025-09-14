import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../dashboard/header/header.component';

export interface ScheduledReport {
  name: string;
  frequency: string;
  nextRun: string;
  recipients: string;
  status: 'Active' | 'Paused';
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {

  scheduledReports: ScheduledReport[] = [];

  constructor() { }

  ngOnInit(): void {
    this.scheduledReports = [
      { name: 'Weekly Incident Summary', frequency: 'Weekly', nextRun: 'Oct 28, 2024', recipients: 'management@iassure.com', status: 'Active' },
      { name: 'Monthly Performance Report', frequency: 'Monthly', nextRun: 'Nov 01, 2024', recipients: 'it-team@iassure.com, ops@iassure.com', status: 'Active' },
      { name: 'Quarterly Security Audit', frequency: 'Quarterly', nextRun: 'Dec 31, 2024', recipients: 'security-team@iassure.com', status: 'Paused' },
    ];
  }

  downloadReport(): void {
    console.log('Download report button clicked');
  }

  generateReport(): void {
    console.log('Generate report button clicked');
  }
}
