import Axios from "axios";
import {
  BLOG_DETAILS,
  BLOG_DETAILS_FAIL,
  BLOG_FAIL,
  BLOG_REQUEST,
  CREATE,
  CREATE_FAIL,
  CREATE_REQUEST,
  DELETE_POST,
  DETAILS_REQUEST,
  FETCH_ALL,
  LIEKD_COUNT,
  MY_POST,
  MY_POST_FAIL,
  MY_POST_REQUEST,
  SEARCH_POST,
  SEARCH_POST_FAIL,
  UPDATE_BLOG,
} from "../Constants/ActionConstant";
import * as api from "./api.js";

export const getPost = (page) => async (dispatch) => {
  dispatch({ type: BLOG_REQUEST });
  try {
    const { data } = await Axios.get(`/api/posts?page=${page}`);

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (err) {
    dispatch({ type: BLOG_FAIL, payload: err.message });
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await Axios.get(
      `/api/posts/search?searchQuery=${searchQuery || "none"}`
    );
    dispatch({ type: SEARCH_POST, payload: data });
    console.log(data);
  } catch (err) {
    dispatch({ type: SEARCH_POST_FAIL, payload: err.message });
  }
};

export const createPost = (post) => async (dispatch) => {
  dispatch({ type: CREATE_REQUEST });
  try {
    const user = JSON.parse(localStorage.getItem("profile")).token;
    console.log(user);
    const { data } = await Axios.post(`/api/posts/createPost/`, post, {
      headers: { Authorization: `Bearer ${user}` },
    });
    dispatch({ type: CREATE, payload: data });
  } catch (err) {
    dispatch({ type: CREATE_FAIL, payload: err.message });
  }
};

export const getPostDetails = (BlogId) => async (dispatch) => {
  dispatch({ type: DETAILS_REQUEST, payload: BlogId });
  try {
    const { data } = await Axios.get(`/api/posts/${BlogId}`);

    dispatch({ type: BLOG_DETAILS, payload: data });
  } catch (err) {
    dispatch({ type: BLOG_DETAILS_FAIL, payload: err.message });
  }
};

export const updatePostDetails = (id, post) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("profile")).token;
    const { data } = await Axios.patch(`/api/posts/${id}`, post, {
      headers: { Authorization: `Bearer ${user}` },
    });

    dispatch({ type: UPDATE_BLOG, payload: data });
  } catch (err) {
    dispatch({ type: BLOG_FAIL, payload: err.message });
  }
};

export const deletePostDetails = (id) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("profile")).token;
    await Axios.delete(`/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${user}` },
    });

    dispatch({ type: DELETE_POST, payload: id });
  } catch (err) {
    dispatch({ type: BLOG_FAIL, payload: err.message });
  }
};

export const UpdateLike = (id, post) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("profile")).token;
    const { data } = await Axios.patch(`/api/posts/${id}/likePost`, post, {
      headers: { Authorization: `Bearer ${user}` },
    });

    dispatch({ type: UPDATE_BLOG, payload: data });
  } catch (err) {
    dispatch({ type: BLOG_FAIL, payload: err.message });
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIEKD_COUNT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const GetMyPosts = (id) => async (dispatch) => {
  dispatch({ type: MY_POST_REQUEST });
  try {
    const user = JSON.parse(localStorage.getItem("profile")).token;
    const { data } = await Axios.patch(`/api/posts/GetMyPost/${id}`);

    console.log(data);

    dispatch({ type: MY_POST, payload: data });
  } catch (err) {
    dispatch({ type: MY_POST_FAIL, payload: err.message });
  }
};
