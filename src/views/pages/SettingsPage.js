import {Picker} from '@react-native-picker/picker'
import {useTheme} from '@react-navigation/native'
import React, {useState} from 'react'
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {logoutUser, toggleRateVisibility} from '../../redux/actions/userActions'
import useDarkMode from '../../theme/useDarkMode'
import AsyncStore from '../../utils/asyncStore'
import Layout from '../components/common/Layout'

export default function SettingsPage() {
  const {scheme, toggleScheme} = useDarkMode()
  const {rate, rateShown} = useSelector(state => state.rate)
  // const [isEnabled, setIsEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(scheme)
  const {colors} = useTheme()
  const dispatch = useDispatch()

  const toggleSwitch = params => {
    dispatch(toggleRateVisibility())
  }

  const themes = [
    {label: 'Light', value: 'light'},
    {label: 'Dark', value: 'dark'},
    {label: 'Nord', value: 'nord'},
    {label: 'Nightly', value: 'nightly'},
  ]

  const handleSwitchScheme = (itemValue, itemIndex) => {
    setSelectedLanguage(itemValue)
    toggleScheme(itemValue)
    AsyncStore.setItem('theme', itemValue)
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <Layout>
      <ScrollView contentContainerStyle={s.root}>
        <View
          style={[
            s.groupContainer,
            {
              backgroundColor: colors.card,
            },
          ]}>
          <Text
            style={[
              s.groupTitle,
              {
                color: colors.primary,
              },
            ]}>
            User
          </Text>
          <View style={s.groupItem}>
            <View style={s.textContainer}>
              <Text
                style={[
                  s.textPrimary,
                  {
                    color: colors.text,
                  },
                ]}>
                Rate Limit
              </Text>
              <Text style={{color: colors.textSecondary}}>
                {rate['x-ratelimit-remaining'] === '0' ? 'exceeded' : 'normal'}
              </Text>
            </View>
            <View style={s.grow} />
            <View style={s.root}>
              <Text style={{color: colors.textSecondary}}>
                {`${rate['x-ratelimit-remaining']}/${rate['x-ratelimit-limit']}`}
              </Text>
            </View>
          </View>
          <View style={s.groupItem}>
            <View style={s.textContainer}>
              <Text
                style={[
                  s.textPrimary,
                  {
                    color: colors.text,
                  },
                ]}>
                Show rate at top
              </Text>
              <Text style={{color: colors.textSecondary}}>
                shows rate limit
              </Text>
            </View>
            <View style={s.grow} />
            <View style={s.root}>
              <Switch
                trackColor={{
                  false: '#767577',
                  true: colors.textSecondary,
                }}
                thumbColor={rateShown ? colors.primary : '#f4f3f4'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleSwitch}
                value={rateShown}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout} style={s.groupItem}>
            <View style={s.textContainer}>
              <Text
                style={[
                  s.textPrimary,
                  {
                    color: colors.text,
                  },
                ]}>
                Logout
              </Text>
              <Text style={{color: colors.textSecondary}}>
                logout current user
              </Text>
            </View>
            <View style={s.grow} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            s.groupContainer,
            {
              backgroundColor: colors.card,
              paddingHorizontal: 0,
            },
          ]}>
          <Text
            style={[
              s.groupTitle,
              {
                color: colors.primary,
                paddingHorizontal: 15,
              },
            ]}>
            Color Scheme
          </Text>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={handleSwitchScheme}>
            {themes.map((theme, idx) => (
              <Picker.Item
                key={idx.toString()}
                color={colors.text}
                fontFamily='JosefinSans-Regular'
                style={{color: colors.text}}
                label={theme.label}
                value={theme.value}
              />
            ))}
          </Picker>
        </View>
      </ScrollView>
    </Layout>
  )
}

const s = StyleSheet.create({
  grow: {
    flexGrow: 1,
  },
  root: {
    justifyContent: 'center',
  },
  groupContainer: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  groupTitle: {
    fontSize: 14,
    textTransform: 'uppercase',
  },
  groupItem: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  groupItemTitle: {
    fontSize: 16,
  },
  textContainer: {
    flexGrow: 1,
  },
  textPrimary: {
    fontSize: 18,
    fontFamily: 'JosefinSans-Regular',
  },
})
