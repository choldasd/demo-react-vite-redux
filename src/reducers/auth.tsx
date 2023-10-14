import { authType } from "../actions/type";
import * as StorageService from "../services/storage.service"

const user = StorageService.getObject("authUser");

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

function authenticate(state = initialState, action:any) {
  const { type, payload } = action;
  switch (type) {
    case authType.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case authType.FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case authType.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}

export default authenticate;
