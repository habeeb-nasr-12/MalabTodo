import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Priority } from '../types/todo.types';

interface PrioritySelectorProps {
  label?: string;
  value?: Priority;
  onChange?: (priority: Priority) => void;
  error?: string;
}

const priorityOptions: { value: Priority; label: string; color: string; lightColor: string; darkColor: string }[] = [
  { 
    value: 'normal', 
    label: 'Normal', 
    color: '#059669', // emerald-600 - premium green
    lightColor: '#D1FAE5', // emerald-100
    darkColor: '#047857' // emerald-700
  },
  { 
    value: 'medium', 
    label: 'Medium', 
    color: '#D97706', // amber-600 - premium amber
    lightColor: '#FEF3C7', // amber-100
    darkColor: '#B45309' // amber-700
  },
  { 
    value: 'urgent', 
    label: 'Urgent', 
    color: '#DC2626', // red-600 - premium red
    lightColor: '#FEE2E2', // red-100
    darkColor: '#B91C1C' 
  },
];

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  label = 'Priority',
  value = 'medium',
  onChange,
  error,
}) => {
  const handlePress = (priority: Priority) => {
    if (onChange) {
      onChange(priority);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.optionsContainer}>
        {priorityOptions.map((option) => {
          const isSelected = value === option.value;
          const color = option.color;
          
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                !isSelected && styles.optionUnselected,
                isSelected && {
                  backgroundColor: color,
                  borderColor: color,
                  ...Platform.select({
                    ios: {
                      shadowColor: color,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                    },
                    android: {
                      elevation: 6,
                    },
                  }),
                },
              ]}
              onPress={() => handlePress(option.value)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.selectedText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },
  optionUnselected: {
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: '#1F2937',
  },
  selectedText: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  error: {
    fontSize: 13,
    color: '#DC2626',
    marginTop: 6,
    fontWeight: '500',
  },
});

export { PrioritySelector };