import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import * as views from '../views/pages';
import CollectionsTab from '../views/pages/Profile/Tabs/CollectionsTab';
import tabsConfig from './configs/tabsConfig';

/**
 * CREATE ROOT NAVIGATOR FOR APP
 */

const AppStack = createStackNavigator();

function AppNavigator() {
  return (
    <AppStack.Navigator mode="modal">
      {/* Main Navigator */}
      <AppStack.Screen
        options={{headerShown: false}}
        name="Tab"
        component={TabNavigator}
      />

      {/* Common Screens for main Navigator */}
      <AppStack.Screen
        options={{headerShown: false}}
        name="AddToCollection"
        component={views.AddToCollectionView}
      />
      <AppStack.Screen
        options={{headerShown: false}}
        name="Modal"
        component={views.ImageView}
      />
      <AppStack.Screen
        options={{headerShown: true}}
        name="Collection Content"
        component={views.CollectionContentPage}
      />
    </AppStack.Navigator>
  );
}

/**
 * CREATE MAIN NAVIGATION SYSTEM i.e TABS
 */

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused, color}) => {
          const {name} = route;
          return tabsConfig.iconLabel({focused, color, name});
        },
        tabBarIcon: ({focused, color, size}) => {
          const {name} = route;
          return tabsConfig.icon({focused, color, size, name});
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.textSecondary,
        tabStyle: {
          paddingVertical: 2,
        },
        style: {
          borderTopWidth: 0,
          paddingTop: 3,
          paddingBottom: 4,
          height: 55,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 20,
          shadowOffset: {width: 0, height: 0},
        },
      }}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Search" component={SearchStackScreen} />
      <Tab.Screen name="Collections" component={GalleryStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

/**
 * STACKS FOR EACH TAB
 */

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          headerStyle: {
            shadowColor: 'transparent',
            // backgroundColor: '#ededf0',
          },
        }}
        name="Browse"
        component={views.BrowsePage}
      />
    </HomeStack.Navigator>
  );
}
const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator headerMode="none">
      <SearchStack.Screen name="Browse" component={views.SearchPage} />
    </SearchStack.Navigator>
  );
}

const CollectionTab = createMaterialTopTabNavigator();

function GalleryStackScreen() {
  const {colors} = useTheme();
  return (
    <CollectionTab.Navigator
      tabBarOptions={{
        indicatorStyle: {
          position: 'relative',
          height: '80%',
          width: '90%',
          borderRadius: 4,
          backgroundColor: colors.cardHeader,
        },
        activeTintColor: colors.text,
        inactiveTintColor: colors.textSecondary,
        showIcon: false,
        indicatorContainerStyle: {
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
        },
      }}>
      <CollectionTab.Screen
        name="Collections"
        options={{title: 'Public'}}
        component={views.CollectionPage}
      />
      <CollectionTab.Screen
        options={{title: 'Personal'}}
        name="Personal Collections"
        component={CollectionsTab}
      />
    </CollectionTab.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        options={{
          headerStyle: {
            shadowColor: 'transparent',
          },
        }}
        name="Settings"
        component={views.SettingsPage}
      />
    </SettingsStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        options={{
          headerStyle: {
            shadowColor: 'transparent',
          },
        }}
        name="Profile"
        component={views.ProfilePage}
      />
    </ProfileStack.Navigator>
  );
}

export default function WrapAppNavigator() {
  const {rate, rateShown} = useSelector((state) => state.rate);
  const {colors} = useTheme();
  return (
    <>
      {rateShown && (
        <View
          style={{
            backgroundColor: colors.primary,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              paddingVertical: 4,
              color: colors.background,
            }}>
            {`${rate['x-ratelimit-remaining']}/${rate['x-ratelimit-limit']}`}
          </Text>
        </View>
      )}
      <AppNavigator />
    </>
  );
}
