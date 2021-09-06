import React, {createContext, useEffect, useState} from 'react'
import {Appearance, AppearanceProvider} from 'react-native-appearance'
import AsyncStore from '../utils/asyncStore'

function ThemeProvider({children}) {
  const [scheme, setScheme] = useState('light')

  useEffect(() => {
    /**
     * retrieve theme from AsyncStorage
     */
    ;(async function () {
      const asScheme = await AsyncStore.getItem('theme')
      console.info('App Theme:', asScheme)
      if (asScheme) {
        toggleScheme(asScheme)
      }
    })()

    /**
     * listener for scheme changes
     */
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      toggleScheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])

  const toggleScheme = _scheme => {
    setScheme(_scheme)
  }

  return (
    <ThemeContext.Provider
      value={{
        scheme,
        toggleScheme,
      }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const ThemeContext = createContext({
  scheme: 'light', // includes - dark, nord, nightly
  toggleScheme: () => {},
})

export default function ThemeManager({children}) {
  return (
    <AppearanceProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppearanceProvider>
  )
}
