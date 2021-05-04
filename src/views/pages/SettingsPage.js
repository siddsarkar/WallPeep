import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../redux/actions/userActions';
import useDarkMode from '../../theme/useDarkMode';
import AsyncStore from '../../utils/asyncStore';
import Layout from '../components/common/Layout';

export default function SettingsPage() {
  const {dark, toggleDark} = useDarkMode();
  const [isEnabled, setIsEnabled] = useState(dark);
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const toggleSwitch = async () => {
    setIsEnabled(!isEnabled);
    toggleDark(!dark);
    if (!isEnabled) {
      AsyncStore.setItem('theme', 'dark');
    } else {
      AsyncStore.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

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
            Interface
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
                Dark Theme
              </Text>
              <Text style={s.textSeecondary}>{dark ? 'on' : 'off'}</Text>
            </View>
            <View style={s.grow} />
            <View style={s.root}>
              <Switch
                trackColor={{
                  false: '#767577',
                  true: colors.textSecondary,
                }}
                thumbColor={isEnabled ? colors.primary : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </View>
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
              <Text style={s.textSeecondary}>{dark ? 'on' : 'off'}</Text>
            </View>
            <View style={s.grow} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
}

const s = StyleSheet.create({
  grow: {
    flexGrow: 1,
  },
  root: {
    justifyContent: 'center',
  },
  groupContainer: {
    padding: 12,
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
  textSeecondary: {
    color: 'gray',
  },
});
