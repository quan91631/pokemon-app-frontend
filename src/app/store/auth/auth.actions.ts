import { createAction, props } from '@ngrx/store';
import { LoginRequest, AuthResponse, SignupRequest } from 'src/app/types/auth';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: AuthResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const signup = createAction(
  '[Auth] Signup',
  props<{ userData: SignupRequest }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ response: AuthResponse }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
