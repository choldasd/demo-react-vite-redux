export interface RequireAuthProps {
  children: any,
  isLoggedIn: boolean,
  allowedRoles: string[] | undefined,
}

export interface LoginData {
  email: string,
  password: string,
}

export interface Token {
  token: string
}

export interface AuthUser {
  userId: number,
  email: string,
  role: string,
  token: string,
  userName: string,
  isActive:number,
}

export interface ForgotPasswordData {
  email:string;
}

export type ResetPasswordFormHandler = {
  password:string,
  confirmPassword: string | undefined
}

export interface ResetPasswordData {
  password:string,
  confirm_password: string | undefined,
  token: string | undefined
}