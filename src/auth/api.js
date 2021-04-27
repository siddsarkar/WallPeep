function generateRequest(accessToken, endpoint = '/') {
    const requestURL = `https://api.github.com${endpoint}`
    const requestHeaders = new Headers()
    requestHeaders.append('Authorization', `Bearer ${accessToken}`)
    return new Request(requestURL, {
        method: 'GET',
        headers: requestHeaders,
    })
}

export function getUserInfo(accessToken) {
    const requestURL = `/user`
    const driveRequest = generateRequest(accessToken, requestURL)

    return fetch(driveRequest).then((response) => {
        if (response.status === 200) {
            return response.json()
        }
        throw response.status
    })
}

export function getNotifications(accessToken) {
    const requestURL = `/notifications?all=true&per_page=5`
    const driveRequest = generateRequest(accessToken, requestURL)

    return fetch(driveRequest).then((response) => {
        if (response.status === 200) {
            return response.json()
        }
        throw response.status
    })
}

export function getRepos(accessToken) {
    const requestURL = `/user/repos?per_page=100`
    const driveRequest = generateRequest(accessToken, requestURL)

    return fetch(driveRequest).then((response) => {
        if (response.status === 200) {
            return response.json()
        }
        throw response.status
    })
}

export function getStarredRepos(accessToken) {
    const requestURL = `/user/starred`
    const driveRequest = generateRequest(accessToken, requestURL)

    return fetch(driveRequest).then((response) => {
        if (response.status === 200) {
            return response.json()
        }
        throw response.status
    })
}
