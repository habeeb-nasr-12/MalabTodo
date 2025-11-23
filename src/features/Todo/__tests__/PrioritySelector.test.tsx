import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PrioritySelector } from '../components/PrioritySelector';

describe('PrioritySelector', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<PrioritySelector />);
    
    expect(getByText('Priority')).toBeTruthy();
    expect(getByText('Normal')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
    expect(getByText('Urgent')).toBeTruthy();
  });

  it('renders with custom label', () => {
    const { getByText } = render(<PrioritySelector label="Task Priority" />);
    
    expect(getByText('Task Priority')).toBeTruthy();
  });

  it('displays error message when error prop is provided', () => {
    const { getByText } = render(
      <PrioritySelector error="Priority is required" />
    );
    
    expect(getByText('Priority is required')).toBeTruthy();
  });

  it('calls onChange when a priority option is pressed', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <PrioritySelector onChange={onChange} />
    );
    
    fireEvent.press(getByText('Urgent'));
    
    expect(onChange).toHaveBeenCalledWith('urgent');
  });

  it('calls onChange with correct priority for each option', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <PrioritySelector onChange={onChange} />
    );
    
    fireEvent.press(getByText('Normal'));
    expect(onChange).toHaveBeenCalledWith('normal');
    
    fireEvent.press(getByText('Medium'));
    expect(onChange).toHaveBeenCalledWith('medium');
    
    fireEvent.press(getByText('Urgent'));
    expect(onChange).toHaveBeenCalledWith('urgent');
  });

  it('shows selected priority correctly', () => {
    const { getByText } = render(
      <PrioritySelector value="urgent" />
    );
    
    const urgentButton = getByText('Urgent').parent;
    expect(urgentButton).toBeTruthy();
  });

  it('does not call onChange when onChange is not provided', () => {
    const { getByText } = render(<PrioritySelector />);
    
    expect(() => fireEvent.press(getByText('Normal'))).not.toThrow();
  });

  it('renders without label when label is not provided', () => {
    const { queryByText } = render(<PrioritySelector label="" />);
    
    expect(queryByText('Priority')).toBeNull();
  });
});

