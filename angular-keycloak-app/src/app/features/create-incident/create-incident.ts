import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../dashboard/header/header.component';

@Component({
  selector: 'app-create-incident',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-incident.html',
  styleUrls: ['./create-incident.scss']
})
export class CreateIncidentComponent implements OnInit {
  currentStep = 1;
  incidentForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.incidentForm = this.fb.group({
      details: this.fb.group({
        incidentType: ['', Validators.required],
        description: ['', Validators.required]
      }),
      reporter: this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      }),
      priority: this.fb.group({
        urgency: ['', Validators.required],
        impact: ['', Validators.required]
      }),
      attachments: this.fb.group({
        files: ['']
      })
    });
  }

  get details() {
    return this.incidentForm.get('details') as FormGroup;
  }

  get reporter() {
    return this.incidentForm.get('reporter') as FormGroup;
  }

  get priority() {
    return this.incidentForm.get('priority') as FormGroup;
  }

  get attachments() {
    return this.incidentForm.get('attachments') as FormGroup;
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isStepCompleted(step: number): boolean {
    switch (step) {
      case 1:
        return this.details.valid;
      case 2:
        return this.reporter.valid;
      case 3:
        return this.priority.valid;
      default:
        return false;
    }
  }
}
