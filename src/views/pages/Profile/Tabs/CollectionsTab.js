/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserCollections} from '../../../../redux/actions/collectionAction';
import CollectionCard from '../../../components/common/CollectionCard';
import Layout from '../../../components/common/Layout';

export default function CollectionsTab({navigation}) {
  const {colors} = useTheme();
  const {userCollections} = useSelector((state) => state.collections);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchUserCollections()).then(() => setRefreshing(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserCollections()).then(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <Layout>
      {isLoading ? (
        <View style={{flex: 1, paddingTop: 150, alignItems: 'center'}}>
          <ActivityIndicator color={colors.text} size="large" />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{paddingTop: 12, alignItems: 'center'}}>
          {userCollections.map((collection) => (
            <CollectionCard
              collection={collection}
              colors={colors}
              onPress={() =>
                navigation.navigate({
                  name: 'Collection Content',
                  params: {collection},
                })
              }
              key={collection.id}
            />
          ))}
        </ScrollView>
      )}
    </Layout>
  );
}
