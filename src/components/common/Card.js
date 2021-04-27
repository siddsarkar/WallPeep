import {useTheme} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Avatar from '../ui/Avatar'
import Icon from '../ui/Icon'

export default ({image}) => {
    const [height, setHeight] = useState(400)
    const {colors} = useTheme()

    useEffect(() => {
        Image.getSize(image.urls.small, (w, h) => setHeight(h))
    }, [])

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
                        {image.likes + ' likes'}
                    </Text>
                </View>
                <View style={s.iconContainer}>
                    <Icon />
                </View>
            </View>
            <View style={{position: 'relative'}}>
                <Image
                    source={{uri: image.urls.small}}
                    style={[s.image, {height}]}
                />

                <MaterialCommunityIcons
                    style={s.expandIcon}
                    name="crop-free"
                    size={30}
                    color={colors.card}
                />
            </View>
            <View style={s.header}>
                <View style={s.iconGroup}>
                    <MaterialCommunityIcons
                        style={s.icon}
                        name="heart"
                        size={30}
                        color={!image.liked_by_user ? colors.primary : 'gray'}
                    />
                    <MaterialCommunityIcons
                        style={s.icon}
                        name="view-grid-plus"
                        size={30}
                        color={image.liked_by_user ? colors.primary : 'gray'}
                    />
                </View>

                <View style={s.grow} />
                <MaterialCommunityIcons
                    name="share"
                    size={30}
                    color={image.liked_by_user ? colors.primary : 'gray'}
                />
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    grow: {
        flexGrow: 1
    },
    root: {
        marginVertical: 6,
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
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        // height: 400,
        width: 400
    },
    iconGroup: {
        flexDirection: 'row'
    },
    icon: {
        paddingRight: 6
    },
    expandIcon: {
        position: 'absolute',
        bottom: 12,
        right: 12
    }
})
