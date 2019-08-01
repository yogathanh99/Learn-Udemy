import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer test', () => {
  it('should render init state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })

  it('should store the token login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/'
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: 'some-token',
          userId: 'some-userid'
        }
      )
    ).toEqual({
      token: 'some-token',
      userId: 'some-userid',
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })
})
