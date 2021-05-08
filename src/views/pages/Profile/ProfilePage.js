/* eslint-disable react-native/no-inline-styles */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {useTheme} from '@react-navigation/native'
import React, {useCallback, useEffect, useState} from 'react'
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUser} from '../../../redux/actions/userActions'
import Layout from '../../components/common/Layout'
import Avatar from '../../components/ui/Avatar'
import CollectionsTab from './Tabs/CollectionsTab'
import PhotosTab from './Tabs/PhotosTab'

const Tab = createMaterialTopTabNavigator()

function TopTabNavigator() {
    const {colors} = useTheme()
    return (
        <Tab.Navigator
            // tabBar={(props) => <ProfileTabBar colors={colors} {...props} />}
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
            <Tab.Screen
                options={{tabBarIcon: 'view-grid'}}
                name='Collections'
                component={CollectionsTab}
            />
            <Tab.Screen
                options={{tabBarIcon: 'image-multiple'}}
                name='Photos'
                component={PhotosTab}
            />
        </Tab.Navigator>
    )
}

export default function ProfilePage() {
    const dispatch = useDispatch()
    const {colors} = useTheme()
    const user = useSelector((state) => state.user.info)

    const [isloading, setIsloading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        dispatch(fetchUser()).then(() => setRefreshing(false))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchUser()).then(() => setIsloading(false))
    }, [dispatch])

    return (
        <Layout>
            {!isloading ? (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                    <Header colors={colors} user={user} />
                    <TopTabNavigator />
                </ScrollView>
            ) : (
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}>
                    <ActivityIndicator size='large' color={colors.text} />
                </View>
            )}
        </Layout>
    )
}

function Header({colors, user}) {
    return (
        <View style={[s.headerWrapper, {backgroundColor: colors.card}]}>
            <Avatar image={user.profile_image.large} size={110} name='JD' />

            <Text
                style={[
                    s.text,
                    {
                        color: colors.text
                    }
                ]}>
                {user.name}
            </Text>
            <View style={s.iconText}>
                <MaterialCommunityIcons
                    style={s.metaIcons}
                    color={colors.textSecondary}
                    name='map-marker'
                    size={18}
                />
                <Text
                    style={[
                        s.subText,
                        {
                            color: colors.textSecondary
                        }
                    ]}>
                    {user.location}
                </Text>
            </View>
            <View style={s.iconText}>
                <MaterialCommunityIcons
                    style={s.metaIcons}
                    color={colors.textSecondary}
                    name='link-variant'
                    size={18}
                />
                <Text
                    style={[
                        s.subText,
                        {
                            color: colors.textSecondary
                        }
                    ]}>
                    {user.portfolio_url}
                </Text>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    iconText: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    tabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        padding: 8
        // backgroundColor: 'green'
    },
    root: {
        height: '100%'
        // backgroundColor: 'green'
    },
    text: {
        fontFamily: 'JosefinSans-Regular',
        marginTop: 12,
        fontSize: 28
    },
    subText: {
        marginTop: 4,
        fontSize: 16
    },
    headerWrapper: {
        // height: 200,
        padding: 12
    },
    metaIcons: {
        paddingRight: 6
    },
    tab: {
        justifyContent: 'center',
        padding: 6
    },
    tabsText: {
        fontSize: 18
    },
    container: {
        flex: 1,
        backgroundColor: 'pink'
    }
})
