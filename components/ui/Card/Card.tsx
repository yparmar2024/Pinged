import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  View,
  ViewStyle
} from 'react-native';
import { styles } from './Card.styles';

export interface CardProps {
  children?: React.ReactNode;
  imageSource?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'profile' | 'elevated';
  onLayout?: (event: any) => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  imageSource,
  imageStyle,
  style,
  variant = 'default',
  onLayout,
}) => {
  const getCardStyle = (): ViewStyle[] => {
    const cardStyles: ViewStyle[] = [styles.card];

    if (variant === 'profile') {
      cardStyles.push(styles.profileCard);
    } else if (variant === 'elevated') {
      cardStyles.push(styles.elevatedCard);
    }

    if (style) {
      cardStyles.push(style as ViewStyle);
    }

    return cardStyles;
  };

  const getImageStyle = (): ImageStyle[] => {
    const imageStyles: ImageStyle[] = [styles.image];
    if (imageStyle) {
      imageStyles.push(imageStyle as ImageStyle);
    }
    return imageStyles;
  };

  return (
    <View style={getCardStyle()} onLayout={onLayout}>
      {imageSource && (
        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={getImageStyle()}
            resizeMode="cover"
          />
          {children && <View style={styles.imageOverlay}>{children}</View>}
        </View>
      )}
      {!imageSource && children && (
        <View style={styles.content}>{children}</View>
      )}
    </View>
  );
};
