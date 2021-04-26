/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme
} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'

export default function LoginPage() {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>Loading...</Text>
      <ActivityIndicator />
    </SafeAreaView>
  )
}
