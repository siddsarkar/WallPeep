import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {useTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {Text, View} from 'react-native'
import {useSelector} from 'react-redux'
import * as views from '../views/pages'
import CollectionsTab from '../views/pages/Profile/Tabs/CollectionsTab'
import tabsConfig, {tabBarOptions} from './configs/bottomTabsConfig'

/**
 * Wrapper(to display overlays) --> export default
 *   AppNavigator
 *      - TabNavigator
 *          - HomeStackNavigator
 *          - SearchStackNavigator
 *          - CollectionsStackNavigator
 *          - SettingsStackNavigator
 *          - more...
 *      - Misc Screen 1(Modals)
 *      - Misc Screen 2(Popups)
 *      - ...
 */

const AppStack = createStackNavigator()

function AppNavigator() {
    return (
        <AppStack.Navigator mode='modal'>
            {/**
             * Main Navigator
             */}
            <AppStack.Screen
                options={{headerShown: false}}
                name='Tab'
                component={TabNavigator}
            />

            {/**
             * Misc Screens (screens without tabbar)
             */}
            <AppStack.Screen
                options={{headerShown: false}}
                name='AddToCollection'
                component={views.AddToCollectionView}
            />
            <AppStack.Screen
                options={{headerShown: false}}
                name='Modal'
                component={views.ImageView}
            />
            <AppStack.Screen
                options={{headerShown: true}}
                name='Collection Content'
                component={views.CollectionContentPage}
            />
        </AppStack.Navigator>
    )
}

/**
 * CREATE MAIN NAVIGATION SYSTEM i.e TABS
 */

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
                ...tabBarOptions,
                activeTintColor: colors.primary,
                inactiveTintColor: colors.textSecondary
            }}>
            <Tab.Screen name='Home' component={HomeStackNavigator} />
            <Tab.Screen name='Search' component={SearchStackNavigator} />
            <Tab.Screen
                name='Collections'
                component={CollectionsTabNavigator}
            />
            <Tab.Screen name='Profile' component={ProfileStackNavigator} />
            <Tab.Screen name='Settings' component={SettingsStackNavigator} />
        </Tab.Navigator>
    )
}

/**
 * STACKS FOR EACH TAB
 */

const HomeStack = createStackNavigator()

function HomeStackNavigator() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                options={{
                    headerStyle: {
                        shadowColor: 'transparent'
                    }
                }}
                name='Browse'
                component={views.BrowsePage}
            />
        </HomeStack.Navigator>
    )
}

const SearchStack = createStackNavigator()

function SearchStackNavigator() {
    return (
        <SearchStack.Navigator headerMode='none'>
            <SearchStack.Screen name='Browse' component={views.SearchPage} />
        </SearchStack.Navigator>
    )
}

const CollectionTab = createMaterialTopTabNavigator()

function CollectionsTabNavigator() {
    const {colors} = useTheme()
    return (
        <CollectionTab.Navigator
            tabBarOptions={{
                indicatorStyle: {
                    position: 'relative',
                    height: '80%',
                    width: '90%',
                    borderRadius: 4,
                    backgroundColor: colors.cardHeader
                },
                activeTintColor: colors.text,
                inactiveTintColor: colors.textSecondary,
                showIcon: false,
                indicatorContainerStyle: {
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%'
                }
            }}>
            <CollectionTab.Screen
                name='Collections'
                options={{title: 'Public'}}
                component={views.CollectionPage}
            />
            <CollectionTab.Screen
                options={{title: 'Personal'}}
                name='Personal Collections'
                component={CollectionsTab}
            />
        </CollectionTab.Navigator>
    )
}

const SettingsStack = createStackNavigator()

function SettingsStackNavigator() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                options={{
                    headerStyle: {
                        shadowColor: 'transparent'
                    }
                }}
                name='Settings'
                component={views.SettingsPage}
            />
        </SettingsStack.Navigator>
    )
}

const ProfileStack = createStackNavigator()

function ProfileStackNavigator() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                options={{
                    headerStyle: {
                        shadowColor: 'transparent'
                    }
                }}
                name='Profile'
                component={views.ProfilePage}
            />
        </ProfileStack.Navigator>
    )
}

export default () => {
    const {rate, rateShown} = useSelector((state) => state.rate)
    const {colors} = useTheme()
    return (
        <>
            {rateShown && (
                <View
                    style={{
                        backgroundColor: colors.primary
                    }}>
                    <Text
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                            alignSelf: 'center',
                            paddingVertical: 4,
                            color: colors.background
                        }}>
                        {`${rate['x-ratelimit-remaining']}/${rate['x-ratelimit-limit']}`}
                    </Text>
                </View>
            )}
            <AppNavigator />
        </>
    )
}
