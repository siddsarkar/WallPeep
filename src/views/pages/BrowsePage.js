/* eslint-disable no-unused-vars */
import {useScrollToTop, useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Card from '../components/common/Card';
import Layout from '../components/common/Layout';

export default function BrowsePage({navigation}) {
  const {colors} = useTheme();
  const [json, setJson] = useState([]);

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const ref = useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    fetch(
      'https://api.unsplash.com/photos?client_id=ESrWTdP2IRHxaRjjHlf5pnW0JxCmeqxGzhEZlzZmDAA&page=1&per_page=10',
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else return null;
      })
      .then((data) => setJson(data))
      .catch((error) => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetch(
      'https://api.unsplash.com/photos?client_id=ESrWTdP2IRHxaRjjHlf5pnW0JxCmeqxGzhEZlzZmDAA&page=1&per_page=10',
    )
      .then((response) => {
        console.log(response.headers.map['x-ratelimit-remaining']);
        if (response.headers.map['x-ratelimit-remaining'] === 0) {
          setHasError(true);
        } else return response.json();
      })
      .then((data) => setJson(data))
      .catch((error) => console.log(error))
      .finally(() => setRefreshing(false));
  }, []);

  const handleImage = (url, height, width) => {
    navigation.navigate({
      name: 'Modal',
      params: {url, height, width},
    });
  };
  const handleAddToCollection = (photo_id) => {
    navigation.navigate({
      name: 'AddToCollection',
      params: {photo_id},
    });
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
    setMoreLoading(true);
    const res = await fetch(
      `https://api.unsplash.com/photos?client_id=ESrWTdP2IRHxaRjjHlf5pnW0JxCmeqxGzhEZlzZmDAA&page=${
        page + 1
      }&per_page=10`,
    );

    if (res.headers.map['x-ratelimit-remaining'] === 0) {
      setHasError(true);
    } else {
      const data = await res.json();
      console.log(page + 1);
      console.log(res.headers.map['x-ratelimit-remaining']);
      setJson([...json, ...data]);
    }
    setMoreLoading(false);
  };

  return (
    <Layout>
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
        <FlatList
          ref={ref}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={json}
          keyExtractor={(img) => img.id}
          renderItem={({item}) => (
            <View style={s.cardContainer}>
              <Card
                onAddToCollection={handleAddToCollection}
                onImageClick={handleImage}
                image={item}
              />
            </View>
          )}
          ListEmptyComponent={() =>
            hasError && (
              <View style={s.loader}>
                <Image
                  style={{height: 250, width: 250}}
                  source={require('../../assets/images/rate-limit.png')}
                />
              </View>
            )
          }
          onEndReached={() => !moreLoading && handleLoadMore()}
          onEndReachedThreshold={0.1}
          scrollEnabled={!isLoading}
          initialNumToRender={10}
          ListFooterComponent={() => {
            if (!moreLoading) return null;

            return (
              <View style={s.footerLoader}>
                <ActivityIndicator color={colors.text} size="large" />
              </View>
            );
          }}
        />
      )}
    </Layout>
  );
}

const s = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  cardContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontFamily: 'JosefinSans-Regular',
  },
  footerLoader: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 12,
    alignItems: 'center',
  },
});
