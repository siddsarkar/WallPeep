/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {Provider} from 'react-redux'
import api from './api/api'
import authorize from './api/authorize'
import RootNavigator from './navigation'
import store from './redux/storeConfig'
import {ThemeManager} from './theme/ThemeContext'

export default function App() {
    // eslint-disable-next-line no-unused-vars
    const oauth = () => {
        function notifyUser(user) {
            console.log(user)
        }
        function logError(err) {
            console.log(err)
        }
        authorize
            .getAccessToken()
            .then(api.getUserInfo)
            .then(notifyUser)
            .catch(logError)
    }

    return (
        <ThemeManager>
            <Provider store={store}>
                <RootNavigator />
            </Provider>
        </ThemeManager>
    )
}
