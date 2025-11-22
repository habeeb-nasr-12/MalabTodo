import { Todo } from '../types/todo.types';

// Static todo data for initial rendering
export const staticTodos: Todo[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the Todo app including setup instructions and architecture overview.',
    dueDate: Date.now() + 86400000 * 2, // 2 days from now
    priority: 'urgent',
    completed: false,
    createdAt: Date.now() - 86400000, // 1 day ago
    updatedAt: Date.now() - 86400000,
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Go through open PRs and provide feedback on code changes.',
    dueDate: Date.now() + 86400000, // 1 day from now
    priority: 'meduim',
    completed: false,
    createdAt: Date.now() - 172800000, // 2 days ago
    updatedAt: Date.now() - 172800000,
  },
  {
    id: '3',
    title: 'Update dependencies',
    description: 'Check for outdated npm packages and update to latest stable versions.',
    dueDate: Date.now() + 86400000 * 7, // 7 days from now
    priority: 'normal',
    completed: false,
    createdAt: Date.now() - 259200000, // 3 days ago
    updatedAt: Date.now() - 259200000,
  },
  {
    id: '4',
    title: 'Team meeting preparation',
    description: 'Prepare slides and talking points for the weekly team sync meeting.',
    dueDate: Date.now() + 86400000 * 3, // 3 days from now
    priority: 'urgent',
    completed: true,
    createdAt: Date.now() - 345600000, // 4 days ago
    updatedAt: Date.now() - 86400000,
  },
  {
    id: '5',
    title: 'Fix navigation bug',
    description: 'Investigate and fix the back button navigation issue on Android devices.',
    dueDate: Date.now() + 86400000 * 5, // 5 days from now
    priority: 'meduim',
    completed: false,
    createdAt: Date.now() - 432000000, // 5 days ago
    updatedAt: Date.now() - 432000000,
  },
  {
    id: '6',
    title: 'Refactor authentication flow',
    description: 'Simplify the auth logic and improve error handling for better user experience.',
    dueDate: Date.now() + 86400000 * 10, // 10 days from now
    priority: 'normal',
    completed: false,
    createdAt: Date.now() - 518400000, // 6 days ago
    updatedAt: Date.now() - 518400000,
  },
];

