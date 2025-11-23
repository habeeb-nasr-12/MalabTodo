import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchInput } from '../components/SearchInput';

describe('SearchInput', () => {
  it('renders correctly with default placeholder', () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    
    expect(getByPlaceholderText('Search tasks by title...')).toBeTruthy();
  });

  it('renders with custom placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchInput placeholder="Search here..." />
    );
    
    expect(getByPlaceholderText('Search here...')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput onChangeText={onChangeText} />
    );
    
    const input = getByPlaceholderText('Search tasks by title...');
    fireEvent.changeText(input, 'test query');
    
    expect(onChangeText).toHaveBeenCalledWith('test query');
  });

  it('displays value when provided', () => {
    const { getByDisplayValue } = render(
      <SearchInput value="search term" />
    );
    
    expect(getByDisplayValue('search term')).toBeTruthy();
  });

  it('has autoCapitalize set to none', () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    
    const input = getByPlaceholderText('Search tasks by title...');
    expect(input.props.autoCapitalize).toBe('none');
  });

  it('has autoCorrect set to false', () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    
    const input = getByPlaceholderText('Search tasks by title...');
    expect(input.props.autoCorrect).toBe(false);
  });
});

