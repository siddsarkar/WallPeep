import {useTheme} from '@react-navigation/native'
import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import Layout from '../components/common/Layout'

const ImageView = ({route}) => {
    const {colors} = useTheme()
    return (
        <Layout>
            <View style={[s.root, {backgroundColor: colors.background}]}>
                <Image source={{uri: route.params.url}} style={s.image} />
            </View>
        </Layout>
    )
}

export default ImageView

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
