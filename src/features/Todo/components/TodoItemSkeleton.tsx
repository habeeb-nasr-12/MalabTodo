import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

export const TodoItemSkeleton: React.FC = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View className="bg-white rounded-lg p-4 mb-3 border border-gray-200 shadow-sm">
      <View className="flex-row items-start">
        {/* Checkbox skeleton */}
        <Animated.View
          style={{ opacity }}
          className="w-6 h-6 rounded-full bg-gray-200 mr-3 mt-1"
        />
        <View className="flex-1">
          {/* Title skeleton */}
          <Animated.View
            style={{ opacity }}
            className="h-5 bg-gray-200 rounded mb-2"
          />
          {/* Description skeleton */}
          <Animated.View
            style={{ opacity }}
            className="h-4 bg-gray-200 rounded mb-1 w-3/4"
          />
          <Animated.View
            style={{ opacity }}
            className="h-4 bg-gray-200 rounded mb-2 w-1/2"
          />
          {/* Footer skeleton */}
          <View className="flex-row items-center justify-between">
            <Animated.View
              style={{ opacity }}
              className="h-3 bg-gray-200 rounded w-20"
            />
            <View className="flex-row items-center">
              <Animated.View
                style={{ opacity }}
                className="h-5 bg-gray-200 rounded-full w-16 mr-3"
              />
              <Animated.View
                style={{ opacity }}
                className="w-5 h-5 bg-gray-200 rounded mr-1"
              />
              <Animated.View
                style={{ opacity }}
                className="w-5 h-5 bg-gray-200 rounded"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

