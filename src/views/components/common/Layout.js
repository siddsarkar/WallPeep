import {useTheme} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

export default ({children, style}) => {
  const {colors, dark} = useTheme();

  return (
    <SafeAreaView
      style={[s.root, {backgroundColor: colors.background, ...style}]}>
      <StatusBar
        backgroundColor={colors.card}
        barStyle={dark ? 'light-content' : 'dark-content'}
      />
      {children}
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  root: {
    flex: 1,
  },
});
