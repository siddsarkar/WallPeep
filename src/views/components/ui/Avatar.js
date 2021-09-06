import {useTheme} from '@react-navigation/native'
import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'

export default ({image, size = 40, name = ''}) => {
  const {colors} = useTheme()

  return (
    <View style={[s.root, {height: size, width: size, borderRadius: size / 2}]}>
      {image ? (
        <Image
          style={{height: size, width: size, borderRadius: size / 2}}
          source={{uri: image}}
        />
      ) : (
        <Text style={[s.text, {color: colors.text}]}>{name}</Text>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  root: {
    backgroundColor: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: '900',
  },
})
