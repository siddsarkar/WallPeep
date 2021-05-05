import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {retrieveUser} from '../redux/actions/userActions';
import {darkTheme, lightTheme, nightlyTheme, nordTheme} from '../theme/theme';
import useDarkMode from '../theme/useDarkMode';
import AsyncStore from '../utils/asyncStore';
import AppNavigator from './app';
import AuthNavigator from './auth';

export default function RootNavigator() {
  const [asyncStoreLoading, setAsyncStoreLoading] = useState(true);
  const [onBoardUser, setOnBoardUser] = useState(false);
  const {isLoggedIn} = useSelector((state) => state.user);
  const {scheme} = useDarkMode();
  const dispatch = useDispatch();

  const initialLoad = useCallback(async () => {
    setAsyncStoreLoading(true);
    const keys = await AsyncStore.getAllKeys();
    // console.log(keys);
    /**
     * Check if user opened the app already
     */
    if (!keys.includes('theme')) {
      await AsyncStore.setItem('theme', 'light');
      setOnBoardUser(true);
      setAsyncStoreLoading(false);
    } else {
      /**
       * Check logged in status of user
       */
      if (!keys.includes('AppKeys')) {
        setAsyncStoreLoading(false);
      } else {
        const appKeys = await AsyncStore.getItem('AppKeys');
        console.log(appKeys);
        if (appKeys.verified) {
          const accessToken = await AsyncStore.getItem('access_token');

          await dispatch(retrieveUser({accessToken})); // This will update isLoggedIn to true
          setAsyncStoreLoading(false);
        } else {
          setAsyncStoreLoading(false);
        }
      }
    }
  }, [dispatch]);

  useEffect(() => {
    initialLoad();
  }, [initialLoad]);

  const theme = () => {
    switch (scheme) {
      case 'light':
        return lightTheme;
      case 'dark':
        return darkTheme;
      case 'nord':
        return nordTheme;
      case 'nightly':
        return nightlyTheme;
      default:
        break;
    }
  };

  return (
    <NavigationContainer theme={theme()}>
      {!asyncStoreLoading &&
        (isLoggedIn ? (
          <AppNavigator />
        ) : (
          <AuthNavigator
            onBoardUser={onBoardUser} // whether to show onboard screen or not
          />
        ))}
    </NavigationContainer>
  );
}
