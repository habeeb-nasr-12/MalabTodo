import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TitleInput } from '../components/TitleInput';
import { DescriptionInput } from '../components/DescriptionInput';
import { DateSelector } from '../components/DateSelector';
import { PrioritySelector } from '../components/PrioritySelector';
import { useCreateTodo } from '../hooks/useCreateTodo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Priority, CreateTodoInput } from '../types/todo.types';
import { TodoStackParamList } from '../../../shared/types';

type CreateTodoNavigationProp = NativeStackNavigationProp<
  TodoStackParamList,
  'CreateTodo'
>;

type FormData = CreateTodoInput;

export const CreateForm = () => {
  const { mutateAsync: createTodoMutation, isPending } = useCreateTodo();
  const navigation = useNavigation<CreateTodoNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      dueDate: Date.now(),
      priority: 'medium' as Priority,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createTodoMutation(
        {
          title: data.title.trim(),
          description: data.description.trim(),
          dueDate: data.dueDate,
          priority: data.priority,
        },
        {
          onSuccess: () => {
            Alert.alert('Success', 'Task created successfully!', [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ]);
          },
        },
      );
    } catch {
      Alert.alert('Error', 'Failed to create task. Please try again.');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-white"
      showsVerticalScrollIndicator={false}
    >
      <Controller
        control={control}
        name="title"
        rules={{
          required: 'Title is required',
          validate: (value) => {
            if (!value.trim()) {
              return 'Title is required';
            }
            return true;
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TitleInput
            value={value}
            onChangeText={onChange}
            error={errors.title?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        rules={{
          required: 'Description is required',
          validate: (value) => {
            if (!value.trim()) {
              return 'Description is required';
            }
            return true;
          },
        }}
        render={({ field: { onChange, value } }) => (
          <DescriptionInput
            value={value}
            onChangeText={onChange}
            error={errors.description?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="dueDate"
        render={({ field: { onChange, value } }) => (
          <DateSelector value={value} onChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <PrioritySelector value={value} onChange={onChange} />
        )}
      />

      <View className="mt-8 space-y-3">
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          className={`py-4 rounded-lg ${
            isPending ? 'bg-gray-400' : 'bg-gray-900'
          }`}
        >
          <Text className="text-white text-center text-base font-semibold">
            {isPending ? 'Adding...' : 'Add Task'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCancel}
          disabled={isPending}
          className="py-4 rounded-lg border border-gray-300 bg-white"
        >
          <Text className="text-gray-700 text-center text-base font-semibold">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
