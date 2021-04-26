// const AuthStack = createStackNavigator();
// const AuthStack = createStackNavigator();
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {darkTheme, lightTheme} from '../theme/theme';
import BrowsePage from '../views/BrowsePage';
import LoadingPage from '../views/LoadingPage';
import SettingsPage from '../views/SettingsPage';
import {useDarkMode} from './../theme/ThemeContext';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Browse" component={BrowsePage} />
    </HomeStack.Navigator>
  );
}

const GalleryStack = createStackNavigator();
function GalleryStackScreen() {
  return (
    <GalleryStack.Navigator>
      <GalleryStack.Screen name="Latest" component={LoadingPage} />
    </GalleryStack.Navigator>
  );
}
const SettingsStack = createStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsPage} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const {dark} = useDarkMode();
  const {colors} = useTheme();
  return (
    <NavigationContainer theme={dark ? darkTheme : lightTheme}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabel: ({focused, color}) => {
            return focused ? (
              // eslint-disable-next-line react-native/no-inline-styles
              <Text style={{color, fontFamily: 'JosefinSans-Regular'}}>
                {route.name}
              </Text>
            ) : null;
          },
          tabBarIcon: ({focused, color, size}) => {
            let name;
            if (route.name === 'Home') {
              name = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Gallery') {
              name = focused ? 'view-grid-plus' : 'view-grid-plus-outline';
            } else if (route.name === 'Settings') {
              name = focused ? 'cog' : 'cog-outline';
            }
            return (
              <MaterialCommunityIcons name={name} size={size} color={color} />
            );
          },
        })}
        lazy={false}
        tabBarOptions={{
          activeTintColor: colors.primary,
          inactiveTintColor: 'gray',
          style: {
            borderTopWidth: 0,
            paddingTop: 3,
            paddingBottom: 4,
            height: 60,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 20,
            shadowOffset: {width: 0, height: 0},
          },
        }}
        initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Gallery" component={GalleryStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
