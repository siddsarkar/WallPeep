/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useTheme} from '@react-navigation/native'
import React from 'react'
import {Text} from 'react-native'
import Layout from '../components/common/Layout'

export default function LoginPage() {
    const {colors} = useTheme()
    return (
        <Layout>
            <Text style={{color: colors.text}}>Login</Text>
        </Layout>
    )
}
