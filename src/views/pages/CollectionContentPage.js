import {useScrollToTop, useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Card from '../components/common/Card';
import Layout from '../components/common/Layout';

export default function CollectionContentPage({navigation, route}) {
  const {colors} = useTheme();
  const [json, setJson] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const ref = useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    navigation.setOptions({title: route.params.collection.title});
    setIsLoading(true);
    fetch(
      `https://api.unsplash.com/collections/${route.params.collection.id}/photos?client_id=05Z6iFwVrlK6_i8d4TkaN4k2c27h1etfTRFUtRHk82c`,
    )
      .then((response) => response.json())
      .then((data) => setJson(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [route.params.collection.title, route.params.collection.id, navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetch(
      `https://api.unsplash.com/collections/${route.params.collection.id}/photos?client_id=05Z6iFwVrlK6_i8d4TkaN4k2c27h1etfTRFUtRHk82c`,
    )
      .then((response) => response.json())
      .then((data) => setJson(data))
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  }, [route.params.collection.id]);

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
        <ScrollView
          ref={ref}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={s.root}>
          {json.map((image) => (
            <View style={s.cardContainer} key={image.id}>
              <Card
                onAddToCollection={handleAddToCollection}
                onImageClick={handleImage}
                image={image}
              />
            </View>
          ))}
        </ScrollView>
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
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
});
