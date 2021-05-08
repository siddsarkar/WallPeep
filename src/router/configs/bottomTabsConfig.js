import React from 'react'
import {Text} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

/**
 * Customize Bottom TabBar Appearance
 */

export default {
    icon: ({focused, color, size, name}) => {
        let icon
        switch (name) {
            case 'Home':
                icon = focused ? 'home-variant' : 'home-variant-outline'
                break
            case 'Settings':
                icon = focused ? 'cog' : 'cog-outline'
                break
            case 'Collections':
                icon = focused ? 'view-grid-plus' : 'view-grid-plus-outline'
                break
            case 'Search':
                icon = focused ? 'image-search' : 'image-search-outline'
                break
            case 'Profile':
                icon = focused ? 'account-circle' : 'account-circle-outline'
                break
        }
        return <MaterialCommunityIcons name={icon} size={size} color={color} />
    },
    iconLabel: ({focused, color, name}) => {
        return (
            focused && (
                // eslint-disable-next-line react-native/no-inline-styles
                <Text style={{fontFamily: 'JosefinSans-Regular', color}}>
                    {name}
                </Text>
            )
        )
    }
}

export const tabBarOptions = {
    tabStyle: {
        paddingVertical: 2
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
}
