function generateRequest(accessToken, endpoint = '/') {
    const requestURL = `https://api.unsplash.com${endpoint}`
    const requestHeaders = new Headers()
    requestHeaders.append('Authorization', `Bearer ${accessToken}`)
    // eslint-disable-next-line no-undef
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
    },
    getCollections: async accessToken => {
        const requestURL = `/collections`
        const driveRequest = generateRequest(accessToken, requestURL)

        return await fetch(driveRequest).then(response => {
            if (response.status === 200) {
                return response.json()
            }
            throw response.status
        })
    },
    getUserCollections: async (accessToken, username) => {
        const requestURL = `/users/${username}/collections`
        const driveRequest = generateRequest(accessToken, requestURL)

        return await fetch(driveRequest).then(response => {
            if (response.status === 200) {
                return response.json()
            }
            throw response.status
        })
    }
}
