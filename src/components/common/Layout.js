import {useTheme} from '@react-navigation/native'
import React from 'react'
import {SafeAreaView, StatusBar} from 'react-native'

export default ({children}) => {
    const {colors, dark} = useTheme()

    return (
        <SafeAreaView>
            <StatusBar
                backgroundColor={colors.card}
                barStyle={dark ? 'light-content' : 'dark-content'}
            />
            {children}
        </SafeAreaView>
    )
}
