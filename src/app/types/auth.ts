export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}
