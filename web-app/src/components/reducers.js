import {FETCH_PLAYLISTS_SUCCESS, SEARCH_PLAYLISTS_SUCCESS, SUGGEST_PLAYLISTS_SUCCESS} from "./actions";

export const initialState = {
    search: "",
    username: "",
    playlists: [],
    suggestions: [],
    redirectToReferrer: false
};

export default (state=initialState, action) => {
    switch (action.type) {
        case FETCH_PLAYLISTS_SUCCESS:
            return Object.assign({}, state, {playlists: action.playlists});
        case SUGGEST_PLAYLISTS_SUCCESS:
            return Object.assign({}, state, {suggestions: action.playlists});
        case SEARCH_PLAYLISTS_SUCCESS:
            return Object.assign({}, state, {playlists: action.playlists});
        default:
            return Object.assign({}, state, {});
    }
};
