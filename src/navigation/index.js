import {NavigationContainer} from '@react-navigation/native'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUser} from '../redux/actions/userActions'
import {darkTheme, lightTheme} from '../theme/theme'
import {useDarkMode} from '../theme/ThemeContext'
import AppNavigator from './app'
import AuthNavigator from './auth'

export default function RootNavigator() {
    const {isLoggedIn} = useSelector(state => state.user)
    const {dark} = useDarkMode()
    const dispatch = useDispatch()
    useEffect(() => {
        isLoggedIn && dispatch(fetchUser())
    }, [dispatch, isLoggedIn])

    return (
        <NavigationContainer theme={dark ? darkTheme : lightTheme}>
            {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}
