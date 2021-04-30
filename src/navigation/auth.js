import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {AppKeysPage} from '../views'
import LoginPage from '../views/LoginPage'

const Stack = createStackNavigator()
export default function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                options={{headerShown: false}}
                component={LoginPage}
            />
            <Stack.Screen
                name="App Keys"
                options={{headerShown: true}}
                component={AppKeysPage}
            />
        </Stack.Navigator>
    )
}
