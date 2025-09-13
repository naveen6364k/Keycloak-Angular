import { Injectable } from '@angular/core';
import { Notification } from '../model/notification.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications = new BehaviorSubject<Notification[]>([
    { id: '1', type: 'New High Severity Incident', message: 'Incident #12345 has been reported and requires immediate attention.', timestamp: '2 hours ago', read: false, icon: 'local_fire_department', iconClass: 'red' },
    { id: '2', type: 'Status Update', message: "Incident #67890: Status updated to 'In Progress'.", timestamp: '4 hours ago', read: false, icon: 'sync', iconClass: 'blue' },
    { id: '3', type: 'Assignment', message: 'Incident #12345 has been assigned to Alex Johnson.', timestamp: '6 hours ago', read: false, icon: 'person_add', iconClass: 'green' },
    { id: '4', type: 'Resolution', message: 'Incident #98765 has been resolved.', timestamp: '1 day ago', read: true, icon: 'task_alt', iconClass: 'purple' },
    { id: '5', type: 'New Medium Severity Incident', message: 'Incident #54321 has been reported.', timestamp: '2 days ago', read: true, icon: 'report', iconClass: 'orange' },
    { id: '6', type: 'Status Update', message: "Incident #54321: Status updated to 'In Progress'.", timestamp: '3 days ago', read: true, icon: 'sync', iconClass: 'blue' },
    { id: '7', type: 'Assignment', message: 'Incident #54321 has been assigned to Sarah Williams.', timestamp: '4 days ago', read: true, icon: 'person_add', iconClass: 'green' },
    { id: '8', type: 'Resolution', message: 'Incident #54321 has been resolved.', timestamp: '5 days ago', read: true, icon: 'task_alt', iconClass: 'purple' },
  ]);

  notifications$ = this.notifications.asObservable();

  constructor() { }

  getNotifications(): Notification[] {
    return this.notifications.getValue();
  }

  getUnreadCount(): number {
    return this.notifications.getValue().filter(n => !n.read).length;
  }

  markAllAsRead(): void {
    const currentNotifications = this.notifications.getValue();
    const updatedNotifications = currentNotifications.map(n => ({ ...n, read: true }));
    this.notifications.next(updatedNotifications);
  }
}
