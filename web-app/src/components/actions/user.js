import api from '../api-gateway';

//
// Authenticate the user with a username and password
//
export const AUTHENTICATE_USER_REQUEST = 'AUTHENTICATE_USER_REQUEST';
const authenticateUserRequest = () => ({ type: AUTHENTICATE_USER_REQUEST });

export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS';
const authenticateUserSuccess = user => ({ type: AUTHENTICATE_USER_SUCCESS, user });

export const AUTHENTICATE_USER_FAILURE = 'AUTHENTICATE_USER_FAILURE';
const authenticateUserFailure = error => ({ type: AUTHENTICATE_USER_FAILURE, error });

export const authenticateUser = (username, password) => dispatch => {
    dispatch(authenticateUserRequest());

    return new Promise((resolve, reject) => {
        let body = {
            username,
            password
        };
        api.put('/auth', body, (err, res) => {
            if (err) {
                dispatch(authenticateUserFailure(err.message));
                return reject(err);
            }

            dispatch(authenticateUserSuccess(res.content.user));
            return resolve(res);
        });
    });
};

//
// Register a new user before authenticating them
//
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
const registerUserRequest = () => ({ type: REGISTER_USER_REQUEST });

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
const registerUserSuccess = user => ({ type: REGISTER_USER_SUCCESS, user });

export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
const registerUserFailure = error => ({ type: REGISTER_USER_FAILURE, error });

export const registerUser = ({ username, password, name, age, email }) => dispatch => {
    dispatch(registerUserRequest());

    return new Promise((resolve, reject) => {
        let body = {
            username,
            name,
            age,
            contact: {
                email
            },
            password
        };
        api.post('/users', body, (err, res) => {
            if (err) {
                dispatch(registerUserFailure(err.message));
                return reject(err);
            }

            dispatch(registerUserSuccess(res.content));
            return resolve(res);
        });
    });
};

//
// Verify that the user is still authenticated on a page refresh
//
export const VERIFY_AUTHENTICATION_REQUEST = 'VERIFY_AUTHENTICATION_REQUEST';
const verifyAuthenticationRequest = () => ({ type: VERIFY_AUTHENTICATION_REQUEST });

export const VERIFY_AUTHENTICATION_SUCCESS = 'VERIFY_AUTHENTICATION_SUCCESS';
const verifyAuthenticationSuccess = user => ({ type: VERIFY_AUTHENTICATION_SUCCESS, user });

export const VERIFY_AUTHENTICATION_FAILURE = 'VERIFY_AUTHENTICATION_FAILURE';
const verifyAuthenticationFailure = () => ({ type: VERIFY_AUTHENTICATION_FAILURE });

export const verifyAuthentication = () => dispatch => {
    dispatch(verifyAuthenticationRequest());
    return new Promise((resolve, reject) => {
        api.get('/auth', (err, res) => {
            if (err) {
                dispatch(verifyAuthenticationFailure());
                return reject(err);
            }

            dispatch(verifyAuthenticationSuccess(res.user));
            return resolve(res);
        });
    });
};

//
// Edit user information, saving changes in the backend
//
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const updateUserSuccess = user => ({ type: UPDATE_USER_SUCCESS, user });

export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
const updateUserFailure = error => ({ type: UPDATE_USER_FAILURE, error });

export const updateUser = values => (dispatch, getState) => {
    dispatch(updateUserRequest());

    let uid = getState().user.id;

    return new Promise((resolve, reject) => {
        api.patch(`/users/${uid}`, values, (err, res) => {
            if (err) {
                dispatch(updateUserFailure(err.message));
                return reject(err);
            }

            dispatch(updateUserSuccess(res.content));
            return resolve(res);
        });
    });
};

//
// Logout the user
//
export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
const logoutUserRequest = () => ({ type: LOGOUT_USER_REQUEST });

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
const logoutUserSuccess = () => ({ type: LOGOUT_USER_SUCCESS });

export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';
const logoutUserError = error => ({ type: LOGOUT_USER_FAILURE, error });

export const logoutUser = cookies => dispatch => {
    dispatch(logoutUserRequest());
    return new Promise((resolve, reject) => {
        cookies.remove('auth', { path: '/' });
        dispatch(logoutUserSuccess());
        resolve();
    });
};
