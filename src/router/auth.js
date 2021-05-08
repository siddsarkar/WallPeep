import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import AppKeysPage from '../views/pages/AppKeysPage'
import LoginPage from '../views/pages/LoginPage'

/**
 * TODO: Add OnBorading Screens
 */

const Stack = createStackNavigator()

export default function AuthNavigator({onBoardUser}) {
    return (
        <Stack.Navigator mode='modal'>
            <Stack.Screen
                name='Login'
                options={{headerShown: false}}
                component={LoginPage}
            />

            <Stack.Screen
                name='App Keys'
                options={{
                    headerShown: true,
                    headerStyle: {
                        shadowColor: 'transparent'
                    }
                }}
                component={AppKeysPage}
            />
        </Stack.Navigator>
    )
}
