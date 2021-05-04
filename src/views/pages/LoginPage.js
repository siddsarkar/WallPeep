/* eslint-disable global-require */
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../redux/actions/userActions';
import authorize from '../../services/authorize';
import Layout from '../components/common/Layout';

export default function LoginPage({route, navigation}) {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const handlePress = () => {
    authorize
      .getAccessToken()
      .then((token) => {
        dispatch(loginUser(token));
      })
      .catch((e) => {
        // console.error(e)
        showToast(e.toString());
      });
  };

  return (
    <Layout>
      <View style={s.root}>
        <Image
          style={s.image}
          source={require('../../assets/images/crayon-image-settings.png')}
        />
        <Pressable
          onPress={handlePress}
          style={[s.btn, {backgroundColor: colors.text}]}>
          <Image
            style={s.logo}
            source={require('../../assets/images/Unsplash_Symbol.png')}
          />
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={[s.btnText, {color: '#000'}]}>
            Login with Unsplash
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('App Keys')}
          style={[s.btn, {backgroundColor: colors.cardHeader}]}>
          <Text style={[s.btnText, {color: colors.text}]}>
            Set your app keys
          </Text>
        </Pressable>
      </View>
    </Layout>
  );
}

const s = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    // backgroundColor: 'green'
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 30,
    width: 350,
    marginBottom: 12,
    borderRadius: 6,
    // borderColor: 'darkgrey',
  },
  btnText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 16,
  },
  logo: {
    height: 16,
    width: 16,
    marginRight: 12,
  },
  image: {
    height: 250,
    width: 250,
    // marginVertical: 16,
  },
});
