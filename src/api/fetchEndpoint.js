const ENDPOINT = 'https://api.unsplash.com';
const ACCESS_KEY = 'b5GmlhbzhvbS8olwRMHJydH1_w3NNqIi51jZuJBSepw';

export default function fetchPhotos() {
  const requestURL = `${ENDPOINT}/photos/?client_id=${ACCESS_KEY}`;
  const requestHeaders = new Headers();
  requestHeaders.append('Content-type', 'application/json');
  // eslint-disable-next-line no-undef
  const driveRequest = new Request(requestURL, {
    method: 'GET',
    headers: requestHeaders,
  });

  return fetch(driveRequest).then(response => {
    if (response.ok && response.status === 200) {
      return response.json();
    }
    throw response.status;
  });
}
