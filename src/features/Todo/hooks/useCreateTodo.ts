import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { Todo, CreateTodoInput } from '../types/todo.types';
import { db } from '../../../shared/config/firebase';
import { collection, addDoc } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

const createTodo = async (data: CreateTodoInput): Promise<Todo> => {
  const now = Date.now();
  const docRef = await addDoc(collection(db, 'tasks'), {
    ...data,
    title : data.title.toLowerCase(),
    description : data.description,
    priority : data.priority,
    completed: false,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });
   return { id: docRef.id, title: data.title, description: data.description, priority: data.priority, completed: false, createdAt: now, updatedAt: now } as Todo;
};

export const useCreateTodo = (): UseMutationResult<Todo, Error, CreateTodoInput> => {
  const queryClient = useQueryClient();  return useMutation<Todo, Error, CreateTodoInput>({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todos', 'filtered'] });
    },
  });
};

