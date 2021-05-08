/**
 * global response bridge
 * @param {*} response response from api
 * @returns data if successful else throw err
 */
function processResponse(response) {
    console.log(response)
    if (response.ok) {
        return response
            .json()
            .then((json) => ({json, rate: response.headers.map}))
    }
    throw response.status
}

export default {
    getUserInfo: (accessToken) => {
        const endpoint = `/me`
        const requestURL = `https://api.unsplash.com${endpoint}`

        return fetch(requestURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(processResponse)
    },

    getUserPhotos: (accessToken, {username}) => {
        const endpoint = `/users/${username}/photos`
        const requestURL = `https://api.unsplash.com${endpoint}`

        return fetch(requestURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(processResponse)
    },

    getUserLikes: (accessToken, {username}) => {
        const endpoint = `/users/${username}/likes`
        const requestURL = `https://api.unsplash.com${endpoint}`

        return fetch(requestURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(processResponse)
    },

    getUserCollections: (accessToken, {username}) => {
        const endpoint = `/users/${username}/collections`
        const requestURL = `https://api.unsplash.com${endpoint}`

        return fetch(requestURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(processResponse)
    },

    toggleImageLike: (accessToken, options = {image: {}}) => {
        const method = options.image.liked_by_user ? 'DELETE' : 'POST'
        const endpoint = `/photos/${options.image.id}/like`
        const requestURL = `https://api.unsplash.com${endpoint}`

        return fetch(requestURL, {
            method,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(processResponse)
    },

    toggleAddToCollection: (
        accessToken,
        {collection_id, photo_id, collected}
    ) => {
        const method = collected ? 'DELETE' : 'POST'
        const endpoint = collected
            ? `/collections/${collection_id}/remove?photo_id=${photo_id}`
            : `/collections/${collection_id}/add?photo_id=${photo_id}`
        const requestURL = `https://api.unsplash.com${endpoint}`

        return fetch(requestURL, {
            method,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(processResponse)
    },

    getRandomPhotos: (accessToken, {page, per_page, order_by}) => {
        const endpoint = `/photos?page=${page}&per_page=${per_page}&order_by=${order_by}`
        const requestURL = `https://api.unsplash.com${endpoint}`

        return fetch(requestURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(processResponse)
    },

    getSearchPhotos: (accessToken, {query, page, per_page}) => {
        const endpoint = `/search/photos?query=${query}&page=${page}&per_page=${per_page}`
        const requestURL = `https://api.unsplash.com${endpoint}`

        return fetch(requestURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(processResponse)
    },

    getCollections: (accessToken) => {
        const endpoint = `/collections`
        const requestURL = `https://api.unsplash.com${endpoint}`

        return fetch(requestURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(processResponse)
    },

    getCollection: (accessToken, {id}) => {
        const endpoint = `/collections/${id}/photos`
        const requestURL = `https://api.unsplash.com${endpoint}`

        return fetch(requestURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(processResponse)
    }
}
