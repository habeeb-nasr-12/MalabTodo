import React from 'react';
import { View, Text } from 'react-native';
import { MainLayout } from '../../../layouts/MainLayout';

import { CreateForm } from '../components/CreateForm';

export const CreateTodoView: React.FC = () => {
  return (
    <MainLayout>
      <View className="flex-1">
        <View className="px-4 py-6 bg-white border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900">
            Create New Task
          </Text>
        </View>
        <CreateForm />
      </View>
    </MainLayout>
  );
};

