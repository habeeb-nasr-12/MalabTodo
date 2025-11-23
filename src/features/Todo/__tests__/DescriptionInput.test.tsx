import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DescriptionInput } from '../components/DescriptionInput';

describe('DescriptionInput', () => {
  it('renders correctly with default props', () => {
    const { getByText, getByPlaceholderText } = render(<DescriptionInput />);
    
    expect(getByText('Description')).toBeTruthy();
    expect(getByPlaceholderText('Enter task description')).toBeTruthy();
  });

  it('renders with custom label', () => {
    const { getByText } = render(<DescriptionInput label="Task Description" />);
    
    expect(getByText('Task Description')).toBeTruthy();
  });

  it('displays error message when error prop is provided', () => {
    const { getByText } = render(
      <DescriptionInput error="Description is too long" />
    );
    
    expect(getByText('Description is too long')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <DescriptionInput onChangeText={onChangeText} />
    );
    
    const input = getByPlaceholderText('Enter task description');
    fireEvent.changeText(input, 'Task description');
    
    expect(onChangeText).toHaveBeenCalledWith('Task description');
  });

  it('calls onBlur when input loses focus', () => {
    const onBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <DescriptionInput onBlur={onBlur} />
    );
    
    const input = getByPlaceholderText('Enter task description');
    fireEvent(input, 'blur');
    
    expect(onBlur).toHaveBeenCalled();
  });

  it('displays value when provided', () => {
    const { getByDisplayValue } = render(
      <DescriptionInput value="Existing description" />
    );
    
    expect(getByDisplayValue('Existing description')).toBeTruthy();
  });

  it('is multiline', () => {
    const { getByPlaceholderText } = render(<DescriptionInput />);
    
    const input = getByPlaceholderText('Enter task description');
    expect(input.props.multiline).toBe(true);
  });

  it('respects editable prop', () => {
    const { getByPlaceholderText } = render(
      <DescriptionInput editable={false} />
    );
    
    const input = getByPlaceholderText('Enter task description');
    expect(input.props.editable).toBe(false);
  });
});

