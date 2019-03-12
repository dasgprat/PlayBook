import api from "./api-gateway";

export const FETCH_PLAYLISTS_REQUEST = 'FETCH_PLAYLISTS_REQUEST';
const fetchPlaylistsRequest = () => ({type: FETCH_PLAYLISTS_REQUEST});

export const FETCH_PLAYLISTS_SUCCESS = 'FETCH_PLAYLISTS_SUCCESS';
const fetchPlaylistsSuccess = playlists => ({type: FETCH_PLAYLISTS_SUCCESS, playlists });

export const FETCH_PLAYLISTS_FAILURE = 'FETCH_PLAYLISTS_FAILURE';
const fetchPlaylistsFailure = error => ({type: FETCH_PLAYLISTS_FAILURE, error });

export const fetchPlaylists = () => dispatch => {
    dispatch(fetchPlaylistsRequest());

    return new Promise((resolve, reject) => {
        api.get(`/playlists`, (err, res) => {
            if(err) {
                dispatch(fetchPlaylistsFailure(err.message));
                return reject(err);
            }

            dispatch(fetchPlaylistsSuccess(res));
            return resolve(res);
        });
    });
};

export const SEARCH_PLAYLISTS_REQUEST = 'SEARCH_PLAYLISTS_REQUEST';
const searchPlaylistsRequest = () => ({type: SEARCH_PLAYLISTS_REQUEST});

export const SEARCH_PLAYLISTS_SUCCESS = 'SEARCH_PLAYLISTS_SUCCESS';
const searchPlaylistsSuccess = playlists => ({type: SEARCH_PLAYLISTS_SUCCESS, playlists });

export const SEARCH_PLAYLISTS_FAILURE = 'SEARCH_PLAYLISTS_FAILURE';
const searchPlaylistsFailure = error => ({type: SEARCH_PLAYLISTS_FAILURE, error });

export const searchPlaylists = search => dispatch => {
    dispatch(searchPlaylistsRequest());

    return new Promise((resolve, reject) => {
        api.get(`/playlists?search=${search}`, (err, res) => {
            if(err) {
                dispatch(searchPlaylistsFailure(err.message));
                return reject(err);
            }

            dispatch(searchPlaylistsSuccess(res));
            return resolve(res);
        });
    });
};

export const SUGGEST_PLAYLISTS_REQUEST = 'SUGGEST_PLAYLISTS_REQUEST';
const suggestPlaylistsRequest = () => ({type: SUGGEST_PLAYLISTS_REQUEST});

export const SUGGEST_PLAYLISTS_SUCCESS = 'SUGGEST_PLAYLISTS_SUCCESS';
const suggestPlaylistsSuccess = playlists => ({type: SUGGEST_PLAYLISTS_SUCCESS, playlists });

export const SUGGEST_PLAYLISTS_FAILURE = 'SUGGEST_PLAYLISTS_FAILURE';
const suggestPlaylistsFailure = error => ({type: SUGGEST_PLAYLISTS_FAILURE, error });

export const suggestPlaylists = () => dispatch => {
    dispatch(suggestPlaylistsRequest());

    return new Promise((resolve, reject) => {
        api.get(`/playlists?search=`, (err, res) => {
            if(err) {
                dispatch(suggestPlaylistsFailure(err.message));
                return reject(err);
            }

            dispatch(suggestPlaylistsSuccess(res));
            return resolve(res);
        });
    });
};