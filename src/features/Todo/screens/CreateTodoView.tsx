import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TodoStackParamList } from '../../../shared/types';
import { MainLayout } from '../../../layouts/MainLayout';
import { TitleInput } from '../components/TitleInput';
import { DescriptionInput } from '../components/DescriptionInput';
import { DateSelector } from '../components/DateSelector';
import { PrioritySelector } from '../components/PrioritySelector';
import { useCreateTodo } from '../hooks/useCreateTodo';
import { Priority } from '../types/todo.types';

type CreateTodoNavigationProp = NativeStackNavigationProp<
  TodoStackParamList,
  'CreateTodo'
>;

export const CreateTodoView: React.FC = () => {
  const navigation = useNavigation<CreateTodoNavigationProp>();
  const { mutateAsync : createTodoMutation, isPending } = useCreateTodo();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(Date.now());
  const [priority, setPriority] = useState<Priority>('medium');

  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  const validateForm = (): boolean => {
    const newErrors = {
      title: '',
      description: '',
    };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const handleAddTask = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      await createTodoMutation(
       {
         title: title.trim(),
         description: description.trim(),
         dueDate,
         priority,
       },
      {
       onSuccess: () => {
         Alert.alert('Success', 'Task created successfully!', [
           {
             text: 'OK',
             onPress: () => navigation.goBack(),
           },
         ]);
       }
     }
   );
   } catch (error) {
    Alert.alert('Error', 'Failed to create task. Please try again.');
   }




   
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <MainLayout>
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 py-6 bg-white border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900">
            Create New Task
          </Text>
        </View>

        {/* Form */}
        <ScrollView className="flex-1 px-4 py-6 bg-white" showsVerticalScrollIndicator={false}>
          <TitleInput
            value={title}
            onChangeText={setTitle}
            error={errors.title}
          />

          <DescriptionInput
            value={description}
            onChangeText={setDescription}
            error={errors.description}
          />

          <DateSelector value={dueDate} onChange={setDueDate} />

          <PrioritySelector value={priority} onChange={setPriority} />
          <View className="mt-8 space-y-3">
            <TouchableOpacity
              onPress={handleAddTask}
              disabled={isPending}
              className={`py-4 rounded-lg ${
                isPending
                  ? 'bg-gray-400'
                  : 'bg-gray-900'
              }`}>
              <Text className="text-white text-center text-base font-semibold">
                {isPending ? 'Adding...' : 'Add Task'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCancel}
              disabled={isPending}
              className="py-4 rounded-lg border border-gray-300 bg-white">
              <Text className="text-gray-700 text-center text-base font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
};

