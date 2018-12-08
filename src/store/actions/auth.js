import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const setAuthRedirectTo = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const logOut = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logOutSucess = () => {
    return { type: actionTypes.AUTH_LOGOUT }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.ATUH_CHECK_TIMETOUT,
        expirationTime: expirationTime
    }
}

export const auth = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignUp: isSignUp
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}