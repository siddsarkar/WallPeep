import React, {useEffect} from 'react'
import api from './api/api'
import authorize from './api/authorize'
import Navigation from './navigation/Navigation'
import {ThemeManager} from './theme/ThemeContext'

const App = () => {
    useEffect(() => {
        // oauth()
    }, [])

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
            <Navigation />
        </ThemeManager>
    )
}

export default App

// const res = {
//     accessToken: 't9BMNGLwhngg3_RJm--Kxuuha4UWRUUEqWFwc0mZOko',
//     authorizeAdditionalParameters: {},
//     idToken: null,
//     refreshToken: 's4Dyjf4KtkcIM8rvag64sE9SsCVK6iRmmuVUdZb-Rd4',
//     scopes: [],
//     tokenAdditionalParameters: {created_at: '1619516929'},
//     tokenType: 'Bearer'
// }
