import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import * as views from '../views'
import tabsConfig from './configs/tabsConfig'

const AppStack = createStackNavigator()
export default function AppNavigator() {
    return (
        <AppStack.Navigator
            headerMode="none"
            mode="modal"
            initialRouteName="Tab">
            <AppStack.Screen
                name="AddToCollection"
                component={views.AddToCollectionView}
            />
            <AppStack.Screen name="Modal" component={views.ImageView} />
            <AppStack.Screen name="Tab" component={TabNavigator} />
        </AppStack.Navigator>
    )
}

const Tab = createBottomTabNavigator()
function TabNavigator() {
    const {colors} = useTheme()
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarLabel: ({focused, color}) => {
                    const {name} = route
                    return tabsConfig.iconLabel({focused, color, name})
                },
                tabBarIcon: ({focused, color, size}) => {
                    const {name} = route
                    return tabsConfig.icon({focused, color, size, name})
                }
            })}
            tabBarOptions={{
                activeTintColor: colors.primary,

                inactiveTintColor: 'gray',
                tabStyle: {
                    paddingVertical: 2 // removes spacing between icon & label
                },
                style: {
                    borderTopWidth: 0,
                    paddingTop: 3,
                    paddingBottom: 4,
                    height: 55,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 20,
                    shadowOffset: {width: 0, height: 0}
                }
            }}
            initialRouteName="Home">
            <Tab.Screen name="Home" component={views.BrowsePage} />
            <Tab.Screen name="Search" component={SearchStackScreen} />
            <Tab.Screen name="Collections" component={GalleryStackScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
            <Tab.Screen name="Settings" component={SettingsStackScreen} />
        </Tab.Navigator>
    )
}

// Stacks For Each Tab
const SearchStack = createStackNavigator()
function SearchStackScreen() {
    return (
        <SearchStack.Navigator headerMode="none">
            <SearchStack.Screen name="Browse" component={views.SearchPage} />
        </SearchStack.Navigator>
    )
}

// const HomeStack = createStackNavigator()
// function HomeStackScreen() {
//     return (
//         <HomeStack.Navigator>
//             <HomeStack.Screen name="Browse" component={views.BrowsePage} />
//         </HomeStack.Navigator>
//     )
// }

const GalleryStack = createStackNavigator()
function GalleryStackScreen() {
    return (
        <GalleryStack.Navigator>
            <GalleryStack.Screen
                name="Collections"
                component={views.CollectionPage}
            />
        </GalleryStack.Navigator>
    )
}
const SettingsStack = createStackNavigator()
function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="Settings"
                component={views.SettingsPage}
            />
        </SettingsStack.Navigator>
    )
}
const ProfileStack = createStackNavigator()
function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={views.LoadingPage} />
        </ProfileStack.Navigator>
    )
}
