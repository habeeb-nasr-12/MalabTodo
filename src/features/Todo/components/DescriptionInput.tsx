import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface DescriptionInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const DescriptionInput: React.FC<DescriptionInputProps> = ({
  label = 'Description',
  error,
  ...props
}) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-gray-700 mb-2">{label}</Text>
      <TextInput
        className={`border rounded-lg px-4 py-3 text-base text-gray-900 bg-white min-h-[100px] ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="Enter task description"
        placeholderTextColor="#9ca3af"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        {...props}
      />
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};

