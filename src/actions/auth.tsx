import { StorageService } from "../services";
import { authType } from "./type";
import {Dispatch} from "redux"

export const login = (_authUser:any) => async (dispatch: Dispatch) => {
  try {
    console.log("_authUser ",_authUser)
    StorageService.setObject("authUser", _authUser);
    dispatch({
      type: authType.SUCCESS,
      payload: { 
        user: _authUser },
    });

  } catch (error) {
    dispatch({
      type: authType.FAILURE,
    });
    return Promise.reject(error);
  }
};

export const logout = () => (dispatch: Dispatch) => {
    try {
      StorageService.purgeData("authUser");
      dispatch({
        type: authType.LOGOUT,
      });
      
    } catch (error) {
      dispatch({
        type: authType.FAILURE,
      });
    }
  };
  