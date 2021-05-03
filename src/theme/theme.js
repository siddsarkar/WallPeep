import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export const darkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    cardheader: '#1b1b1b',
    inputbackground: '#4a4a4f',
    placeholder: '#737373',
  },
};

export const lightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    cardheader: '#fff',
    inputbackground: '#ececec',
    placeholder: '#737373',
  },
};

// define more themes
