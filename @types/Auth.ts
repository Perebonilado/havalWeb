export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  username: string;
  profilePicture: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isMerchant?: boolean;
}

export interface SignupResponse {
  profilePicture: string;
  message: string;
  token: string;
  username: string;
}
