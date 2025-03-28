export interface registerInput {
  email: string;
  password: string;
  name: string;
}

export interface loginInput {
  email: string;
  password: string;
}

export interface ValidatorOutput {
  __typename: string;
  code: string;
  message: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
}

export interface LoginSuccessResult {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginErrorResult {
  error: {
    code: string;
    message: string;
  };
}
