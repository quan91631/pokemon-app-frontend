export interface AuthState {
  isLoggedIn: boolean;
  user: any;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};
