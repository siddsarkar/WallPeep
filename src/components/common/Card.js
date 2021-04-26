import {useTheme} from '@react-navigation/native'
import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Avatar from '../ui/Avatar'
import Icon from '../ui/Icon'

const Card = ({image}) => {
  const {colors} = useTheme()
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
            {/* {new Date(image.created_at).toDateString()} */}
            {image.likes + ' likes'}
          </Text>
        </View>
        <View style={s.iconContainer}>
          <Icon />
        </View>
      </View>
      <View>
        <Image source={{uri: image.urls.small}} style={s.image} />
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
        {/* <View style={s.downloadBtn}>
          <Text style={[s.downloadText, {color: 'gray'}]}>Download</Text>
          <MaterialCommunityIcons
            name="arrow-down"
            size={30}
            color={image.liked_by_user ? colors.primary : 'gray'}
          />
        </View> */}
      </View>
    </View>
  )
}

export default Card

const s = StyleSheet.create({
  grow: {
    flexGrow: 1
  },
  root: {
    width: '100%'
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
    height: 400,
    width: 400
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2
  },
  downloadText: {
    fontSize: 18,
    fontFamily: 'JosefinSans-Regular'
  },
  iconGroup: {
    flexDirection: 'row'
  },
  icon: {
    paddingRight: 6
  }
})
