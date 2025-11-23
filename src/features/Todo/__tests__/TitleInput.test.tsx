import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TitleInput } from '../components/TitleInput';

describe('TitleInput', () => {
  it('renders correctly with default props', () => {
    const { getByText, getByPlaceholderText } = render(<TitleInput />);
    
    expect(getByText('Title')).toBeTruthy();
    expect(getByPlaceholderText('Enter task title')).toBeTruthy();
  });

  it('renders with custom label', () => {
    const { getByText } = render(<TitleInput label="Task Title" />);
    
    expect(getByText('Task Title')).toBeTruthy();
  });

  it('displays error message when error prop is provided', () => {
    const { getByText } = render(<TitleInput error="Title is required" />);
    
    expect(getByText('Title is required')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <TitleInput onChangeText={onChangeText} />
    );
    
    const input = getByPlaceholderText('Enter task title');
    fireEvent.changeText(input, 'New Task');
    
    expect(onChangeText).toHaveBeenCalledWith('New Task');
  });

  it('calls onBlur when input loses focus', () => {
    const onBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <TitleInput onBlur={onBlur} />
    );
    
    const input = getByPlaceholderText('Enter task title');
    fireEvent(input, 'blur');
    
    expect(onBlur).toHaveBeenCalled();
  });

  it('displays value when provided', () => {
    const { getByDisplayValue } = render(
      <TitleInput value="Existing Task" />
    );
    
    expect(getByDisplayValue('Existing Task')).toBeTruthy();
  });

  it('respects editable prop', () => {
    const { getByPlaceholderText } = render(
      <TitleInput editable={false} />
    );
    
    const input = getByPlaceholderText('Enter task title');
    expect(input.props.editable).toBe(false);
  });
});

