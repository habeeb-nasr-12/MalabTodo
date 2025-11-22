import React, { useState } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { TodoItem } from './TodoItem';
import { TodoItemSkeleton } from './TodoItemSkeleton';
import { SearchInput } from './SearchInput';
import { Priority } from '../types/todo.types';
import { useTodos } from '../hooks/useTodos';

type TabCategory = 'all' | 'urgent' | 'medium' | 'normal';

const TABS: { key: TabCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'urgent', label: 'Urgent' },
  { key: 'medium', label: 'Medium' },
  { key: 'normal', label: 'Normal' },
];

export const TodoList: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const priorityMap: Record<TabCategory, Priority | 'all'> = {
    all: 'all',
    urgent: 'urgent',
    medium: 'medium', // Fixed typo: was 'meduim'
    normal: 'normal',
  };

  const { data: todos = [], isLoading } = useTodos({
    priority: priorityMap[selectedTab],
    searchQuery: searchQuery.trim() || undefined,
  });

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <View className="flex-1 bg-white">
      <SearchInput value={searchQuery} onChangeText={setSearchQuery} />
      
      <View className="bg-white border-b border-gray-200">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-4 py-2"
        >
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setSelectedTab(tab.key)}
              className={`px-4 py-2 mx-1 rounded-full ${
                selectedTab === tab.key ? 'bg-gray-900' : 'bg-gray-100'
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedTab === tab.key ? 'text-white' : 'text-gray-700'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isLoading ? (
        <View className="flex-1 bg-white">
          <View className="p-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <TodoItemSkeleton key={item} />
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          data={[...activeTodos, ...completedTodos]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TodoItem todo={item} />}
          contentContainerClassName="p-4"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            completedTodos.length > 0 && activeTodos.length > 0 ? (
              <View className="mb-3">
                <Text className="text-sm font-semibold text-gray-600 uppercase">
                  Active Tasks ({activeTodos.length})
                </Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View className="flex-1 p-4 justify-center items-center bg-white">
              <Text className="text-gray-600">No todos found!</Text>
            </View>
          }
          ListFooterComponent={
            completedTodos.length > 0 ? (
              <View className="mt-4">
                <Text className="text-sm font-semibold text-gray-600 uppercase mb-3">
                  Completed ({completedTodos.length})
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};