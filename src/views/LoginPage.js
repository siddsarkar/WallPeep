/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useTheme} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Layout from '../components/common/Layout'

export default () => {
    const {colors} = useTheme()
    return (
        <Layout>
            <View style={s.root}>
                <Text style={{color: colors.text}}>Login</Text>
            </View>
        </Layout>
    )
}

const s = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})
