import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    position: 'relative',
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputContainerFocused: {
    borderWidth: 2,
    borderColor: '#FF3C38',
    shadowColor: '#FF3C38',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainerError: {
    borderWidth: 2,
    borderColor: '#FF3C38',
  },
  label: {
    position: 'absolute',
    left: 16,
    color: '#666666',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  labelFloating: {
    color: '#FF3C38',
    fontWeight: '600',
  },
  input: {
    fontSize: 16,
    color: '#1C1C1C',
    paddingTop: 8,
    height: 56,
  },
  errorText: {
    color: '#FF3C38',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 16,
    fontWeight: '500',
  },
});
