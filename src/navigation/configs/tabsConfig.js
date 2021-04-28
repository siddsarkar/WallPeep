import React from 'react'
import {StyleSheet, Text} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

/**
 * Customize Tabbar Appearance
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
        return focused && <Text style={[s.tabLabelStyle, {color}]}>{name}</Text>
    },
    options: {
        inactiveTintColor: 'gray',
        tabStyle: {
            paddingVertical: 4 // removes spacing between icon & label
        },
        style: {
            borderTopWidth: 0,
            paddingTop: 3,
            paddingBottom: 4,
            height: 58,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 20,
            shadowOffset: {width: 0, height: 0}
        }
    }
}

const s = StyleSheet.create({
    tabLabelStyle: {
        fontFamily: 'JosefinSans-Regular'
    }
})
