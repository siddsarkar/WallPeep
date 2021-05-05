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

const GalleryStack = createStackNavigator();

function GalleryStackScreen() {
  return (
    <GalleryStack.Navigator>
      <GalleryStack.Screen
        name="Collections"
        component={views.CollectionPage}
      />
    </GalleryStack.Navigator>
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
      <ProfileStack.Screen name="Profile" component={views.ProfilePage} />
    </ProfileStack.Navigator>
  );
}

// export default function WrapAppNavigator() {
//   const {rate, rateShown} = useSelector((state) => state.rate);
//   const {colors} = useTheme();
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: colors.primary,
//       }}>
//       {rateShown && (
//         <Text
//           style={{
//             alignSelf: 'center',
//             paddingVertical: 4,
//             color: colors.background,
//           }}>
//           {`${rate['x-ratelimit-remaining']}/${rate['x-ratelimit-limit']}`}
//         </Text>
//       )}
//       <AppNavigator />
//     </View>
//   );
// }
