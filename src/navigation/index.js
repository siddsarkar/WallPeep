import {NavigationContainer} from '@react-navigation/native'
import React, {useState} from 'react'
import {darkTheme, lightTheme} from '../theme/theme'
import {useDarkMode} from '../theme/ThemeContext'
import AppNavigator from './app'
import AuthNavigator from './auth'

export default function RootNavigator() {
    // eslint-disable-next-line no-unused-vars
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const {dark} = useDarkMode()
    return (
        <NavigationContainer theme={dark ? darkTheme : lightTheme}>
            {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}
