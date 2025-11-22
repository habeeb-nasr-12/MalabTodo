import { BaseEntity } from '../../../shared/types';

export type Priority = 'urgent' | 'medium' | 'normal';

export interface Todo extends BaseEntity {
  title: string;
  description: string;
  dueDate: number; // timestamp
  priority: Priority;
  completed: boolean;
  userId?: string;
}

export interface CreateTodoInput {
  title: string;
  description: string;
  dueDate: number;
  priority: Priority;
}

export interface UpdateTodoInput {
  id: string;
  title?: string;
  description?: string;
  dueDate?: number;
  priority?: Priority;
  completed?: boolean;
}

