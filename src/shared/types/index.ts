// Global type definitions

export type StatusType = 'idle' | 'loading' | 'success' | 'error';

export type Timestamp = number;

export interface BaseEntity {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

import { NavigatorScreenParams } from '@react-navigation/native';

// Todo Stack Navigator Params
export type TodoStackParamList = {
  TodoList: undefined;
  CreateTodo: undefined;
  EditTodo: { todoId: string };
};

// Root Navigator Params (can be extended with more navigators)
export type RootStackParamList = {
  TodoStack: NavigatorScreenParams<TodoStackParamList>;
};

// Navigation prop types
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

