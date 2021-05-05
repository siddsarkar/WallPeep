import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';

export default function PhotosTab() {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        height: 500,
        backgroundColor: colors.background,
      }}
    />
  );
}
