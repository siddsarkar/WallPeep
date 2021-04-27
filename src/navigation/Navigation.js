import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer, useTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React, {useState} from 'react'
import {Text} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {darkTheme, lightTheme} from '../theme/theme'
import BrowsePage from '../views/BrowsePage'
import LoadingPage from '../views/LoadingPage'
import LoginPage from '../views/LoginPage'
import SearchPage from '../views/SearchPage'
import SettingsPage from '../views/SettingsPage'
import {useDarkMode} from './../theme/ThemeContext'

const SearchStack = createStackNavigator()
function SearchStackScreen() {
    const {colors} = useTheme()
    return (
        <SearchStack.Navigator headerMode="none">
            <HomeStack.Screen name="Browse" component={SearchPage} />
        </SearchStack.Navigator>
    )
}
const HomeStack = createStackNavigator()
function HomeStackScreen() {
    const {colors} = useTheme()
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

const Tab = createBottomTabNavigator()
function AppStack() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarLabel: ({focused, color}) => {
                    return focused ? (
                        <Text
                            style={{
                                color,
                                fontFamily: 'JosefinSans-Regular'
                            }}>
                            {route.name}
                        </Text>
                    ) : null
                },
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
                    paddingVertical: 5
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
            }}
            initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Search" component={SearchStackScreen} />
            <Tab.Screen name="Gallery" component={GalleryStackScreen} />
            <Tab.Screen name="Settings" component={SettingsStackScreen} />
        </Tab.Navigator>
    )
}

const Stack = createStackNavigator()
function AuthStack(params) {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={LoginPage} />
        </Stack.Navigator>
    )
}

export default function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const {dark} = useDarkMode()
    const {colors} = useTheme()
    return (
        <NavigationContainer theme={dark ? darkTheme : lightTheme}>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}
