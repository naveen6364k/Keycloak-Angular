import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../../core/model/user-profile';
import { KeycloakService } from '../../../core/services/keycloak.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profile: UserProfile | undefined;

  constructor(public keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.profile = this.keycloakService.profile;
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    console.log('Search query:', query);
    // Implement search logic here
  }

  onViewNotifications(): void {
    console.log('Viewing notifications');
    // Implement notification logic here
  }

  get userInitial(): string {
    if (this.profile?.firstName && this.profile.firstName.length > 0) {
      return this.profile.firstName.charAt(0).toUpperCase();
    }
    if (this.profile?.username && this.profile.username.length > 0) {
      return this.profile.username.charAt(0).toUpperCase();
    }
    return '';
  }
}
