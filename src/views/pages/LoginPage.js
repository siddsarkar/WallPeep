import {useTheme} from '@react-navigation/native'
import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../redux/actions/userActions'
import authorize from '../../services/authorize'
import Layout from '../components/common/Layout'

export default function LoginPage({route, navigation}) {
  const {colors} = useTheme()
  const dispatch = useDispatch()

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  }

  const handlePress = () => {
    authorize
      .getAccessToken()
      .then(token => {
        dispatch(loginUser(token))
      })
      .catch(e => {
        // console.error(e)
        showToast(e.toString())
      })
  }

  return (
    <Layout>
      <View style={s.root}>
        <View style={s.imageWrapper}>
          <Image
            style={s.image}
            source={require('../../assets/images/crayon-image-settings.png')}
          />
        </View>
        <TouchableOpacity onPress={handlePress} style={s.btn}>
          <Image
            style={s.logo}
            source={require('../../assets/images/Unsplash_Symbol.png')}
          />
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={[s.btnText, {color: '#000'}]}>
            &nbsp;&nbsp;Login with Unsplash
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('App Keys')}
          style={[s.btn, {backgroundColor: colors.primary}]}>
          <MaterialCommunityIcons
            name='key'
            size={20}
            color={colors.background}
            style={s.searchIcon}
          />
          <Text style={[s.btnText, {color: colors.background}]}>
            &nbsp;&nbsp;Set your app keys
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  )
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
    backgroundColor: 'white',
    // borderColor: 'darkgrey',
  },
  btnText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 16,
  },
  logo: {
    height: 16,
    width: 16,
  },
  imageWrapper: {flexGrow: 1, justifyContent: 'center', alignItems: 'center'},
  image: {
    height: 250,
    aspectRatio: 1216 / 912,

    // marginVertical: 16,
  },
})
