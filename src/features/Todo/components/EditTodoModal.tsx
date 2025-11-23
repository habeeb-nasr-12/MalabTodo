import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TitleInput } from './TitleInput';
import { DescriptionInput } from './DescriptionInput';
import { PrioritySelector } from './PrioritySelector';
import { DateSelector } from './DateSelector';
import { useUpdateTodo } from '../hooks/useUpdateTodo';
import { Priority, Todo, UpdateTodoInput } from '../types/todo.types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../shared/theme/colors';

export interface EditTodoModalRef {
  open: (id: string) => void;
  close: () => void;
}

interface EditTodoModalProps {
  todo?: Todo;
}

interface EditTodoFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: number;
}

export const EditTodoModal = React.memo(({todo}: EditTodoModalProps) => {
    const [visible, setVisible] = React.useState(false);
    const {mutateAsync : updateTodoMutation, isPending : isUpdating } = useUpdateTodo();
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<EditTodoFormData>({
      defaultValues: {
        title: todo?.title || '',
        description: todo?.description || '',
        priority: todo?.priority || 'medium',
        dueDate: todo?.dueDate ,
      },
      mode: 'onBlur',
    });
    const onSubmit = async (data: EditTodoFormData) => {
      const todoId =  todo?.id;
      if (!todoId) return;

      try {
        const updateInput: UpdateTodoInput = {
          id: todoId,
          title: data.title.trim(),
          description: data.description.trim(),
          priority: data.priority,
          dueDate: data.dueDate,
        };

        await updateTodoMutation(updateInput);
        setVisible(false);
        reset();
      } catch {
        Alert.alert(
          'Error',
          'Failed to update task. Please try again.',
          [{ text: 'OK' }]
        );
      }
    };

    const handleClose = () => {
      if (isUpdating || isSubmitting) return;
      reset();
      setVisible(false);
    };

    const isLoading = isUpdating || isSubmitting;

  return (
    <>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            setVisible(true);
          }}>
          <MaterialIcons name="edit" size={18} color={colors.primary[900]} />
        </TouchableOpacity>
      <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}>
      <Pressable
        className="flex-1 bg-black/50 justify-end"
        onPress={handleClose}>
        <Pressable
          className="bg-white rounded-t-3xl max-h-[90vh]"
          onPress={(e) => e.stopPropagation()}>
          <ScrollView
            className="max-h-[90vh]"
            showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="px-6 pt-6 pb-4 border-b border-gray-200">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-2xl font-bold text-gray-900">
                  Edit Task
                </Text>
                <TouchableOpacity
                  onPress={handleClose}
                  disabled={isLoading}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                  <Text className="text-gray-600 text-lg">×</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Content */}
            <View className="px-6 py-6">
              {todo ? (
                <>
                  <Controller
                    control={control}
                    name="title"
                    rules={{
                      required: 'Title is required',
                      maxLength: {
                        value: 100,
                        message: 'Title must be less than 100 characters',
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TitleInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.title?.message}
                        editable={!isLoading}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="description"
                    rules={{
                      maxLength: {
                        value: 1000,
                        message: 'Description must be less than 1000 characters',
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DescriptionInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.description?.message}
                        editable={!isLoading}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="priority"
                    rules={{
                      required: 'Priority is required',
                    }}
                    render={({ field: { onChange, value } }) => (
                      <PrioritySelector
                        value={value}
                        onChange={onChange}
                        error={errors.priority?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="dueDate"
                    rules={{
                      required: 'Due date is required',
                    }}
                    render={({ field: { onChange, value } }) => (
                      <DateSelector
                        value={value}
                        onChange={onChange}
                        error={errors.dueDate?.message}
                      />
                    )}
                  />
                </>
              ) : (
                <View className="py-8 items-center">
                  <Text className="text-gray-600 text-center">
                    Task not found
                  </Text>
                </View>
              )}
            </View>
            {todo && (
              <View className="px-6 pb-6 pt-4 border-t border-gray-200 bg-white">
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={handleClose}
                    disabled={isLoading}
                    className="flex-1 py-3 px-6 rounded-lg items-center bg-gray-100">
                    <Text className="font-semibold text-gray-700">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoading}
                    className={`flex-1 py-3 px-6 rounded-lg items-center ${
                      isLoading
                        ? 'bg-gray-400'
                        : 'bg-gray-900'
                    }`}>
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Text className="font-semibold text-white">Save Changes</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
    </>
  );
});



