function generateRequest(accessToken, endpoint = '/') {
    const requestURL = `https://api.unsplash.com${endpoint}`
    const requestHeaders = new Headers()
    requestHeaders.append('Authorization', `Bearer ${accessToken}`)
    return new Request(requestURL, {
        method: 'GET',
        headers: requestHeaders
    })
}

export default {
    getUserInfo: async accessToken => {
        const requestURL = `/me`
        const driveRequest = generateRequest(accessToken, requestURL)

        return await fetch(driveRequest).then(response => {
            if (response.status === 200) {
                return response.json()
            }
            throw response.status
        })
    }
}
