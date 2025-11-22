// Theme colors - Modern dark theme with slate/teal accents
// This file can be extended for custom theme values if needed

export const colors = {
  primary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#14b8a6',
};

export const priorityColors = {
  normal: '#10b981',    // green (maps to low)
  medium: '#f59e0b',    // amber (maps to medium) - note: typo in type definition
  urgent: '#ef4444',    // red (maps to high)
};

// Helper function to get priority color
export const getPriorityColor = (priority: string): string => {
  return priorityColors[priority as keyof typeof priorityColors] || priorityColors.meduim;
};

