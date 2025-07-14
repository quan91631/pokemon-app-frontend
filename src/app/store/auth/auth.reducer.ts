import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, AuthActions.signup, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    AuthActions.loginSuccess,
    AuthActions.signupSuccess,
    (state, { response }) => ({
      ...state,
      isLoggedIn: true,
      user: response.user,
      loading: false,
      error: null,
    })
  ),
  on(
    AuthActions.loginFailure,
    AuthActions.signupFailure,
    (state, { error }) => ({
      ...state,
      isLoggedIn: false,
      user: null,
      loading: false,
      error,
    })
  ),
  on(AuthActions.logout, (state) => ({
    ...state,
    isLoggedIn: false,
    user: null,
    error: null,
  }))
);
