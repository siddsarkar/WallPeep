import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {retrieveUser} from '../redux/actions/userActions'
import {darkTheme, lightTheme} from '../theme/theme'
import {useDarkMode} from '../theme/ThemeContext'
import AsyncStore from '../utils/AsyncStore'
import {LoadingPage} from '../views'
import AppNavigator from './app'
import AuthNavigator from './auth'

const RootStack = createStackNavigator()

function MainStackScreen({isLoggedIn}) {
    return isLoggedIn ? <AppNavigator /> : <AuthNavigator />
}

export default function RootNavigator() {
    const [isLoading, setIsLoading] = useState(true)
    const {isLoggedIn} = useSelector(state => state.user)
    const {dark} = useDarkMode()
    const dispatch = useDispatch()

    const initialLoad = useCallback(async () => {
        setIsLoading(true)
        let keys = await AsyncStore.getItem('Keys')
        if (keys && keys.accessKey && keys.secretKey) {
            let accessToken = await AsyncStore.getItem('access_token')
            setTimeout(() => {
                dispatch(retrieveUser(() => setIsLoading(false), {accessToken}))
            }, 2000)
        } else setIsLoading(false)
    }, [dispatch])

    useEffect(() => {
        initialLoad()
    }, [initialLoad])

    return (
        <NavigationContainer theme={dark ? darkTheme : lightTheme}>
            {isLoading ? (
                <RootStack.Navigator headerMode="none">
                    <RootStack.Screen name="Loading" component={LoadingPage} />
                </RootStack.Navigator>
            ) : (
                MainStackScreen({isLoggedIn})
            )}
        </NavigationContainer>
    )
}
