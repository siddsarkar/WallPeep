/**
 * global api request bridge
 * @param {string} accessToken OAuth Accesstoken
 * @param {string} endpoint request endpoint
 * @param {string} method http request method
 * @returns a request object to be passes into fetch
 */
function generateRequest(accessToken, endpoint = '/', method = 'GET') {
  const requestURL = `https://api.unsplash.com${endpoint}`;
  const requestHeaders = new Headers();
  requestHeaders.append('Authorization', `Bearer ${accessToken}`);

  // eslint-disable-next-line no-undef
  return new Request(requestURL, {
    method,
    headers: requestHeaders,
  });
}

/**
 * global response bridge
 * @param {*} response response from api
 * @returns data if successful else throw err
 */
function processResponse(response) {
  if (response.ok) {
    return response.json().then((json) => ({json, rate: response.headers.map}));
  } else {
    throw response.status;
  }
}

export default {
  // Current User Actions

  getUserInfo: (accessToken, options) => {
    const driveRequest = generateRequest(accessToken, '/me');

    return fetch(driveRequest).then(processResponse);
  },

  getUserPhotos: (accessToken, options = {username: ''}) => {
    const driveRequest = generateRequest(
      accessToken,
      `/users/${options.username}/photos`,
    );

    return fetch(driveRequest).then(processResponse);
  },

  getUserLikes: (accessToken, options = {username: ''}) => {
    const driveRequest = generateRequest(
      accessToken,
      `/users/${options.username}/likes`,
    );

    return fetch(driveRequest).then(processResponse);
  },

  getUserCollections: (accessToken, options = {username: ''}) => {
    const driveRequest = generateRequest(
      accessToken,
      `/users/${options.username}/collections`,
    );

    return fetch(driveRequest).then(processResponse);
  },

  toggleImageLike: (accessToken, options = {image: {}}) => {
    const method = options.image.liked_by_user ? 'DELETE' : 'POST';
    const driveRequest = generateRequest(
      accessToken,
      `/photos/${options.image.id}/like`,
      method,
    );

    return fetch(driveRequest).then(processResponse);
  },

  toggleAddToCollection: (
    accessToken,
    options = {
      collection_id: null,
      photo_id: null,
      inCollection: null,
    },
  ) => {
    const method = options.inCollection ? 'DELETE' : 'POST';
    const endPoint = options.inCollection
      ? `/collections/${options.collection_id}/remove?photo_id=${options.photo_id}`
      : `/collections/${options.collection_id}/add?photo_id=${options.photo_id}`;

    const driveRequest = generateRequest(accessToken, endPoint, method);

    return fetch(driveRequest).then(processResponse);
  },

  // Public Actions

  getRandomPhotos: (
    accessToken,
    options = {page: 1, per_page: 10, order_by: 'latest'},
  ) => {
    const driveRequest = generateRequest(
      accessToken,
      `/photos?page=${options.page}&per_page=${options.per_page}&order_by=${options.order_by}`,
    );

    return fetch(driveRequest).then(processResponse);
  },

  getSearchPhotos: (
    accessToken,
    options = {query: '', page: 1, per_page: 30},
  ) => {
    const driveRequest = generateRequest(
      accessToken,
      `/search/photos?query=${options.query}&page=${options.page}&per_page=${options.per_page}`,
    );

    return fetch(driveRequest).then(processResponse);
  },

  getCollections: (accessToken, options = {}) => {
    const driveRequest = generateRequest(accessToken, '/collections');

    return fetch(driveRequest).then(processResponse);
  },

  getCollection: (accessToken, options = {id: 0}) => {
    const driveRequest = generateRequest(
      accessToken,
      `/collections/${options.id}/photos`,
    );

    return fetch(driveRequest).then(processResponse);
  },
};
