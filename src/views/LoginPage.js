import {useTheme} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useDispatch} from 'react-redux'
import authorize from '../api/authorize'
import Layout from '../components/common/Layout'
import {loginUser} from '../redux/actions/userActions'

export default function LoginPage() {
    const {colors} = useTheme()
    const dispatch = useDispatch()
    const handlePress = async () => {
        let token = await authorize.getAccessToken()
        dispatch(loginUser(token))
    }

    return (
        <Layout>
            <TouchableOpacity onPress={handlePress} style={s.root}>
                <View style={s.btn}>
                    <Text style={{color: colors.text}}>Login</Text>
                </View>
            </TouchableOpacity>
        </Layout>
    )
}

const s = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    btn: {
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30
    }
})
