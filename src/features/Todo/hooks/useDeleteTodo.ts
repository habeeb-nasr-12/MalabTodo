import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { db } from '../../../shared/config/firebase';
import { doc, deleteDoc } from '@react-native-firebase/firestore';

const deleteTodo = async (todoId: string): Promise<void> => {
  const docRef = doc(db, 'tasks', todoId);
  await deleteDoc(docRef);
};

export const useDeleteTodo = (): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todos', 'filtered'] });
    },
  });
};

