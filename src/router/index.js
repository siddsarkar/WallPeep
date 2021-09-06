import {NavigationContainer} from '@react-navigation/native'
import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {retrieveUser} from '../redux/actions/userActions'
import {darkTheme, lightTheme, nightlyTheme, nordTheme} from '../theme/theme'
import useDarkMode from '../theme/useDarkMode'
import AsyncStore from '../utils/asyncStore'
import AppNavigator from './app'
import AuthNavigator from './auth'

export default function RootNavigator() {
  const [asyncStoreLoading, setAsyncStoreLoading] = useState(true)
  const [onBoardUser, setOnBoardUser] = useState(false) // whether to show onboard screen or not
  const {isLoggedIn} = useSelector(state => state.user)
  const {scheme} = useDarkMode()
  const dispatch = useDispatch()

  const initializeApp = useCallback(async () => {
    const keys = await AsyncStore.getAllKeys()

    if (!keys.includes('theme')) {
      /**
       * App started for the first time, initialize the app
       */

      await AsyncStore.setItem('theme', 'light')
      setOnBoardUser(true)
      setAsyncStoreLoading(false)
    } else {
      /**
       * Check for access & secret keys
       */

      if (!keys.includes('AppKeys')) {
        setAsyncStoreLoading(false)
      } else {
        /**
         * Check if access & secret keys are verified
         */

        if ((await AsyncStore.getItem('AppKeys')).verified) {
          /**
           * get the access_token and dispatch action to login user
           */

          dispatch(
            retrieveUser({
              accessToken: await AsyncStore.getItem('access_token'),
            }),
          )
          setAsyncStoreLoading(false)
        } else {
          setAsyncStoreLoading(false)
        }
      }
    }
  }, [dispatch])

  useEffect(() => {
    initializeApp()
  }, [initializeApp])

  const theme = () => {
    switch (scheme) {
      case 'light':
        return lightTheme
      case 'dark':
        return darkTheme
      case 'nord':
        return nordTheme
      case 'nightly':
        return nightlyTheme
      default:
        return lightTheme
    }
  }

  return (
    <NavigationContainer theme={theme()}>
      {!asyncStoreLoading &&
        (isLoggedIn ? (
          <AppNavigator />
        ) : (
          <AuthNavigator onBoardUser={onBoardUser} />
        ))}
    </NavigationContainer>
  )
}
