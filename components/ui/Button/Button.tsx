import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { styles } from './Button.styles';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'apple' | 'google' | 'ghost' | 'text';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [variant === 'ghost' || variant === 'text' ? {} : styles.button];

    if (variant === 'primary') {
      baseStyles.push(styles.primaryButton);
    } else if (variant === 'secondary') {
      baseStyles.push(styles.secondaryButton);
    } else if (variant === 'apple') {
      baseStyles.push(styles.appleButton);
    } else if (variant === 'google') {
      baseStyles.push(styles.googleButton);
    } else if (variant === 'ghost') {
      baseStyles.push(styles.ghostButton);
    } else if (variant === 'text') {
      baseStyles.push(styles.textButton);
    }

    if (fullWidth) {
      baseStyles.push(styles.fullWidth);
    }

    if (disabled) {
      baseStyles.push(styles.disabled);
    }

    if (style) {
      baseStyles.push(style as ViewStyle);
    }

    return baseStyles;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyles: TextStyle[] = [styles.text];

    if (variant === 'primary' || variant === 'apple') {
      baseStyles.push(styles.primaryText);
    } else if (variant === 'secondary') {
      baseStyles.push(styles.secondaryText);
    } else if (variant === 'google') {
      baseStyles.push(styles.googleText);
    } else if (variant === 'ghost') {
      baseStyles.push(styles.ghostText);
    } else if (variant === 'text') {
      baseStyles.push(styles.textText);
    }

    if (textStyle) {
      baseStyles.push(textStyle as TextStyle);
    }

    return baseStyles;
  };

  const getLoaderColor = () => {
    if (variant === 'primary' || variant === 'apple') return '#FFFFFF';
    return '#FF3C38';
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={getLoaderColor()} size="small" />
      ) : (
        <View style={styles.buttonContent}>
          {icon && <Image source={icon} style={styles.buttonIcon} resizeMode="contain" />}
          <Text style={getTextStyle()}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
