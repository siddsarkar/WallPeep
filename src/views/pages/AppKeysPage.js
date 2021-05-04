import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStore from '../../utils/asyncStore';
import Layout from '../components/common/Layout';

export default function AppKeysPage({navigation}) {
  const {colors} = useTheme();
  const [keys, setKeys] = useState({
    accessKey: '',
    secretKey: '',
    verified: false,
  });

  const handleContinue = async () => {
    await AsyncStore.setItem('AppKeys', keys);
    navigation.navigate({
      name: 'Login',
    });
  };

  return (
    <Layout>
      <Text
        style={[s.label, {color: colors.text, backgroundColor: colors.card}]}>
        Access Key
      </Text>
      <View style={[s.searchBar, {backgroundColor: colors.card}]}>
        <TextInput
          value={keys.accessKey}
          onChangeText={(q) => setKeys({...keys, accessKey: q})}
          placeholderTextColor={colors.textPlaceholder}
          style={[
            s.textField,
            {
              color: colors.textPlaceholder,
              backgroundColor: colors.inputBackground,
            },
          ]}
          placeholder="your access key here"
        />
        <MaterialCommunityIcons
          name="key"
          size={26}
          color={colors.textPlaceholder}
          style={s.searchIcon}
        />
        {!!keys.accessKey && (
          <MaterialCommunityIcons
            name="close-circle"
            size={26}
            color={colors.textPlaceholder}
            style={s.clearIcon}
            onPress={() => setKeys({...keys, accessKey: ''})}
          />
        )}
      </View>
      <Text
        style={[s.label, {color: colors.text, backgroundColor: colors.card}]}>
        Secret key
      </Text>
      <View
        style={[
          s.searchBar,
          // eslint-disable-next-line react-native/no-inline-styles
          {backgroundColor: colors.card, paddingBottom: 24},
        ]}>
        <TextInput
          value={keys.secretKey}
          onChangeText={(q) => setKeys({...keys, secretKey: q})}
          placeholderTextColor={colors.textPlaceholder}
          style={[
            s.textField,
            {
              color: colors.text,
              backgroundColor: colors.inputBackground,
            },
          ]}
          placeholder="your secret key here"
        />
        <MaterialCommunityIcons
          name="key"
          size={26}
          color={colors.textPlaceholder}
          style={s.searchIcon}
        />
        {!!keys.secretKey && (
          <MaterialCommunityIcons
            name="close-circle"
            size={26}
            color={colors.textPlaceholder}
            style={s.clearIcon}
            onPress={() => setKeys({...keys, secretKey: ''})}
          />
        )}
      </View>
      <View style={[s.searchBar, {backgroundColor: colors.card}]}>
        <Button
          color={colors.primary}
          onPress={handleContinue}
          disabled={!(keys.accessKey && keys.secretKey)}
          style={s.btn}
          title="Save Keys & Continue"
        />
      </View>
    </Layout>
  );
}

const s = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  searchBar: {
    paddingHorizontal: 12,
    paddingBottom: 16,
    position: 'relative',
  },
  textField: {
    fontFamily: 'JosefinSans-Regular',
    width: '100%',
    height: 40,
    borderRadius: 6,
    paddingHorizontal: 40,
  },
  searchIcon: {
    position: 'absolute',
    top: 6,
    left: 18,
  },
  clearIcon: {
    position: 'absolute',
    top: 6,
    right: 18,
  },
  label: {
    fontSize: 18,
    paddingTop: 12,
    paddingLeft: 12,
    paddingBottom: 6,
  },
  text: {
    marginTop: 10,
    fontFamily: 'JosefinSans-Regular',
  },
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  btn: {
    paddingVertical: 18,
    height: 55,
    borderRadius: 6,
  },
});
