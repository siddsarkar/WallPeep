import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, Text} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BrowsePage from '../views/BrowsePage'
import LoadingPage from '../views/LoadingPage'
import SearchPage from '../views/SearchPage'
import SettingsPage from '../views/SettingsPage'

const Tab = createBottomTabNavigator()
export default function AppNavigator() {
    const {colors} = useTheme()
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarLabel: ({focused, color}) =>
                    focused ? (
                        <Text style={[s.tabLabelStyle, color]}>
                            {route.name}
                        </Text>
                    ) : null,
                tabBarIcon: ({focused, color, size}) => {
                    let name
                    if (route.name === 'Home') {
                        name = focused ? 'home' : 'home-outline'
                    } else if (route.name === 'Gallery') {
                        name = focused
                            ? 'view-grid-plus'
                            : 'view-grid-plus-outline'
                    } else if (route.name === 'Settings') {
                        name = focused ? 'cog' : 'cog-outline'
                    } else if (route.name === 'Search') {
                        name = focused ? 'image-search' : 'image-search-outline'
                    }
                    return (
                        <MaterialCommunityIcons
                            name={name}
                            size={size}
                            color={color}
                        />
                    )
                }
            })}
            tabBarOptions={{
                activeTintColor: colors.primary,
                inactiveTintColor: 'gray',
                tabStyle: {
                    paddingVertical: 5 // removes spacing between icon & label
                },
                style: {
                    borderTopWidth: 0,
                    paddingTop: 3,
                    paddingBottom: 4,
                    height: 60,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 20,
                    shadowOffset: {width: 0, height: 0}
                }
            }}>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Search" component={SearchStackScreen} />
            <Tab.Screen name="Gallery" component={GalleryStackScreen} />
            <Tab.Screen name="Settings" component={SettingsStackScreen} />
        </Tab.Navigator>
    )
}

const s = StyleSheet.create({
    tabLabelStyle: {
        fontFamily: 'JosefinSans-Regular'
    }
})

// Stacks For Each Tab
const SearchStack = createStackNavigator()
function SearchStackScreen() {
    return (
        <SearchStack.Navigator headerMode="none">
            <HomeStack.Screen name="Browse" component={SearchPage} />
        </SearchStack.Navigator>
    )
}
const HomeStack = createStackNavigator()
function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Browse" component={BrowsePage} />
        </HomeStack.Navigator>
    )
}

const GalleryStack = createStackNavigator()
function GalleryStackScreen() {
    return (
        <GalleryStack.Navigator>
            <GalleryStack.Screen name="Latest" component={LoadingPage} />
        </GalleryStack.Navigator>
    )
}
const SettingsStack = createStackNavigator()
function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={SettingsPage} />
        </SettingsStack.Navigator>
    )
}
