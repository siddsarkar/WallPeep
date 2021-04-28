import {useTheme} from '@react-navigation/native'
import React, {useEffect} from 'react'
import {Image, StyleSheet, View} from 'react-native'
import Layout from '../components/common/Layout'

const LandingPage = ({route, navigation}) => {
    const {colors} = useTheme()

    useEffect(() => {
        if (route.params.url) {
            // Post updated, do something with `route.params.post`
            // For example, send the post to the server
            console.log(route.params.url)
        }
        // ImmersiveMode.fullLayout(true)

        // return () => {
        //     ImmersiveMode.fullLayout(false)
        // }
    }, [route.params?.url])

    return (
        <Layout>
            <View style={[s.root, {backgroundColor: colors.background}]}>
                <Image source={{uri: route.params.url}} style={s.image} />
            </View>
        </Layout>
    )
}

export default LandingPage

const s = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 500
    }
})
