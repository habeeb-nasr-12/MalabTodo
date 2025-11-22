import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { db } from '../../../shared/config/firebase';
import { doc, updateDoc } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import { UpdateTodoInput } from '../types/todo.types';

const updateTodo = async ({ id, ...data }: UpdateTodoInput): Promise<void> => {
  const docRef = doc(db, 'tasks', id);
  const updateData: any = {
    ...data,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  };
  if (data.title) {
    updateData.titleLowercase = data.title.toLowerCase();
    updateData.titleWords = data.title.toLowerCase().split(/\s+/).filter((word: string) => word.length > 0);
  }
  await updateDoc(docRef, updateData);
};

export const useUpdateTodo = (): UseMutationResult<void, Error, UpdateTodoInput> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateTodoInput>({
    mutationFn: ({id, ...data}: UpdateTodoInput) => updateTodo({id, ...data}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todos', 'filtered'] });
    },
  });
};

