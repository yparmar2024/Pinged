import React, { useRef, useState } from 'react';
import {
  Animated,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { styles } from './Input.styles';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const handleFocus = (e: any) => {
    setIsFocused(true);
    Animated.timing(labelPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(labelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    onBlur?.(e);
  };

  // Shake animation for errors
  React.useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error, shakeAnimation]);

  const labelTop = labelPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [18, -8],
  });

  const labelFontSize = labelPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  });

  const getContainerStyle = (): StyleProp<ViewStyle> => {
    const containerStyles: ViewStyle[] = [styles.container];
    if (containerStyle) {
      containerStyles.push(containerStyle as ViewStyle);
    }
    return containerStyles;
  };

  const getInputContainerStyle = (): StyleProp<ViewStyle> => {
    const inputContainerStyles: ViewStyle[] = [styles.inputContainer];
    if (isFocused) {
      inputContainerStyles.push(styles.inputContainerFocused);
    }
    if (error) {
      inputContainerStyles.push(styles.inputContainerError);
    }
    return inputContainerStyles;
  };

  const getLabelStyle = (): StyleProp<TextStyle> => {
    const labelStyles: TextStyle[] = [styles.label];

    if (isFocused || value) {
      labelStyles.push(styles.labelFloating);
    }
    if (labelStyle) {
      labelStyles.push(labelStyle as TextStyle);
    }
    return [
      ...labelStyles,
      {
        top: labelTop,
        fontSize: labelFontSize,
      } as any
    ];
  };

  return (
    <Animated.View
      style={[
        getContainerStyle(),
        { transform: [{ translateX: shakeAnimation }] },
      ]}
    >
      <View style={getInputContainerStyle()}>
        <Animated.Text style={getLabelStyle()}>{label}</Animated.Text>
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="#999999"
          accessibilityLabel={label}
          accessibilityRole="none"
          {...rest}
        />
      </View>
      {error && (
        <Text style={[styles.errorText, errorStyle]} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </Animated.View>
  );
};
