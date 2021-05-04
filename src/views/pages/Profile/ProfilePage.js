/* eslint-disable react-native/no-inline-styles */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
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
import {fetchUserCollections} from '../../../redux/actions/collectionAction';
import {fetchUser} from '../../../redux/actions/userActions';
import CollectionCard from '../../components/common/CollectionCard';
import Layout from '../../components/common/Layout';
import ProfileTabBar from '../../components/common/ProfileTabBar';
import Avatar from '../../components/ui/Avatar';

function CollectionsTab({navigation}) {
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
    dispatch(fetchUserCollections()).then(() => setIsLoading(false));
  }, [dispatch]);

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
function PhotosTab() {
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

const Tab = createMaterialTopTabNavigator();

function TopTabNavigator() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      // eslint-disable-next-line react/jsx-props-no-spreading
      tabBar={(props) => <ProfileTabBar colors={colors} {...props} />}>
      <Tab.Screen
        options={{tabBarIcon: 'view-grid'}}
        name="Collections"
        component={CollectionsTab}
      />
      <Tab.Screen
        options={{tabBarIcon: 'image-multiple'}}
        name="Photos"
        component={PhotosTab}
      />
    </Tab.Navigator>
  );
}

export default function ProfilePage() {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const user = useSelector((state) => state.user.info);

  const [isloading, setIsloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    dispatch(fetchUser()).then(() => setRefreshing(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUser()).then(() => setIsloading(false));
  }, [dispatch]);

  return (
    <Layout>
      {!isloading ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Header colors={colors} user={user} />
          <TopTabNavigator />
        </ScrollView>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      )}
    </Layout>
  );
}

function Header({colors, user}) {
  return (
    <View style={[s.headerWrapper, {backgroundColor: colors.card}]}>
      <Avatar image={user.profile_image.large} size={110} name="JD" />

      <Text
        style={[
          s.text,
          {
            color: colors.text,
          },
        ]}>
        {user.name}
      </Text>
      <View style={s.iconText}>
        <MaterialCommunityIcons
          style={s.metaIcons}
          color={colors.textSecondary}
          name="map-marker"
          size={18}
        />
        <Text
          style={[
            s.subText,
            {
              color: colors.textSecondary,
            },
          ]}>
          {user.location}
        </Text>
      </View>
      <View style={s.iconText}>
        <MaterialCommunityIcons
          style={s.metaIcons}
          color={colors.textSecondary}
          name="link-variant"
          size={18}
        />
        <Text
          style={[
            s.subText,
            {
              color: colors.textSecondary,
            },
          ]}>
          {user.portfolio_url}
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    padding: 8,
    // backgroundColor: 'green'
  },
  root: {
    height: '100%',
    // backgroundColor: 'green'
  },
  text: {
    fontFamily: 'JosefinSans-Regular',
    marginTop: 12,
    fontSize: 28,
  },
  subText: {
    marginTop: 4,
    fontSize: 16,
  },
  headerWrapper: {
    // height: 200,
    padding: 12,
  },
  metaIcons: {
    paddingRight: 6,
  },
  tab: {
    justifyContent: 'center',
    padding: 6,
  },
  tabsText: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
});
