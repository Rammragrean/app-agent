export interface TeamMember {
  id: string;
  name: string;
  role: 'Supervisor' | 'Operational Staff';
  avatar?: string;
  tasksCompleted: number;
  tasksInProgress: number;
  tasksPending: number;
  performance: number; // 0-100
}

export interface Task {
  id: string;
  title: string;
  status: 'Done' | 'In Progress' | 'Pending' | 'Blocked';
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  category: 'Inbound' | 'Outbound' | 'Internal' | 'Project';
}

export interface PerformanceData {
  month: string;
  [memberName: string]: number | string;
}
