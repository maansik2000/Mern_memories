import {
  AUTH,
  AUTH_ERROR,
  LOGOUT,
  UPDATE_PROFILE,
} from "../Constants/ActionConstant";

export const authReducer = (state = { authData: {}, err: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    case UPDATE_PROFILE:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case AUTH_ERROR:
      return { ...state, err: action.err };
    default:
      return state;
  }
};
