import {useTheme} from '@react-navigation/native'
import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'

export default ({image}) => {
  const {colors} = useTheme()

  return (
    <View style={s.root}>
      {image ? (
        <Image source={{uri: image}} style={s.root} />
      ) : (
        <Text style={[s.text, {color: colors.text}]}>JD</Text>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  root: {
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: '900'
  }
})
