import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DateSelector } from '../components/DateSelector';
jest.mock('react-native-calendars', () => {
  const mockReact = require('react');
  const mockRN = require('react-native');
  return {
    Calendar: (props: any) => {
      return mockReact.createElement(mockRN.View, {
        testID: 'calendar',
        onPress: () => {
          props.onDayPress?.({ dateString: '2024-01-15' });
        },
      });
    },
  };
});

describe('DateSelector', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly with default props', () => {
    const { getByText } = render(<DateSelector />);
    
    expect(getByText('Due Date')).toBeTruthy();
  });

  it('renders with custom label', () => {
    const { getByText } = render(<DateSelector label="Select Date" />);
    
    expect(getByText('Select Date')).toBeTruthy();
  });

  it('displays error message when error prop is provided', () => {
    const { getByText } = render(
      <DateSelector error="Date is required" />
    );
    
    expect(getByText('Date is required')).toBeTruthy();
  });

  it('opens modal when date selector is pressed', () => {
    const { getByText, queryByTestId } = render(<DateSelector />);
    
    const dateButton = getByText(/01\/01\/2024/);
    fireEvent.press(dateButton);
    
    expect(queryByTestId('calendar')).toBeTruthy();
  });

  it('calls onChange when a date is selected', () => {
    const onChange = jest.fn();
    const { getByText, getByTestId } = render(
      <DateSelector onChange={onChange} />
    );
    
    const dateButton = getByText(/01\/01\/2024/);
    fireEvent.press(dateButton);
    
    const calendar = getByTestId('calendar');
    fireEvent.press(calendar);
    
    expect(onChange).toHaveBeenCalled();
  });

  it('displays formatted date correctly', () => {
    const timestamp = new Date('2024-12-25').getTime();
    const { getByText } = render(
      <DateSelector value={timestamp} />
    );
    
    expect(getByText(/25\/12\/2024/)).toBeTruthy();
  });

  it('syncs with value prop changes', () => {
    const { rerender, getByText } = render(
      <DateSelector value={new Date('2024-01-01').getTime()} />
    );
    
    expect(getByText(/01\/01\/2024/)).toBeTruthy();
    
    rerender(
      <DateSelector value={new Date('2024-12-25').getTime()} />
    );
    
    expect(getByText(/25\/12\/2024/)).toBeTruthy();
  });
});

