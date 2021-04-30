import {useTheme} from '@react-navigation/native'
import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useDispatch} from 'react-redux'
import authorize from '../api/authorize'
import Layout from '../components/common/Layout'
import {loginUser} from '../redux/actions/userActions'

export default function LoginPage({route, navigation}) {
    const {colors} = useTheme()
    const dispatch = useDispatch()
    const handlePress = async () => {
        let token = await authorize.getAccessToken()
        dispatch(loginUser(token))
    }

    return (
        <Layout>
            <View style={s.root}>
                <TouchableOpacity
                    onPress={handlePress}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={[s.btn, {backgroundColor: '#fff'}]}>
                    <Image
                        style={s.logo}
                        source={require('../assets/images/Unsplash_Symbol.png')}
                    />
                    <Text
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={[s.btnText, {color: '#000'}]}>
                        Login with Unsplash
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('App Keys')}
                    style={[s.btn, {backgroundColor: colors.text}]}>
                    <Text style={[s.btnText, {color: colors.background}]}>
                        Set your app keys
                    </Text>
                </TouchableOpacity>
            </View>
        </Layout>
    )
}

const s = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
        // backgroundColor: 'green'
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 30,
        width: 350,
        marginBottom: 12,
        borderRadius: 6,
        borderColor: 'darkgrey',
        borderWidth: 1
    },
    btnText: {
        fontFamily: 'JosefinSans-Regular',
        fontSize: 16
    },
    logo: {
        height: 16,
        width: 16,
        marginRight: 12
    }
})
