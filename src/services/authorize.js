import {authorize} from 'react-native-app-auth'
import AsyncStore from '../utils/asyncStore'

export default {
    getAccessToken: async () => {
        const keys = await AsyncStore.getItem('AppKeys')
        if (!keys) {
            throw new Error('App keys not set !')
        }
        const config = {
            usePKCE: false,
            redirectUrl: 'com.wallpeep.auth://callback',
            clientId: keys.accessKey,
            clientSecret: keys.secretKey,
            scopes: [
                'public',
                'read_user',
                'write_user',
                'read_photos',
                'write_photos',
                'write_likes',
                'write_followers',
                'read_collections',
                'write_collections'
            ],
            serviceConfiguration: {
                authorizationEndpoint: 'https://unsplash.com/oauth/authorize',
                tokenEndpoint: 'https://unsplash.com/oauth/token'
            }
        }

        function checkResponse(json_response) {
            return new Promise((resolve, reject) => {
                if (json_response.accessToken) {
                    AsyncStore.setItem('AppKeys', {
                        ...keys,
                        verified: true
                    }).then(() => resolve(json_response.accessToken))
                } else {
                    reject(new Error('Token not received!'))
                }
            })
        }

        return authorize(config).then(checkResponse)
    }
}
