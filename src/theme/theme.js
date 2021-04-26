import {DarkTheme, DefaultTheme} from '@react-navigation/native'

export const darkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    cardheader: '#1b1b1b'
  }
}

export const lightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    cardheader: '#fff',
    card: '#efecec',
    background: '#efecec'
  }
}
