import { axiosService, ResponseService } from "./";
import { 
  LoginData,
  ForgotPasswordData,
  ResetPasswordData
} from "../interfaces";

const login = async (_formData:LoginData) => {
  try {
    let _axiosData = {
      method: "post",
      url: "auth/login",
      isAuthorized: false,
      formData: _formData,
    };

    const response:any = await axiosService.hit(_axiosData);
    return response.data;

  } catch (error:any) {
    return ResponseService.buildFailure(error.message);
  }
};

const logout = async () => {
  try {
    let _axiosData = {
      method: "post",
      url: "auth/logout",
      isAuthorized: true,
    };

    const response:any = await axiosService.hit(_axiosData);
    return response.data;

  } catch (error:any) {
    return ResponseService.buildFailure(error.message);
  }
};

const forgotPassword = async (_formData:ForgotPasswordData) => {
  try {

    let _axiosData = {
      method: "post",
      url: "auth/password/forgot",
      isAuthorized: false,
      formData: _formData,
    };

    const response:any = await axiosService.hit(_axiosData);
    return response.data;

  } catch (error:any) {
    return ResponseService.buildFailure(error.message);
  }
};

const resetPassword = async (_formData:ResetPasswordData) => {
  try {

    let _axiosData = {
      method: "post",
      url: "auth/password/reset",
      isAuthorized: false,
      allowRequestCancellation : false,
      formData: _formData,
    };

    const response:any = await axiosService.hit(_axiosData);
    return response.data;

  } catch(error:any) {
    return ResponseService.buildFailure(error.message);
  }
};

const verifyToken = async (token:any) => {
  try {

    let _axiosData = {
      method: "get",
      url: "auth/password/verify_token/"+ token,
      isAuthorized: false,
    };

    const response:any = await axiosService.hit(_axiosData);
    return response.data;

  } catch(error:any) {
    return ResponseService.buildFailure(error.message);
  }
};

export {
  login,
  logout,
  forgotPassword,
  resetPassword,
  verifyToken
};