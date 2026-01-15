import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    height: 56,
    minWidth: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#FF3C38',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  primaryButton: {
    backgroundColor: '#FF3C38',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF3C38',
    ...Platform.select({
      ios: {
        shadowColor: '#FF3C38',
        shadowOpacity: 0.15,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  ghostButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FF3C38',
  },
  googleText: {
    color: '#1C1C1C',
  },
  ghostText: {
    color: '#FF3C38',
    fontSize: 16,
  },
  textText: {
    color: '#FF3C38',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
