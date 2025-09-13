export interface Incident {
  id: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  severity: 'High' | 'Medium' | 'Low';
  assignedTo: string;
  reportedBy: string;
  dateReported: string;
  title?: string;
  affectedServices?: string;
  description?: string;
  activityLog?: ActivityLog[];
}

export interface ActivityLog {
  icon: string;
  iconClass: string;
  title: string;
  timestamp: string;
  description?: string;
}
