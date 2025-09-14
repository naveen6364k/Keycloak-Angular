import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../dashboard/header/header.component';
import { FormsModule } from '@angular/forms';
import { KeycloakService } from '../../core/services/keycloak.service';
import { UserProfile } from '../../core/model/user-profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  profile: UserProfile = {
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    const userProfile = this.keycloakService.profile;
    if (userProfile) {
      this.profile = { ...userProfile };
    }
  }

  saveChanges(): void {
    console.log('Saving profile:', this.profile);
    // Here you would typically call a service to update the user profile
  }
}
