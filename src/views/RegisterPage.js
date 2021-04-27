/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {Text} from 'react-native'
import Layout from '../components/common/Layout'

export default function RegisterPage() {
    const {colors} = useTheme()
    return (
        <Layout>
            <Text style={{color: colors.text}}>Register</Text>
        </Layout>
    )
}
