export interface Task {
  _id: string;
  title: string;
  description?:string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignedTo?: any;
  dueDate?:string;
}

export type statusType = 'TODO' | 'IN_PROGRESS' | 'DONE'