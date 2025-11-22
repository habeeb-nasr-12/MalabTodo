import firestore , { collection, doc, setDoc } from '@react-native-firebase/firestore';

const db = firestore();
export { db };

const staticTodos = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the Todo app including setup instructions and architecture overview.',
    dueDate: Date.now() + 86400000 * 2,
    priority: 'urgent',
    completed: false,
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Go through open PRs and provide feedback on code changes.',
    dueDate: Date.now() + 86400000,
    priority: 'meduim',
    completed: false,
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now() - 172800000,
  },
  {
    id: '3',
    title: 'Update dependencies',
    description: 'Check for outdated npm packages and update to latest stable versions.',
    dueDate: Date.now() + 86400000 * 7,
    priority: 'normal',
    completed: false,
    createdAt: Date.now() - 259200000,
    updatedAt: Date.now() - 259200000,
  },
  {
    id: '4',
    title: 'Team meeting preparation',
    description: 'Prepare slides and talking points for the weekly team sync meeting.',
    dueDate: Date.now() + 86400000 * 3,
    priority: 'urgent',
    completed: true,
    createdAt: Date.now() - 345600000,
    updatedAt: Date.now() - 86400000,
  },
  {
    id: '5',
    title: 'Fix navigation bug',
    description: 'Investigate and fix the back button navigation issue on Android devices.',
    dueDate: Date.now() + 86400000 * 5,
    priority: 'meduim',
    completed: false,
    createdAt: Date.now() - 432000000,
    updatedAt: Date.now() - 432000000,
  },
  {
    id: '6',
    title: 'Refactor authentication flow',
    description: 'Simplify the auth logic and improve error handling for better user experience.',
    dueDate: Date.now() + 86400000 * 10,
    priority: 'normal',
    completed: false,
    createdAt: Date.now() - 518400000,
    updatedAt: Date.now() - 518400000,
  },
  // --- New tasks start here ---
  {
    id: '7',
    title: 'Plan sprint review meeting',
    description: 'Schedule and prepare agenda for the upcoming sprint review.',
    dueDate: Date.now() + 86400000 * 4,
    priority: 'urgent',
    completed: false,
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: '8',
    title: 'Research new UI components',
    description: 'Explore modern UI libraries or components for potential integration.',
    dueDate: Date.now() + 86400000 * 9,
    priority: 'normal',
    completed: false,
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: '9',
    title: 'Write unit tests for authentication module',
    description: 'Increase code coverage by adding comprehensive unit tests.',
    dueDate: Date.now() + 86400000 * 6,
    priority: 'meduim',
    completed: false,
    createdAt: Date.now() - 86400000 * 1,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: '10',
    title: 'Deploy latest hotfix to production',
    description: 'Coordinate with operations to push the critical bug fix live.',
    dueDate: Date.now() + 86400000,
    priority: 'urgent',
    completed: true,
    createdAt: Date.now() - 86400000 * 0.5,
    updatedAt: Date.now() - 86400000 * 0.5,
  },
  {
    id: '11',
    title: 'Onboard new team member',
    description: 'Prepare onboarding materials and introductory sessions.',
    dueDate: Date.now() + 86400000 * 14,
    priority: 'normal',
    completed: false,
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now() - 86400000 * 7,
  },
  {
    id: '12',
    title: 'Design database schema for new feature',
    description: 'Draft the data model for the upcoming "labels" feature.',
    dueDate: Date.now() + 86400000 * 8,
    priority: 'meduim',
    completed: false,
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: '13',
    title: 'Attend security workshop',
    description: 'Participate in the online workshop on secure coding practices.',
    dueDate: Date.now() + 86400000 * 1,
    priority: 'normal',
    completed: false,
    createdAt: Date.now() - 86400000 * 0.5,
    updatedAt: Date.now() - 86400000 * 0.5,
  },
  {
    id: '14',
    title: 'Optimize image loading performance',
    description: 'Implement lazy loading and image compression techniques.',
    dueDate: Date.now() + 86400000 * 11,
    priority: 'meduim',
    completed: false,
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 86400000 * 4,
  },
  {
    id: '15',
    title: 'Create monthly progress report',
    description: 'Compile data and prepare a summary of team achievements.',
    dueDate: Date.now() + 86400000 * 5,
    priority: 'urgent',
    completed: false,
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: '16',
    title: 'Clean up unused code and assets',
    description: 'Remove deprecated code and unused media files from the project.',
    dueDate: Date.now() + 86400000 * 12,
    priority: 'normal',
    completed: false,
    createdAt: Date.now() - 86400000 * 6,
    updatedAt: Date.now() - 86400000 * 6,
  },
];

async function addStaticTodosToFirestore() {
  const todosCollectionRef = collection(db, 'todos');

  for (const todo of staticTodos) {
    try {
      await setDoc(doc(todosCollectionRef, todo.id), todo);
      console.log(`Todo with ID: ${todo.id} successfully added!`);
    } catch (e) {
      console.error(`Error adding todo with ID: ${todo.id}`, e);
    }
  }
  console.log('All static todos processing complete.');
}

// Call the function to execute the data upload
addStaticTodosToFirestore();
