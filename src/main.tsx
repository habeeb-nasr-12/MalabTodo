import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './shared/config/queryClient';
import { TodoNavigator } from './router';
export const Main: React.FC = () => {
  

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <TodoNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

