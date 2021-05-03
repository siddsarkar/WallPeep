import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import * as views from '../views/pages';
import tabsConfig from './configs/tabsConfig';

/**
 * CREATE ROOT NAVIGATOR FOR APP
 */

const AppStack = createStackNavigator();

export default function AppNavigator() {
  return (
    <AppStack.Navigator headerMode="none" mode="modal">
      {/* Main Navigator */}
      <AppStack.Screen name="Tab" component={TabNavigator} />

      {/* Common Screens for main Navigator */}
      <AppStack.Screen
        name="AddToCollection"
        component={views.AddToCollectionView}
      />
      <AppStack.Screen name="Modal" component={views.ImageView} />
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
        inactiveTintColor: 'gray',
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
      <Tab.Screen name="Home" component={views.BrowsePage} />
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

const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator headerMode="none">
      <SearchStack.Screen name="Browse" component={views.SearchPage} />
    </SearchStack.Navigator>
  );
}

const GalleryStack = createStackNavigator();

function GalleryStackScreen() {
  return (
    <GalleryStack.Navigator mode="modal">
      <GalleryStack.Screen
        name="Collections"
        component={views.CollectionPage}
      />
      <GalleryStack.Screen
        name="Collection Content"
        component={views.CollectionContentPage}
      />
    </GalleryStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={views.SettingsPage} />
    </SettingsStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={views.ProfilePage} />
    </ProfileStack.Navigator>
  );
}
