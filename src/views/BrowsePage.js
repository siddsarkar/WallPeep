/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import fetchPhotos from '../api/fetchEndpoint';
import Card from '../components/common/Card';

export default function BrowsePage({ref}) {
  const [mounted, setMounted] = useState(false);
  const {colors, dark} = useTheme();
  const [json, setJson] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPhotos().then(res => {
      setJson(res);
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    mounted &&
      fetchPhotos().then(res => {
        setJson(res);
        setIsLoading(false);
      });

    return () => {
      setMounted(false);
    };
  }, [mounted]);

  const backgroundStyle = {
    backgroundColor: colors.background,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        backgroundColor={colors.card}
        barStyle={dark ? 'light-content' : 'dark-content'}
      />

      {isLoading ? (
        <View style={s.loader}>
          <ActivityIndicator color={colors.text} size="large" />
          <Text
            style={[
              s.text,
              {
                color: colors.text,
              },
            ]}>
            Loading...
          </Text>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={s.root}>
          {json.map(image => (
            <View style={s.cardContainer} key={image.id}>
              <Card image={image} />
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  root: {
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontFamily: 'JosefinSans-Regular',
  },
  cardContainer: {
    marginBottom: 30,
  },
});
