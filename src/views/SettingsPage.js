import {useTheme} from '@react-navigation/native'
import React, {useState} from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native'
import {useDarkMode} from '../theme/ThemeContext'

export default function SettingsPage() {
  const {dark, toggleDark} = useDarkMode()
  const {colors} = useTheme()

  const [isEnabled, setIsEnabled] = useState(dark)

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled)
    toggleDark(!dark)
  }

  const backgroundStyle = {
    backgroundColor: colors.background
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        backgroundColor={colors.card}
        barStyle={dark ? 'light-content' : 'dark-content'}
      />

      <ScrollView contentContainerStyle={s.root}>
        <View
          style={[
            s.groupContainer,
            {
              backgroundColor: colors.card
            }
          ]}>
          <Text
            style={[
              s.groupTitle,
              {
                color: colors.primary
              }
            ]}>
            Interface
          </Text>
          <View style={s.groupItem}>
            <View style={s.textContainer}>
              <Text
                style={[
                  s.textPrimary,
                  {
                    color: colors.text
                  }
                ]}>
                Dark Theme
              </Text>
              <Text style={s.textSeecondary}>{dark ? 'on' : 'off'}</Text>
            </View>
            <View style={s.grow} />
            <View style={s.root}>
              <Switch
                trackColor={{false: '#767577', true: colors.primary}}
                thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  grow: {
    flexGrow: 1
  },
  root: {
    justifyContent: 'center'
    // alignItems: 'center',
  },
  groupContainer: {
    padding: 12
  },
  groupTitle: {
    fontSize: 14,
    textTransform: 'uppercase'
    // fontFamily: 'JosefinSans-Regular',
  },
  groupItem: {
    flexDirection: 'row',
    paddingVertical: 12
  },
  groupItemTitle: {
    fontSize: 16
  },
  textContainer: {
    flexGrow: 1
  },
  textPrimary: {
    fontSize: 18,
    fontFamily: 'JosefinSans-Regular'
  },
  textSeecondary: {
    color: 'gray'
  }
})
