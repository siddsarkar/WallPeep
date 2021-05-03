/* eslint-disable react-native/no-inline-styles */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import {fetchUser} from '../../../redux/actions/userActions';
import Layout from '../../components/common/Layout';
import ProfileTabBar from '../../components/common/ProfileTabBar';
import Avatar from '../../components/ui/Avatar';

function sc() {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}>
      <Text>jjj</Text>
    </View>
  );
}
function scx() {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        backgroundColor: 'blue',
      }}
    />
  );
}

const Tab = createBottomTabNavigator();
function TopTabNavigator() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      tabBar={(props) => <ProfileTabBar colors={colors} {...props} />}>
      <Tab.Screen
        options={{tabBarIcon: 'image-multiple'}}
        name="Photos"
        component={sc}
      />
      <Tab.Screen
        options={{tabBarIcon: 'view-grid'}}
        name="Collections"
        component={scx}
      />
    </Tab.Navigator>
  );
}

export default function ProfilePage() {
  const {colors} = useTheme();
  const user = useSelector((state) => state.user.info);

  const [isloading, setIsloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    dispatch(fetchUser(() => setRefreshing(false)));
  }, [dispatch]);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(() => setIsloading(false)));
  }, [dispatch]);

  return (
    <Layout>
      {!isloading ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
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
                color={colors.placeholder}
                name="map-marker"
                size={18}
              />
              <Text
                style={[
                  s.subText,
                  {
                    color: colors.placeholder,
                  },
                ]}>
                {user.location}
              </Text>
            </View>
            <View style={s.iconText}>
              <MaterialCommunityIcons
                style={s.metaIcons}
                color={colors.placeholder}
                name="link-variant"
                size={18}
              />
              <Text
                style={[
                  s.subText,
                  {
                    color: colors.placeholder,
                  },
                ]}>
                {user.portfolio_url}
              </Text>
            </View>
          </View>
          <View
            style={{
              // flexGrow: 1,
              position: 'relative',
              width: '100%',
              minHeight: 500,
              paddingTop: 50,
            }}>
            <TopTabNavigator />
          </View>
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
