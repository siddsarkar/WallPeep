function generateRequest(accessToken, endpoint = '/', method = 'GET') {
    const requestURL = `https://api.unsplash.com${endpoint}`
    const requestHeaders = new Headers()
    requestHeaders.append('Authorization', `Bearer ${accessToken}`)
    // eslint-disable-next-line no-undef
    return new Request(requestURL, {
        method,
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
    getPhotos: async accessToken => {
        const requestURL = `/photos`
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
    },
    toggleLike: async (accessToken, image) => {
        const requestURL = `/photos/${image.id}/like`
        const driveRequest = generateRequest(
            accessToken,
            requestURL,
            image.liked_by_user ? 'DELETE' : 'POST'
        )

        return await fetch(driveRequest).then(response => {
            if (response.status === 201 || 200) {
                return response.json()
            }
            throw response.status
        })
    }
}
