import React, {useEffect} from 'react'
import api from './api/api'
import authorize from './api/authorize'
import RootNavigator from './navigation'
import {ThemeManager} from './theme/ThemeContext'

export default function App() {
    useEffect(() => {
        // oauth()
    }, [])

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
            <RootNavigator />
        </ThemeManager>
    )
}
