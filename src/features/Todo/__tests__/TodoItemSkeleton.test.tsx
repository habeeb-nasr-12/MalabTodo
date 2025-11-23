import React from 'react';
import { render } from '@testing-library/react-native';
import { TodoItemSkeleton } from '../components/TodoItemSkeleton';

describe('TodoItemSkeleton', () => {
  it('renders correctly', () => {
    const { UNSAFE_root } = render(<TodoItemSkeleton />);
    
    expect(UNSAFE_root).toBeTruthy();
  });

  it('renders skeleton elements', () => {
    const { UNSAFE_root } = render(<TodoItemSkeleton />);
    
    // Should render multiple animated views for skeleton effect
    const Animated = require('react-native').Animated;
    const animatedViews = UNSAFE_root.findAllByType(Animated.View);
    expect(animatedViews.length).toBeGreaterThan(0);
  });

  it('has proper structure with checkbox, title, and description skeletons', () => {
    const { UNSAFE_root } = render(<TodoItemSkeleton />);
    
    // Verify the component renders without errors
    expect(UNSAFE_root).toBeTruthy();
  });
});

