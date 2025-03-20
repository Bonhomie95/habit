import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 24,
    marginVertical: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonSpacing: {
    marginVertical: 8,
  },
});


export const theme = {
  colors: {
    primary: '#6200ee',
    secondary: '#03dac6',
    background: '#ffffff',
    text: '#000000',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  fonts: {
    headingSize: 22,
    bodySize: 16,
  },
};
