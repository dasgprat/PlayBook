import {
    FETCH_PLAYLISTS_SUCCESS,
    SEARCH_PLAYLISTS_SUCCESS,
    SUGGEST_PLAYLISTS_SUCCESS,
    SUBSCRIBE_TO_PLAYLIST_REQUEST,
    SUBSCRIBE_TO_PLAYLIST_SUCCESS,
    SUBSCRIBE_TO_PLAYLIST_FAILURE,
    FETCH_SUBSCRIPTIONS_REQUEST,
    FETCH_SUBSCRIPTIONS_FAILURE,
    FETCH_SUBSCRIPTIONS_SUCCESS,
    UNSUBSCRIBE_FROM_PLAYLIST_REQUEST,
    UNSUBSCRIBE_FROM_PLAYLIST_SUCCESS,
    UNSUBSCRIBE_FROM_PLAYLIST_FAILURE
} from './actions/playlists';
import {
    AUTHENTICATE_USER_REQUEST,
    AUTHENTICATE_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    VERIFY_AUTHENTICATION_REQUEST,
    AUTHENTICATE_USER_FAILURE,
    REGISTER_USER_FAILURE,
    VERIFY_AUTHENTICATION_FAILURE,
    REGISTER_USER_SUCCESS,
    VERIFY_AUTHENTICATION_SUCCESS,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAILURE,
    UPDATE_USER_SUCCESS
} from './actions/user';

export const initialState = {
    authenticated: null,
    user: {
        id: null,
        username: null
    },
    subscriptions: [],
    error: null,
    isFetching: false,
    search: '',
    playlists: [],
    suggestions: [],
    redirectToReferrer: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLAYLISTS_SUCCESS:
            return Object.assign({}, state, { playlists: action.playlists });
        case SUGGEST_PLAYLISTS_SUCCESS:
            return Object.assign({}, state, { suggestions: action.playlists });
        case SEARCH_PLAYLISTS_SUCCESS:
            return Object.assign({}, state, { playlists: action.playlists });

        // Playlist Subscription
        case SUBSCRIBE_TO_PLAYLIST_REQUEST:
        case FETCH_SUBSCRIPTIONS_REQUEST:
        case UNSUBSCRIBE_FROM_PLAYLIST_REQUEST:
            return Object.assign({}, state, {
                error: null,
                isFetching: true
            });
        case SUBSCRIBE_TO_PLAYLIST_FAILURE:
        case FETCH_SUBSCRIPTIONS_FAILURE:
        case UNSUBSCRIBE_FROM_PLAYLIST_REQUEST:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false
            });
        case SUBSCRIBE_TO_PLAYLIST_SUCCESS:
        case FETCH_SUBSCRIPTIONS_SUCCESS:
        case UNSUBSCRIBE_FROM_PLAYLIST_SUCCESS:
            return Object.assign({}, state, {
                subscriptions: action.subscriptions,
                error: null,
                isFetching: false
            });

        // User action reductions
        case AUTHENTICATE_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case VERIFY_AUTHENTICATION_REQUEST:
        case LOGOUT_USER_REQUEST:
        case UPDATE_USER_REQUEST:
            return Object.assign({}, state, {
                error: null,
                isFetching: true
            });

        case AUTHENTICATE_USER_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false,
                authenticated: false
            });
        case REGISTER_USER_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false
            });
        case VERIFY_AUTHENTICATION_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false,
                authenticated: false
            });

        case AUTHENTICATE_USER_SUCCESS:
            return Object.assign({}, state, {
                error: null,
                isFetching: false,
                user: action.user,
                authenticated: true
            });

        case REGISTER_USER_SUCCESS:
            return Object.assign({}, state, {
                error: null,
                isFetching: false,
                user: action.user
            });

        case VERIFY_AUTHENTICATION_SUCCESS:
            return Object.assign({}, state, {
                error: null,
                isFetching: false,
                user: action.user,
                authenticated: true
            });

        case UPDATE_USER_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false
            });

        case UPDATE_USER_SUCCESS:
            return Object.assign({}, state, {
                user: action.user
            });

        case LOGOUT_USER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });

        case LOGOUT_USER_SUCCESS:
            return Object.assign({}, state, {
                authenticated: false,
                user: {
                    id: null,
                    username: null
                },
                error: null,
                isFetching: false
            });

        default:
            return Object.assign({}, state);
    }
};
