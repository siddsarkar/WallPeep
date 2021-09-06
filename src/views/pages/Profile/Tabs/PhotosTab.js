import {useTheme} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, View} from 'react-native'

export default function PhotosTab() {
  const {colors} = useTheme()
  return <View style={[s.tab, {backgroundColor: colors.background}]} />
}

const s = StyleSheet.create({
  tab: {
    flex: 1,
    height: 500,
  },
})
