export interface Notification {
  id: string;
  type: 'New High Severity Incident' | 'Status Update' | 'Assignment' | 'Resolution' | 'New Medium Severity Incident';
  message: string;
  timestamp: string;
  read: boolean;
  icon: string;
  iconClass: string;
}
