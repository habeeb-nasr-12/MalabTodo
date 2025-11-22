import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TodoStackParamList } from '../../../shared/types';
import { MainLayout } from '../../../layouts/MainLayout';
import { TodoList } from '../components/TodoList';
import { TODO_ROUTES } from '../routes';

type TodoViewNavigationProp = NativeStackNavigationProp<
  TodoStackParamList,
  'TodoList'
>;

export const TodoView: React.FC = () => {
  const navigation = useNavigation<TodoViewNavigationProp>();
  


  // const handleToggleComplete = (id: string) => {
  //   const todo = todos?.find((t) => t.id === id);
  //   if (todo) {
  //     updateTodoMutation.mutate({
  //       id,
  //       completed: !todo.completed,
  //     });
  //   }
  // };

  const handleAddTodo = () => {
    navigation.navigate(TODO_ROUTES.CREATE_TODO);
  };

  return (
    <MainLayout>
      <View className="flex-1">
        <View className="px-4 py-6 bg-white border-b border-gray-200">
          <Text className="text-3xl font-bold text-gray-900"> Malab Tasks </Text>
        </View>
        <TodoList/>
        <TouchableOpacity
          onPress={handleAddTodo}
          className="absolute bottom-6 right-6 w-14 h-14 bg-gray-900 rounded-full items-center justify-center shadow-lg"
          style={{
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
          }}>
          <Text className="text-white text-2xl font-light">+</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

