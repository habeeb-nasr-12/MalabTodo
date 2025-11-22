import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TodoStackParamList } from './shared/types';
import { TodoView } from './features/Todo/screens/TodoView';
import { CreateTodoView } from './features/Todo/screens/CreateTodoView';
import { TODO_ROUTES } from './features/Todo/routes';

const Stack = createNativeStackNavigator<TodoStackParamList>();

export const TodoNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={TODO_ROUTES.TODO_LIST} component={TodoView} />
      <Stack.Screen
        name={TODO_ROUTES.CREATE_TODO}
        component={CreateTodoView}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};

