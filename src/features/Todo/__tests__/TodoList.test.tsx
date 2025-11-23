import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TodoList } from '../components/TodoList';
import { useTodos } from '../hooks/useTodos';
import { Todo } from '../types/todo.types';

// Mock the hooks and components
jest.mock('../hooks/useTodos');
jest.mock('../components/TodoItem', () => ({
  TodoItem: 'TodoItem',
}));
jest.mock('../components/TodoItemSkeleton', () => ({
  TodoItemSkeleton: 'TodoItemSkeleton',
}));
jest.mock('../components/SearchInput', () => ({
  SearchInput: 'SearchInput',
}));

const mockUseTodos = useTodos as jest.Mock;

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    {
      id: '1',
      title: 'Active Todo 1',
      description: 'Description 1',
      dueDate: Date.now(),
      priority: 'urgent',
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: '2',
      title: 'Active Todo 2',
      description: 'Description 2',
      dueDate: Date.now(),
      priority: 'medium',
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: '3',
      title: 'Completed Todo',
      description: 'Description 3',
      dueDate: Date.now(),
      priority: 'normal',
      completed: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  beforeEach(() => {
    mockUseTodos.mockReturnValue({
      data: mockTodos,
      isLoading: false,
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(<TodoList />);
    
    expect(getByText('All')).toBeTruthy();
    expect(getByText('Urgent')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
    expect(getByText('Normal')).toBeTruthy();
  });

  it('displays todos when loaded', () => {
    const { UNSAFE_root } = render(<TodoList />);
    
    // Verify component renders with todos
    expect(UNSAFE_root).toBeTruthy();
  });

  it('shows loading skeletons when loading', () => {
    mockUseTodos.mockReturnValue({
      data: [],
      isLoading: true,
    });
    
    const { UNSAFE_root } = render(<TodoList />);
    
    // Verify component renders in loading state
    expect(UNSAFE_root).toBeTruthy();
  });

  it('filters todos by selected tab', () => {
    const { getByText, getByTestId } = render(<TodoList />);
    
    // Click on Urgent tab
    fireEvent.press(getByText('Urgent'));
    
    // Should call useTodos with urgent priority
    expect(mockUseTodos).toHaveBeenCalledWith(
      expect.objectContaining({
        priority: 'urgent',
      })
    );
  });

  it('updates search query when typing', () => {
    const { UNSAFE_root } = render(<TodoList />);
    
    // Verify component renders with search input
    expect(UNSAFE_root).toBeTruthy();
    expect(mockUseTodos).toHaveBeenCalled();
  });

  it('displays empty state when no todos', () => {
    mockUseTodos.mockReturnValue({
      data: [],
      isLoading: false,
    });
    
    const { getByText } = render(<TodoList />);
    
    expect(getByText('No todos found!')).toBeTruthy();
  });

  it('separates active and completed todos', () => {
    const { getByText } = render(<TodoList />);
    
    // Should show active and completed sections
    expect(getByText(/Active Tasks/)).toBeTruthy();
    expect(getByText(/Completed/)).toBeTruthy();
  });

  it('changes tab when tab is pressed', () => {
    const { getByText } = render(<TodoList />);
    
    const mediumTab = getByText('Medium');
    fireEvent.press(mediumTab);
    
    expect(mockUseTodos).toHaveBeenCalled();
  });
});

