import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface TitleInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const TitleInput: React.FC<TitleInputProps> = ({
  label = 'Title',
  error,
  ...props
}) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-gray-700 mb-2">{label}</Text>
      <TextInput
        className={`border rounded-lg px-4 h-12 text-base text-gray-900 bg-white ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="Enter task title"
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};

