import {useTheme} from '@react-navigation/native'
import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomPopup from '../components/common/BottomPopup'
import Layout from '../components/common/Layout'
import ZoomableImage from '../components/common/ZoomableImage'

const ImageView = ({route}) => {
    const {colors} = useTheme()
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <Layout>
            <ZoomableImage
                source={{uri: route.params.url}}
                imageWidth={route.params.width}
                imageHeight={route.params.height}
                style={[s.image, {backgroundColor: colors.background}]}
            />
            <MaterialCommunityIcons
                style={s.expandIcon}
                name="crop-free"
                size={30}
                color={colors.text}
                onPress={() => setModalVisible(!modalVisible)}
            />
            <BottomPopup
                modalVisible={modalVisible}
                urls={{
                    regular: route.params.url
                }}
                toggleModal={() => setModalVisible(!modalVisible)}
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
    },
    expandIcon: {
        position: 'absolute',
        bottom: 12,
        right: 12
    }
})
