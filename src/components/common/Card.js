import {useTheme} from '@react-navigation/native'
import React, {useState} from 'react'
import {
    ActivityIndicator,
    Image,
    Linking,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {useDispatch} from 'react-redux'
import {togglePhotoLike} from '../../redux/actions/imageActions'
import Avatar from '../ui/Avatar'
import Icon from '../ui/Icon'
import BottomPopup from './BottomPopup'

export default ({image, onImageClick, onAddToCollection}) => {
    const {colors} = useTheme()
    const [likeLoading, setLikeLoading] = useState(false)
    const [isLiked, setIsLiked] = useState(image.liked_by_user)
    const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch()

    const openURL = async () => {
        let url = image.links.html
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url)

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url)
        } else {
            // Alert.alert(`Don't know how to open this URL: ${url}`)
            return
        }
    }

    const handleLikeChange = () => {
        setLikeLoading(true)

        dispatch(
            togglePhotoLike(
                {
                    ...image,
                    liked_by_user: isLiked
                },
                photo => {
                    setLikeLoading(false)
                    console.log(photo.liked_by_user)
                    setIsLiked(photo.liked_by_user)
                }
            )
        )
    }
    const handleAddToCollection = () => {
        onAddToCollection(image.id)
    }

    return (
        <View
            style={[
                s.root,
                {
                    backgroundColor: colors.cardheader,
                    color: colors.text
                }
            ]}>
            <View
                style={[
                    s.header,
                    {
                        backgroundColor: colors.cardheader
                    }
                ]}>
                <View style={s.iconContainer}>
                    <Avatar image={image.user.profile_image.medium} />
                </View>
                <View style={s.textContainer}>
                    <Text
                        style={[
                            s.textPrimary,
                            {
                                color: colors.text
                            }
                        ]}>
                        {image.user.name}
                    </Text>
                    <Text style={s.textSeecondary}>
                        {(isLiked ? image.likes + 1 : image.likes) + ' likes'}
                    </Text>
                </View>
                <View style={s.iconContainer}>
                    <Icon />
                </View>
            </View>
            <Pressable
                onPress={() =>
                    onImageClick(image.urls.regular, image.height, image.width)
                }
                style={s.imageContainer}>
                <Image
                    source={{uri: image.urls.small}}
                    style={[s.image, {aspectRatio: image.width / image.height}]}
                />

                <MaterialCommunityIcons
                    style={s.expandIcon}
                    name="crop-free"
                    size={30}
                    color={colors.card}
                    onPress={() => setModalVisible(!modalVisible)}
                />
            </Pressable>
            <View style={s.header}>
                <View style={s.iconGroup}>
                    {likeLoading ? (
                        <ActivityIndicator
                            size="small"
                            style={s.icon}
                            color="grey"
                        />
                    ) : (
                        <MaterialCommunityIcons
                            style={s.icon}
                            name="heart"
                            size={30}
                            onPress={handleLikeChange}
                            color={isLiked ? colors.primary : 'gray'}
                        />
                    )}
                    <MaterialCommunityIcons
                        onPress={handleAddToCollection}
                        style={s.icon}
                        name="view-grid-plus"
                        size={30}
                        color={
                            image.current_user_collections.length > 0
                                ? colors.primary
                                : 'gray'
                        }
                    />
                </View>

                <View style={s.grow} />
                <MaterialIcons
                    onPress={openURL}
                    name="open-in-browser"
                    size={30}
                    color="gray"
                />
            </View>
            <BottomPopup
                modalVisible={modalVisible}
                urls={image.urls}
                toggleModal={() => setModalVisible(!modalVisible)}
            />
        </View>
    )
}

const s = StyleSheet.create({
    grow: {
        flexGrow: 1
    },
    root: {
        marginBottom: 12,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: {width: 0, height: 0}
    },
    header: {
        flexDirection: 'row',
        padding: 8
    },
    textContainer: {
        paddingHorizontal: 8,
        flexGrow: 1
    },
    textPrimary: {
        fontSize: 18,
        fontFamily: 'JosefinSans-Regular'
    },
    textSeecondary: {
        color: 'gray'
    },
    imageContainer: {
        position: 'relative'
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        // height: 400,
        width: '100%'
    },
    iconGroup: {
        flexDirection: 'row'
    },
    icon: {
        paddingRight: 6,
        width: 40
    },
    expandIcon: {
        position: 'absolute',
        bottom: 12,
        right: 12
    }
})
