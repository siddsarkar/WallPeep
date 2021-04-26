/**
 * ? Copyright ©2020 Siddharth
 *
 * 1. Launch authorization window
 * 2. Get code from redirected URL
 * 3. Use code to get access token
 * 4. Return the accessToken
 */

const REDIRECT_URL = browser.identity.getRedirectURL()
const CLIENT_ID = 'c86bc7c79aa3539b1015'
const CLIENT_SECRET = 'a1629683cd6424cea7ab0146094f48c7ea9e97a1'
const SCOPES = ['user', 'repo', 'notifications']
const AUTH_URL = `https://github.com/login/oauth/authorize\
?client_id=${CLIENT_ID}\
&response_type=token\
&redirect_uri=${encodeURIComponent(REDIRECT_URL)}\
&scope=${encodeURIComponent(SCOPES.join(' '))}`

function extractToken(redirectUri, tokenName) {
    const m = redirectUri.match(/[#?](.*)/)
    if (!m || m.length < 1) return null
    const params = new URLSearchParams(m[1].split('#')[0])
    return params.get(tokenName)
}

function validate(redirectURL) {
    const code = extractToken(redirectURL, 'code')
    if (!code) {
        throw new Error('Authorization failure')
    }
    const tokenURL = `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`
    const requestHeaders = new Headers()
    requestHeaders.append('Accept', 'application/json')
    const token = new Request(tokenURL, {
        method: 'POST',
        headers: requestHeaders,
    })

    function checkResponse(response) {
        return new Promise((resolve, reject) => {
            if (response.status !== 200) {
                reject(new Error('Token validation error'))
            }
            response.json().then((json) => {
                console.log(json)
                if (json.access_token) {
                    resolve(json.access_token)
                } else {
                    reject(new Error('Token not received!'))
                }
            })
        })
    }

    return fetch(token).then(checkResponse)
}

function authorize() {
    return browser.identity.launchWebAuthFlow({
        interactive: true,
        url: AUTH_URL,
    })
}

export default function getAccessToken() {
    return authorize()
        .then(validate)
        .catch((err) => console.error(err))
}
