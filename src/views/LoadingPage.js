/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useTheme} from '@react-navigation/native'
import React from 'react'
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import Layout from '../components/common/Layout'

export default function LoadingPage() {
    const {colors, dark} = useTheme()

    return (
        <Layout>
            <View style={s.loader}>
                <ActivityIndicator color={colors.text} size="large" />
                <Text
                    style={[
                        s.text,
                        {
                            color: colors.text
                        }
                    ]}>
                    {dark ? 'true' : 'false'}...
                </Text>
            </View>
        </Layout>
    )
}

const s = StyleSheet.create({
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    text: {
        marginTop: 10,
        fontFamily: 'JosefinSans-Regular'
    }
})
