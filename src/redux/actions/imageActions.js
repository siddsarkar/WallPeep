// /photos/:id/like

import api from '../../api/api'

export function togglePhotoLike(image, cb) {
    return (dispatch, getState) => {
        api.toggleLike(getState().user.accessToken, image).then(({photo}) => {
            return cb(photo)
        })
    }
}
