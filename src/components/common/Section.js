import {useTheme} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, Text, useColorScheme, View} from 'react-native'

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark'

  const {colors} = useTheme()

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text
          }
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: colors.text
          }
        ]}>
        {children}
      </Text>
    </View>
  )
}

export default Section

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  }
})
