import {authorize} from 'react-native-app-auth'

export default {
    getAccessToken: async () => {
        const config = {
            usePKCE: false, // Important !!
            redirectUrl: 'com.wallpeep.auth://callback',
            clientId: 'b5GmlhbzhvbS8olwRMHJydH1_w3NNqIi51jZuJBSepw',
            clientSecret: 'RM1dZ8ZJJ4k0T8YJunaZs-tHpHEGhWz69zdsNeMPuW8',
            scopes: ['public'],
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
