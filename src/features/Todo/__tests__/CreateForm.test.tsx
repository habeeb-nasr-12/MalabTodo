import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { CreateForm } from '../components/CreateForm';
import { useCreateTodo } from '../hooks/useCreateTodo';
import { useNavigation } from '@react-navigation/native';

// Mock Alert - use Object.defineProperty to mock alert method
const mockAlert = jest.fn();
Object.defineProperty(Alert, 'alert', {
  value: mockAlert,
  writable: true,
  configurable: true,
});

// Mock navigation
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mock the hooks
jest.mock('../hooks/useCreateTodo');

// Mock react-hook-form
const mockHandleSubmit = jest.fn((fn) => fn);
const mockOnChange = jest.fn();
const mockControl = {};

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    control: mockControl,
    handleSubmit: mockHandleSubmit,
    formState: {
      errors: {},
    },
  })),
  Controller: ({ render: renderFn }: any) => {
    return renderFn({
      field: {
        onChange: mockOnChange,
        onBlur: jest.fn(),
        value: '',
      },
    });
  },
}));

// Mock child components
jest.mock('../components/TitleInput', () => ({
  TitleInput: ({ onChangeText, value, error, ...props }: any) => {
    const { TextInput, Text, View } = require('react-native');
    return (
      <View>
        <Text>Title</Text>
        <TextInput
          testID="title-input"
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter task title"
          {...props}
        />
        {error && <Text testID="title-error">{error}</Text>}
      </View>
    );
  },
}));

jest.mock('../components/DescriptionInput', () => ({
  DescriptionInput: ({ onChangeText, value, error, ...props }: any) => {
    const { TextInput, Text, View } = require('react-native');
    return (
      <View>
        <Text>Description</Text>
        <TextInput
          testID="description-input"
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter task description"
          {...props}
        />
        {error && <Text testID="description-error">{error}</Text>}
      </View>
    );
  },
}));

jest.mock('../components/DateSelector', () => ({
  DateSelector: ({ value, onChange }: any) => {
    const { TouchableOpacity, Text, View } = require('react-native');
    return (
      <View testID="date-selector">
        <Text>Due Date</Text>
        <TouchableOpacity
          testID="date-selector-button"
          onPress={() => onChange(Date.now())}
        >
          <Text>{value ? new Date(value).toLocaleDateString() : 'Select Date'}</Text>
        </TouchableOpacity>
      </View>
    );
  },
}));

jest.mock('../components/PrioritySelector', () => ({
  PrioritySelector: ({ value, onChange }: any) => {
    const { TouchableOpacity, Text, View } = require('react-native');
    return (
      <View testID="priority-selector">
        <Text>Priority</Text>
        <TouchableOpacity
          testID="priority-button-normal"
          onPress={() => onChange('normal')}
        >
          <Text>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="priority-button-medium"
          onPress={() => onChange('medium')}
        >
          <Text>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="priority-button-urgent"
          onPress={() => onChange('urgent')}
        >
          <Text>Urgent</Text>
        </TouchableOpacity>
        <Text testID="priority-value">{value}</Text>
      </View>
    );
  },
}));

const mockUseCreateTodo = useCreateTodo as jest.Mock;
const mockUseNavigation = useNavigation as jest.Mock;

describe('CreateForm', () => {
  const mockMutateAsync = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseNavigation.mockReturnValue({
      goBack: mockGoBack,
    });

    mockMutateAsync.mockResolvedValue({
      id: '1',
      title: 'Test Todo',
      description: 'Test Description',
      dueDate: Date.now(),
      priority: 'medium',
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    mockUseCreateTodo.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    // Reset react-hook-form mock
    (require('react-hook-form').useForm as jest.Mock).mockReturnValue({
      control: mockControl,
      handleSubmit: mockHandleSubmit,
      formState: {
        errors: {},
      },
    });
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<CreateForm />);
    
    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Description')).toBeTruthy();
    expect(getByText('Due Date')).toBeTruthy();
    expect(getByText('Priority')).toBeTruthy();
    expect(getByPlaceholderText('Enter task title')).toBeTruthy();
    expect(getByPlaceholderText('Enter task description')).toBeTruthy();
    expect(getByText('Add Task')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('renders all form fields', () => {
    const { getByTestId } = render(<CreateForm />);
    
    expect(getByTestId('title-input')).toBeTruthy();
    expect(getByTestId('description-input')).toBeTruthy();
    expect(getByTestId('date-selector')).toBeTruthy();
    expect(getByTestId('priority-selector')).toBeTruthy();
  });

  it('calls handleCancel when cancel button is pressed', () => {
    const { getByText } = render(<CreateForm />);
    
    const cancelButton = getByText('Cancel');
    fireEvent.press(cancelButton);
    
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('displays validation errors for title when empty', async () => {
    const mockErrors = {
      title: { message: 'Title is required' },
    };

    (require('react-hook-form').useForm as jest.Mock).mockReturnValue({
      control: mockControl,
      handleSubmit: mockHandleSubmit,
      formState: {
        errors: mockErrors,
      },
    });

    const { getByTestId } = render(<CreateForm />);
    
    await waitFor(() => {
      expect(getByTestId('title-error')).toBeTruthy();
      expect(getByTestId('title-error').props.children).toBe('Title is required');
    });
  });

  it('displays validation errors for description when empty', async () => {
    const mockErrors = {
      description: { message: 'Description is required' },
    };

    (require('react-hook-form').useForm as jest.Mock).mockReturnValue({
      control: mockControl,
      handleSubmit: mockHandleSubmit,
      formState: {
        errors: mockErrors,
      },
    });

    const { getByTestId } = render(<CreateForm />);
    
    await waitFor(() => {
      expect(getByTestId('description-error')).toBeTruthy();
      expect(getByTestId('description-error').props.children).toBe('Description is required');
    });
  });

  it('calls handleSubmit when Add Task button is pressed', () => {
    const { getByText } = render(<CreateForm />);
    
    const addTaskButton = getByText('Add Task');
    fireEvent.press(addTaskButton);
    
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('submits form with correct data when valid', async () => {
    mockHandleSubmit.mockImplementation((fn) => () => {
      fn({
        title: 'Test Todo',
        description: 'Test Description',
        dueDate: Date.now(),
        priority: 'medium',
      });
    });

    (require('react-hook-form').useForm as jest.Mock).mockReturnValue({
      control: mockControl,
      handleSubmit: (fn: any) => () => {
        fn({
          title: 'Test Todo',
          description: 'Test Description',
          dueDate: Date.now(),
          priority: 'medium',
        });
      },
      formState: {
        errors: {},
      },
    });

    const { getByText } = render(<CreateForm />);
    
    const addTaskButton = getByText('Add Task');
    fireEvent.press(addTaskButton);
    
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Todo',
          description: 'Test Description',
          priority: 'medium',
        }),
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
    });
  });

  it('shows success alert and navigates back on successful submission', async () => {
    (require('react-hook-form').useForm as jest.Mock).mockReturnValue({
      control: mockControl,
      handleSubmit: (fn: any) => () => {
        fn({
          title: 'Test Todo',
          description: 'Test Description',
          dueDate: Date.now(),
          priority: 'medium',
        });
      },
      formState: {
        errors: {},
      },
    });

    const { getByText } = render(<CreateForm />);
    
    const addTaskButton = getByText('Add Task');
    fireEvent.press(addTaskButton);
    
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
    });

    // Simulate successful mutation
    const callArgs = mockMutateAsync.mock.calls[0];
    const onSuccessCallback = callArgs[1].onSuccess;
    onSuccessCallback();

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        'Success',
        'Task created successfully!',
        expect.any(Array)
      );
    });

    // Simulate OK button press in alert
    const alertCall = mockAlert.mock.calls[0];
    const alertButtons = alertCall[2];
    const okButton = alertButtons.find((btn: any) => btn.text === 'OK');
    okButton.onPress();

    expect(mockGoBack).toHaveBeenCalled();
  });

  it('shows error alert on failed submission', async () => {
    mockMutateAsync.mockRejectedValueOnce(new Error('Network error'));

    (require('react-hook-form').useForm as jest.Mock).mockReturnValue({
      control: mockControl,
      handleSubmit: (fn: any) => () => {
        fn({
          title: 'Test Todo',
          description: 'Test Description',
          dueDate: Date.now(),
          priority: 'medium',
        });
      },
      formState: {
        errors: {},
      },
    });

    const { getByText } = render(<CreateForm />);
    
    const addTaskButton = getByText('Add Task');
    fireEvent.press(addTaskButton);
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        'Error',
        'Failed to create task. Please try again.'
      );
    });
  });

  it('disables buttons when isPending is true', () => {
    mockUseCreateTodo.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: true,
    });

    const { getByText, UNSAFE_root } = render(<CreateForm />);
    
    const addTaskButton = getByText('Adding...');
    const cancelButton = getByText('Cancel');
    
    expect(addTaskButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
    
    const { TouchableOpacity } = require('react-native');
    const touchableOpacityes = UNSAFE_root.findAllByType(TouchableOpacity);
    const addButtonTouchable = touchableOpacityes.find((to: any) => 
      to.props.onPress && to.props.disabled === true
    );
    const cancelButtonTouchable = touchableOpacityes.find((to: any) => 
      to.props.onPress && to.props.disabled === true
    );
    
    expect(addButtonTouchable?.props.disabled).toBe(true);
    expect(cancelButtonTouchable?.props.disabled).toBe(true);
  });

  it('trims title and description before submission', async () => {
    (require('react-hook-form').useForm as jest.Mock).mockReturnValue({
      control: mockControl,
      handleSubmit: (fn: any) => () => {
        fn({
          title: '  Test Todo  ',
          description: '  Test Description  ',
          dueDate: Date.now(),
          priority: 'medium',
        });
      },
      formState: {
        errors: {},
      },
    });

    const { getByText } = render(<CreateForm />);
    
    const addTaskButton = getByText('Add Task');
    fireEvent.press(addTaskButton);
    
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Todo',
          description: 'Test Description',
        }),
        expect.any(Object)
      );
    });
  });

  it('allows changing priority', () => {
    const { getByTestId } = render(<CreateForm />);
    
    const urgentButton = getByTestId('priority-button-urgent');
    fireEvent.press(urgentButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('urgent');
  });

  it('allows changing date', () => {
    const { getByTestId } = render(<CreateForm />);
    
    const dateButton = getByTestId('date-selector-button');
    fireEvent.press(dateButton);
    
    expect(mockOnChange).toHaveBeenCalled();
  });
});

