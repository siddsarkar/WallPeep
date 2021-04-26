/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDarkMode} from '../theme/ThemeContext';

export default function LoadingPage() {
  const {dark} = useDarkMode();
  const {colors} = useTheme();

  useEffect(() => {
    console.log('Loading', dark);
  }, [dark]);

  const backgroundStyle = {
    backgroundColor: colors.background,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        backgroundColor={colors.card}
        barStyle={dark ? 'light-content' : 'dark-content'}
      />

      <View style={s.loader}>
        <ActivityIndicator color={colors.text} size="large" />
        <Text
          style={[
            s.text,
            {
              color: colors.text,
            },
          ]}>
          {dark ? 'true' : 'false'}...
        </Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  text: {
    marginTop: 10,
    fontFamily: 'JosefinSans-Regular',
  },
});
