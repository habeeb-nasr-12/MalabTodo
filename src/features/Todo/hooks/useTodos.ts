import { QueryObserverResult, useQuery } from '@tanstack/react-query';
import { Todo, Priority } from '../types/todo.types';
import {
  getDocs,
  collection,
  orderBy,
  query,
  where,
} from '@react-native-firebase/firestore';
import { db } from '../../../shared/config/firebase';

type FilterParams = {
  priority?: Priority | 'all';
  searchQuery?: string;
};

const convertTimestamp = (timestamp: any): number => {
  if (!timestamp) return Date.now();
  if (typeof timestamp === 'number') return timestamp;
  if (timestamp.toMillis) {
    return timestamp.toMillis();
  }
  if (timestamp.seconds) {
    return timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1000000;
  }
  return Date.now();
};

const transformDocToTodo = (doc: any): Todo => {
  const data = doc.data();

  // Normalize priority to handle case-sensitivity and variations
  let priority: Priority = 'normal';
  const rawPriority = data.priority?.toLowerCase().trim();

  if (rawPriority === 'urgent' || rawPriority === 'high') {
    priority = 'urgent';
  } else if (rawPriority === 'medium' || rawPriority === 'med') {
    priority = 'medium';
  } else if (rawPriority === 'normal' || rawPriority === 'low') {
    priority = 'normal';
  }

  return {
    id: doc.id,
    title: data.title || '',
    description: data.description || '',
    dueDate: typeof data.dueDate === 'number' ? data.dueDate : Date.now(),
    priority,
    completed: data.completed || false,
    userId: data.userId,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
  } as Todo;
};

const getFilteredTodos = async (filters: FilterParams): Promise<Todo[]> => {
  try {
    const hasPriority = filters.priority && filters.priority !== 'all';
    const searchQuery = filters.searchQuery?.trim().toLowerCase();
    const hasSearch = !!searchQuery;
    let q = query(collection(db, 'tasks'));

    if (hasSearch) {
      q = query(
        collection(db, 'tasks'),
        where('title', '>=', searchQuery),
        where('title', '<=', searchQuery + '\uf8ff'),
      );
    }else if(hasPriority) {
      q = query(collection(db, 'tasks'), where('priority', '==', filters.priority));
    }else{
    q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    }

    const docs = await getDocs(q);
    let todos = docs.docs.map(transformDocToTodo);

    return todos;
  } catch (error) {
    throw error;
  }
};

export const useTodos = (
  filters: FilterParams = {},
): QueryObserverResult<Todo[]> => {
  return useQuery<Todo[]>({
    queryKey: ['todos', 'filtered', filters.priority, filters.searchQuery],
    queryFn: () => getFilteredTodos(filters),
    staleTime: 1000 * 60, // Cache for 1 minute
  });
};
