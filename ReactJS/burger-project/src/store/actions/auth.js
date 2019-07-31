import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => ({
  type: actionTypes.AUTH_START
})

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: token,
  userId: userId
})

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
})

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')

  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    const API_KEY = 'AIzaSyAnchJ0iXbaUI-8fXm9KbcUsxGF3w6GwPQ'
    let URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    if (!isSignUp) {
      URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    }

    axios
      .post(URL, authData)
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(res.data.idToken, res.data.localId))
        dispatch(checkTimeout(res.data.expiresIn))
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error))
      })
  }
}

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
})

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) dispatch(logout())
    else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))

      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(checkTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      } else dispatch(logout())
    }
  }
}
