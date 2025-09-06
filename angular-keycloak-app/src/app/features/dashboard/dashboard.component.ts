import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../core/services/keycloak.service';
import { UserProfile } from '../../core/model/user-profile';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {

  profile: UserProfile | undefined;
  apiResponse: string | undefined;

  constructor(
    public keycloakService: KeycloakService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.profile = this.keycloakService.profile;
  }

  callApi() {
    this.http.get('http://localhost:8081/api/hello', { responseType: 'text' })
      .subscribe(response => this.apiResponse = response);
  }
}
