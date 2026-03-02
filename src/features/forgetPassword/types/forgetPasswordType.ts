export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyCodeRequest {
  resetCode: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface AuthResponse {
  statusMsg?: string;
  message?: string;
  token?: string;
}