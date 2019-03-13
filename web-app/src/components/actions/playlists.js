import api from '../api-gateway';

export const FETCH_PLAYLISTS_REQUEST = 'FETCH_PLAYLISTS_REQUEST';
const fetchPlaylistsRequest = () => ({ type: FETCH_PLAYLISTS_REQUEST });

export const FETCH_PLAYLISTS_SUCCESS = 'FETCH_PLAYLISTS_SUCCESS';
const fetchPlaylistsSuccess = playlists => ({ type: FETCH_PLAYLISTS_SUCCESS, playlists });

export const FETCH_PLAYLISTS_FAILURE = 'FETCH_PLAYLISTS_FAILURE';
const fetchPlaylistsFailure = error => ({ type: FETCH_PLAYLISTS_FAILURE, error });

export const fetchPlaylists = () => dispatch => {
    dispatch(fetchPlaylistsRequest());

    return new Promise((resolve, reject) => {
        api.get(`/playlists`, (err, res) => {
            if (err) {
                dispatch(fetchPlaylistsFailure(err.message));
                return reject(err);
            }

            dispatch(fetchPlaylistsSuccess(res));
            return resolve(res);
        });
    });
};

export const SEARCH_PLAYLISTS_REQUEST = 'SEARCH_PLAYLISTS_REQUEST';
const searchPlaylistsRequest = () => ({ type: SEARCH_PLAYLISTS_REQUEST });

export const SEARCH_PLAYLISTS_SUCCESS = 'SEARCH_PLAYLISTS_SUCCESS';
const searchPlaylistsSuccess = playlists => ({ type: SEARCH_PLAYLISTS_SUCCESS, playlists });

export const SEARCH_PLAYLISTS_FAILURE = 'SEARCH_PLAYLISTS_FAILURE';
const searchPlaylistsFailure = error => ({ type: SEARCH_PLAYLISTS_FAILURE, error });

export const searchPlaylists = search => dispatch => {
    dispatch(searchPlaylistsRequest());

    return new Promise((resolve, reject) => {
        api.get(`/playlists?search=${search}`, (err, res) => {
            if (err) {
                dispatch(searchPlaylistsFailure(err.message));
                return reject(err);
            }

            dispatch(searchPlaylistsSuccess(res));
            return resolve(res);
        });
    });
};

export const SUGGEST_PLAYLISTS_REQUEST = 'SUGGEST_PLAYLISTS_REQUEST';
const suggestPlaylistsRequest = () => ({ type: SUGGEST_PLAYLISTS_REQUEST });

export const SUGGEST_PLAYLISTS_SUCCESS = 'SUGGEST_PLAYLISTS_SUCCESS';
const suggestPlaylistsSuccess = playlists => ({ type: SUGGEST_PLAYLISTS_SUCCESS, playlists });

export const SUGGEST_PLAYLISTS_FAILURE = 'SUGGEST_PLAYLISTS_FAILURE';
const suggestPlaylistsFailure = error => ({ type: SUGGEST_PLAYLISTS_FAILURE, error });

export const suggestPlaylists = () => dispatch => {
    dispatch(suggestPlaylistsRequest());

    return new Promise((resolve, reject) => {
        api.get(`/playlists?search=&suggest=true`, (err, res) => {
            if (err) {
                dispatch(suggestPlaylistsFailure(err.message));
                return reject(err);
            }

            dispatch(suggestPlaylistsSuccess(res));
            return resolve(res);
        });
    });
};

//
// Subscribing to a playlist
//
export const SUBSCRIBE_TO_PLAYLIST_REQUEST = 'SUBSCRIBE_TO_PLAYLIST_REQUEST';
const subscribeToPlaylistRequest = () => ({ type: SUBSCRIBE_TO_PLAYLIST_REQUEST });

export const SUBSCRIBE_TO_PLAYLIST_SUCCESS = 'SUBSCRIBE_TO_PLAYLIST_SUCCESS';
const subscribeToPlaylistSuccess = subscriptions => ({ type: SUBSCRIBE_TO_PLAYLIST_SUCCESS, subscriptions });

export const SUBSCRIBE_TO_PLAYLIST_FAILURE = 'SUBSCRIBE_TO_PLAYLIST_FAILURE';
const subscribeToPlaylistFailure = error => ({ type: SUBSCRIBE_TO_PLAYLIST_FAILURE, error });

export const subscribeToPlaylist = playlistId => (dispatch, getState) => {
    dispatch(subscribeToPlaylistRequest());

    let subscriberId = getState().user.id;

    return new Promise((resolve, reject) => {
        let body = { subscriberId };
        api.post(`/playlists/${playlistId}/subscribers`, body, (err, res) => {
            if (err) {
                dispatch(subscribeToPlaylistFailure(err.message));
                return reject(err);
            }

            dispatch(subscribeToPlaylistSuccess(res.content));
            return resolve(res);
        });
    });
};

//
// Fetch the subscribed playlists
//
export const FETCH_SUBSCRIPTIONS_REQUEST = 'FETCH_SUBSCRIPTIONS_REQUEST';
const fetchSubscriptionsRequest = () => ({ type: FETCH_SUBSCRIPTIONS_REQUEST });

export const FETCH_SUBSCRIPTIONS_SUCCESS = 'FETCH_SUBSCRIPTIONS_SUCCESS';
const fetchSubscriptionsSuccess = subscriptions => ({ type: FETCH_SUBSCRIPTIONS_SUCCESS, subscriptions });

export const FETCH_SUBSCRIPTIONS_FAILURE = 'FETCH_SUBSCRIPTIONS_FAILURE';
const fetchSubscriptionsFailure = error => ({ type: FETCH_SUBSCRIPTIONS_FAILURE, error });

export const fetchSubscriptions = () => (dispatch, getState) => {
    dispatch(fetchSubscriptionsRequest());

    let uid = getState().user.id;

    return new Promise((resolve, reject) => {
        api.get(`/playlists/?subscribedBy=${uid}`, (err, res) => {
            if (err) {
                dispatch(fetchSubscriptionsFailure(err.message));
                return reject(err);
            }

            dispatch(fetchSubscriptionsSuccess(res));
            return resolve(res);
        });
    });
};

//
// Unsubsribe from a playlist
//
export const UNSUBSCRIBE_FROM_PLAYLIST_REQUEST = 'UNSUBSCRIBE_FROM_PLAYLIST_REQUEST';
const unsubscribeFromPlaylistRequest = () => ({ type: UNSUBSCRIBE_FROM_PLAYLIST_REQUEST });

export const UNSUBSCRIBE_FROM_PLAYLIST_SUCCESS = 'UNSUBSCRIBE_FROM_PLAYLIST_SUCCESS';
const unsubscribeFromPlaylistSuccess = subscriptions => ({ type: UNSUBSCRIBE_FROM_PLAYLIST_SUCCESS, subscriptions });

export const UNSUBSCRIBE_FROM_PLAYLIST_FAILURE = 'UNSUBSCRIBE_FROM_PLAYLIST_FAILURE';
const unsubscribeFromPlaylistFailure = error => ({ type: UNSUBSCRIBE_FROM_PLAYLIST_FAILURE, error });

export const unsubscribeFromPlaylist = playlistId => (dispatch, getState) => {
    dispatch(unsubscribeFromPlaylistRequest());

    let uid = getState().user.id;

    return new Promise((resolve, reject) => {
        api.delete(`/playlists/${playlistId}/subscribers/${uid}`, (err, res) => {
            if (err) {
                dispatch(unsubscribeFromPlaylistFailure(err.message));
                return reject(err);
            }

            dispatch(unsubscribeFromPlaylistSuccess(res.content));
            return resolve(res);
        });
    });
};
