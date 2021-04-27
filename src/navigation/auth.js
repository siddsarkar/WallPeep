import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import LoginPage from '../views/LoginPage'

const Stack = createStackNavigator()
export default function AuthNavigator() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={LoginPage} />
        </Stack.Navigator>
    )
}
