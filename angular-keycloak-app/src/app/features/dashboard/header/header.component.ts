import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../../core/model/user-profile';
import { KeycloakService } from '../../../core/services/keycloak.service';
import { NotificationService } from '../../../core/services/notification.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profile: UserProfile | undefined;
  isDropdownOpen = false;
  unreadNotifications = 0;

  constructor(
    public keycloakService: KeycloakService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.profile = this.keycloakService.profile;
    this.unreadNotifications = this.notificationService.getUnreadCount();
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

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onViewProfile(): void {
    this.isDropdownOpen = false;
    alert(JSON.stringify(this.profile, null, 2));
  }

  onLogout(): void {
    this.isDropdownOpen = false;
    this.keycloakService.logout();
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
