import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserCollections} from '../../redux/actions/collectionAction';
import CollectionCard from '../components/common/CollectionCard';
import Layout from '../components/common/Layout';

export default function AddToCollectionView({navigation, route}) {
  const {current_user_collections, photo_id} = route.params;
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const {userCollections} = useSelector((state) => state.collections);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchUserCollections()).then(() => setRefreshing(false));
  }, [dispatch]);

  useEffect(() => {
    // console.log(route.params);
    dispatch(fetchUserCollections()).then(() => setIsLoading(false));
  }, [dispatch]);

  // const handlePress = (id, selected) => {

  //   if (selected) {
  //     dispatch()
  //   }

  // }

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
            Loading your Collections...
          </Text>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={s.root}>
          {/* <Text style={{color: colors.text}}>In Collections</Text> */}
          {/* {current_user_collections.map((collection) => (
            <CollectionCard
              photoId={photo_id}
              // onPress={handlePress}
              component={() => (
                <MaterialCommunityIcons name="delete" size={30} color="#fff" />
              )}
              selected={true}
              collection={collection}
              colors={colors}
              key={collection.id}
            />
          ))} */}
          <View style={s.cardContainer}>
            <View style={s.coverImage} />
            <View
              style={[
                s.tint,
                {
                  backgroundColor: colors.cardHeader,
                },
              ]}
            />
            <Text style={[s.title, {color: colors.textSecondary}]}>
              Create New Collection
            </Text>
          </View>
          {/* <Text style={{color: colors.text}}>All Collections</Text> */}
          {userCollections.map((collection) => (
            <CollectionCard
              photoId={photo_id}
              component={() => (
                <MaterialCommunityIcons name="delete" size={30} color="#fff" />
              )}
              selected={current_user_collections.find(
                (c) => c.id === collection.id,
              )}
              collection={collection}
              colors={colors}
              key={collection.id}
            />
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
    paddingVertical: 12,
    alignItems: 'center',
    // height: '100%'
  },
  text: {
    marginTop: 10,
    fontFamily: 'JosefinSans-Regular',
  },
  cardContainer: {
    height: 100,
    width: '95%',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 6,
  },
  coverImage: {
    height: 150,
    paddingBottom: 20,
    width: '100%',
    resizeMode: 'cover',
    // opacity: 0.3
  },
  title: {
    position: 'absolute',
    fontFamily: 'JosefinSans-Regular',
    backgroundColor: 'transparent',
    fontSize: 24,
    fontWeight: '800',
    bottom: 24,
    left: 24,
  },
  subTitle: {
    position: 'absolute',
    fontFamily: 'JosefinSans-Regular',
    backgroundColor: 'transparent',
    fontSize: 16,
    fontWeight: '800',
    top: 24,
    left: 24,
  },
  tint: {
    position: 'absolute',

    height: '100%',
    width: '100%',
    opacity: 0.5,
  },
});
