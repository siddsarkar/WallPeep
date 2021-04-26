import React, {createContext, useContext, useEffect, useState} from 'react'
import {Appearance, AppearanceProvider} from 'react-native-appearance'

const defaultState = {
    dark: false,
    toggleDark: () => {}
}

const ThemeContext = createContext(defaultState)

const ThemeProvider = ({children}) => {
    const [dark, setDark] = useState(false)

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({colorScheme}) => {
            toggleDark(colorScheme)
        })
        return () => subscription.remove()
    }, [])

    const toggleDark = mode => {
        setDark(mode)
    }

    return (
        <ThemeContext.Provider
            value={{
                dark,
                toggleDark
            }}>
            {children}
        </ThemeContext.Provider>
    )
}

// switch and get theme info
const useDarkMode = () => useContext(ThemeContext)

// context for entry file
const ThemeManager = ({children}) => (
    <AppearanceProvider>
        <ThemeProvider>{children}</ThemeProvider>
    </AppearanceProvider>
)

export {useDarkMode, ThemeManager}
