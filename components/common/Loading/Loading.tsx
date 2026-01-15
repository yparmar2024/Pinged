import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleProp,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { styles } from './Loading.styles';

export interface LoadingProps {
  size?: 'small' | 'large' | number;
  text?: string;
  fullScreen?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 48,
  text,
  fullScreen = false,
  color = '#FF3C38',
  style,
  textStyle,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, scaleAnim]);

  const containerStyle: StyleProp<ViewStyle> = fullScreen
    ? [styles.fullScreenContainer, style]
    : [styles.container, style];

  return (
    <View style={containerStyle}>
      <Animated.View
        style={[
          styles.spinnerContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <ActivityIndicator
          size={size}
          color={color}
          accessibilityLabel="Loading"
          accessibilityRole="progressbar"
        />
      </Animated.View>
      {text && (
        <Animated.Text
          style={[
            styles.text,
            textStyle,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          {text}
        </Animated.Text>
      )}
    </View>
  );
};
