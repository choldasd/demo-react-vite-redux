import { StorageService } from "./";
import store from "../store";

const ALL_ROLE:any = ['user','admin'];
const USER_ROLE:any = ['user'];
const ADMIN_ROLE:any = ['admin'];

const apiBaseUrl = () => {
  return import.meta.env.VITE_APP_API_URL;
};

const appBaseUrl = () => {
  return import.meta.env.VITE_APP_BASE_URL;
};

const authorizationToken = () => {
  let _auth = StorageService.getObject("authUser");
  let _token = null;
  try {
    _token = _auth["token"];
  } catch (error) {
    _token = null;
  }

  return "Bearer " + _token;
};

const authUser = () => {
  let _auth = StorageService.getObject("authUser");
  return _auth;
};

const IsLoginStatus = () => {
  const state = store.getState();
  if (state.auth != null && state.auth.user != null) {
    let status = false;
    if (state.auth.user) {
      status = true;
    }
    return status;
  }
  return false;
};

export {
    apiBaseUrl,
    appBaseUrl,
    authorizationToken,
    authUser,
    IsLoginStatus,
    ALL_ROLE,
    USER_ROLE,
    ADMIN_ROLE,
};