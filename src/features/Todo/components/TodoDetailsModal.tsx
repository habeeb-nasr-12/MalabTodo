import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { Todo } from '../types/todo.types';
import { formatDateTime } from '../../../shared/utils/date';
import { priorityColors } from '../../../shared/theme/colors';
import { useTodos } from '../hooks/useTodos';
import { useUpdateTodo } from '../hooks/useUpdateTodo';

export interface TodoDetailsModalRef {
  open: (todo: Todo) => void;
  close: () => void;
}

interface TodoDetailsModalProps {}

export const TodoDetailsModal = forwardRef<TodoDetailsModalRef, TodoDetailsModalProps>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);
 
  const { data: todos } = useTodos();
  const updateTodoMutation = useUpdateTodo();

  useImperativeHandle(ref, () => ({
    open: (todoData: Todo) => {
      setTodo(todoData);
      setVisible(true);
    },
    close: () => {
      setVisible(false);
      setTodo(null);
    },
  }));

  const handleClose = () => {
    setVisible(false);
    setTodo(null);
  };

  const handleToggleComplete = () => {
    if (!todo) return;
    const currentTodo = todos?.find((t) => t.id === todo.id);
    if (currentTodo) {
      updateTodoMutation.mutate({
        id: todo.id,
        completed: !currentTodo.completed,
      });
      handleClose();
    }
  };

 

  if (!todo) return null;

  const priorityColor = priorityColors[todo.priority];
  const priorityLabels = {
    normal: 'Normal',
    meduim: 'Medium',
    urgent: 'Urgent',
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}>
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center p-4"
        onPress={handleClose}>
        <Pressable
          className="bg-white rounded-2xl w-full max-w-md shadow-xl border border-gray-200"
          onPress={(e) => e.stopPropagation()}>
          <ScrollView className="max-h-[80vh]" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="px-6 pt-6 pb-4 border-b border-gray-200">
              <View className="flex-row items-start justify-between mb-4">
                <View className="flex-1 mr-4">
                  <Text className="text-2xl font-bold text-gray-900 mb-2">
                    {todo.title}
                  </Text>
                  <View className="flex-row items-center">
                    <View
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: priorityColor }}
                    />
                    <Text className="text-sm font-semibold text-gray-700 capitalize">
                      {priorityLabels[todo.priority]} Priority
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={handleClose}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                  <Text className="text-gray-600 text-lg">×</Text>
                </TouchableOpacity>
              </View>

              {/* Status Badge */}
              <View className="flex-row items-center">
                <View
                  className={`px-3 py-1 rounded-full ${
                    todo.completed
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                  }`}>
                  <Text
                    className={`text-xs font-semibold ${
                      todo.completed
                        ? 'text-green-700'
                        : 'text-gray-700'
                    }`}>
                    {todo.completed ? '✓ Completed' : '○ Active'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Content */}
            <View className="px-6 py-6">
              {/* Description */}
              <View className="mb-6">
                <Text className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Description
                </Text>
                <Text className="text-base text-gray-800 leading-6">
                  {todo.description || 'No description provided'}
                </Text>
              </View>

              {/* Due Date */}
              <View className="mb-6">
                <Text className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Due Date
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-2">📅</Text>
                  <Text className="text-base text-gray-800">
                    {formatDateTime(todo.dueDate)}
                  </Text>
                </View>
              </View>

              {/* Priority Details */}
              <View className="mb-6">
                <Text className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Priority
                </Text>
                <View className="flex-row items-center">
                  <View
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: priorityColor }}
                  />
                  <Text className="text-base text-gray-800 capitalize">
                    {priorityLabels[todo.priority]}
                  </Text>
                </View>
              </View>

              {/* Created Date */}
              {todo.createdAt && (
                <View className="mb-6">
                  <Text className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Created
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {formatDateTime(todo.createdAt)}
                  </Text>
                </View>
              )}
            </View>

            {/* Footer Actions */}
            <View className="px-6 pb-6 pt-4 border-t border-gray-200">
              <View >
                <TouchableOpacity
                  onPress={handleToggleComplete}
                  disabled={updateTodoMutation.isPending}
                  className={`flex-1 py-3 px-6 rounded-lg items-center ${
                    todo.completed
                      ? 'bg-gray-200'
                      : 'bg-gray-900'
                  }`}>
                  <Text
                    className={`font-semibold ${
                      todo.completed
                        ? 'text-gray-700'
                        : 'text-white'
                    }`}>
                    {todo.completed ? 'Mark as Active' : 'Mark as Completed'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
});

