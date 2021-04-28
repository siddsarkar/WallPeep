/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {Provider} from 'react-redux'
import RootNavigator from './navigation'
import store from './redux/storeConfig'
import {ThemeManager} from './theme/ThemeContext'

const App = () => (
    <ThemeManager>
        <Provider store={store}>
            <RootNavigator />
        </Provider>
    </ThemeManager>
)

export default App
