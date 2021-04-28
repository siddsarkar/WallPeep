import {useTheme} from '@react-navigation/native'
import React from 'react'
import {StyleSheet} from 'react-native'
import Layout from '../components/common/Layout'
import ZoomableImage from '../components/common/ZoomableImage'

const ImageView = ({route}) => {
    const {colors} = useTheme()
    return (
        <Layout>
            <ZoomableImage
                source={{uri: route.params.url}}
                imageWidth={route.params.width}
                imageHeight={route.params.height}
                style={[s.image, {backgroundColor: colors.background}]}
            />
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
        height: '100%'
    }
})
