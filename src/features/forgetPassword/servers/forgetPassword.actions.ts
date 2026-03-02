import axios, { AxiosRequestConfig } from 'axios';
import { 
  ForgotPasswordRequest, 
  VerifyCodeRequest, 
  ResetPasswordRequest 
} from '../types/forgetPasswordType';


export const forgotPassword = async (data: ForgotPasswordRequest) => {
 try {
    const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        method: "POST",
        data: data 
    }
    const { data: responseData } = await axios.request(options);
    return responseData;
 } catch (error) {
    throw error;
 }
};

export const verifyResetCode = async (data: VerifyCodeRequest) => {
   try {
    const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        method: "POST",
        data: data 
    }
    const { data: responseData } = await axios.request(options);
    return responseData;
 } catch (error) {
    throw error;
 }
};


export const resetPassword = async (data: ResetPasswordRequest) => {
  try {
    const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        method: "PUT",
        data: {
          email: data.email,
          newPassword: data.newPassword 
        }
    }
    const { data: responseData } = await axios.request(options);
    return responseData;
 } catch (error) {
    throw error;
 }
};