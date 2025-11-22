import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

interface SearchInputProps extends TextInputProps {
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search tasks by title...',
  ...props
}) => {
  return (
    <View className="px-4 py-3 bg-white border-b border-gray-200">
      <TextInput
        className="border rounded-lg px-4 py-3 text-base text-gray-900 bg-gray-50 border-gray-300"
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
    </View>
  );
};

