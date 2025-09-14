import { Component } from '@angular/core';
import { HeaderComponent } from '../dashboard/header/header.component';

@Component({
  selector: 'app-create-incident',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './create-incident.html',
  styleUrls: ['./create-incident.scss']
})
export class CreateIncidentComponent {

}
