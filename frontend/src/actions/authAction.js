import Axios from "axios";
import {
  AUTH,
  AUTH_ERROR,
  UPDATE_BLOG,
  UPDATE_PROFILE,
} from "../Constants/ActionConstant";

export const signin = (formdata, history) => async (dispatch) => {
  try {
    const { data } = await Axios.post(`/user/signin`, formdata);

    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: AUTH_ERROR, err });
  }
};

export const signUp = (formdata, history) => async (dispatch) => {
  try {
    const { data } = await Axios.post(`/user/signup`, formdata);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: AUTH_ERROR, err });
  }
};

export const updateProfile = (id, post) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("profile")).token;
    const { data } = await Axios.patch(`/user/updateProfile/${id}`, post, {
      headers: { Authorization: `Bearer ${user}` },
    });
    console.log(data);
    dispatch({ type: UPDATE_PROFILE, data });
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: AUTH_ERROR, err });
  }
};
