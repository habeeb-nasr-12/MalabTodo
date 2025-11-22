import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Todo } from '../types/todo.types';
import { formatDate } from '../../../shared/utils/date';
import { colors, priorityColors } from '../../../shared/theme/colors';
import { EditTodoModal } from './EditTodoModal';
import { useDeleteTodo } from '../hooks/useDeleteTodo';
import { useUpdateTodo } from '../hooks/useUpdateTodo';
import { TodoDetailsModal, TodoDetailsModalRef } from './TodoDetailsModal';

interface TodoItemProps {
  todo: Todo;
  onPress?: () => void;
  onToggleComplete?: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
}) => {
  const priorityColor = priorityColors[todo.priority];
  const { mutate: updateTodo } = useUpdateTodo();
  const detailsModalRef = useRef<TodoDetailsModalRef | null>(null);
  const  {mutate: deleteTodo , isPending: isDeleting} = useDeleteTodo();
  const handleDelete = async () => {
    // const todo = todos.find((t) => t.id === todo.id);
    const todoTitle = todo?.title || 'this task';
    
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${todoTitle}"? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTodo(todo.id);
          },
        },
      ],
      { cancelable: true }
    );
  };
  const onToggleComplete = (id: string) => {
    updateTodo(
      {
        id,
        completed: true,
      },
      {
        onSuccess: () => {
          Alert.alert('Todo completed successfully');
        },
      },
    );
  };
  const onPress = () => {
    detailsModalRef.current?.open(todo);
  };
  return (
    <>
     <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-white rounded-lg p-4 mb-3 border ${
        todo.completed ? 'border-gray-200' : 'border-gray-300'
      } shadow-sm`}>
      <View className="flex-row items-start">
        {/* Checkbox */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onToggleComplete?.(todo.id);
          }}
          className={`w-6 h-6 rounded-full border-2 mr-3 mt-1 items-center justify-center ${
            todo.completed ? 'bg-gray-900 border-gray-900' : 'border-gray-300'
          }`}>
          {todo.completed && <Text className="text-white text-xs">✓</Text>}
        </TouchableOpacity>
        <View className="flex-1">
          <Text
            className={`text-base font-semibold mb-1 ${
              todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'
            }`}>
            {todo.title}
          </Text>
          {todo.description && (
            <Text
              className={`text-sm mb-2 ${
                todo.completed ? 'text-gray-400' : 'text-gray-600'
              }`}
              numberOfLines={2}>
              {todo.description}
            </Text>
          )}
          <View className="flex-row items-center justify-between">
            <Text className="text-xs text-gray-500">
              📅 {formatDate(todo.dueDate)}
            </Text>
            <View className="flex-row items-center">
              <View
                className="px-2 py-1 rounded-full mr-3"
                style={{ 
                  backgroundColor: `${priorityColor}15`,
                  borderWidth: 1,
                  borderColor: priorityColor,
                }}>
                <Text 
                  className="text-xs font-semibold capitalize"
                  style={{ color: priorityColor }}>
                  {todo.priority === 'urgent' ? 'Urgent' : todo.priority === 'medium' ? 'Medium' : 'Normal'}
                </Text>
              </View>
              <View className="flex-row items-center" pointerEvents="box-none">
              <View pointerEvents="auto">
                <EditTodoModal todo={todo}  />
              </View>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isDeleting}
                className="p-1.5 ml-1"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.7}>
              <Icon name="delete" size={18} color={colors.error} />
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

    </TouchableOpacity>
    <TodoDetailsModal ref={detailsModalRef} />
   </>
  );
};

