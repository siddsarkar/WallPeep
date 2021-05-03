/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/storeConfig';
import RootNavigator from './router';
import ThemeManager from './theme/themeProvider';

const App = () => (
  <ThemeManager>
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  </ThemeManager>
);

export default App;
