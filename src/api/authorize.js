import {authorize} from 'react-native-app-auth'
import AsyncStore from '../utils/AsyncStore'

export default {
    getAccessToken: async () => {
        let keys = await AsyncStore.getItem('Keys', {})
        if (!keys) {
            return
        }
        const config = {
            usePKCE: false,
            redirectUrl: 'com.wallpeep.auth://callback',
            // clientId: '05Z6iFwVrlK6_i8d4TkaN4k2c27h1etfTRFUtRHk82c', // app acess key
            clientId: keys.accessKey, // app acess key
            // clientSecret: 'fmqarHaoXoRQOqYlLovZxDLeSSEswV0Stt6-C3Thj8I', //app secret key
            clientSecret: keys.secretKey, //app secret key
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
                    resolve(json_response.accessToken)
                } else {
                    reject(new Error('Token not received!'))
                }
            })
        }

        return await authorize(config).then(checkResponse)
    }
}
