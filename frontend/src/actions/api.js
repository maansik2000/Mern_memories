import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const fetchPostsBySearch = (searchQuery) =>
  axios.get(`/api/posts/search?searchQuery=${searchQuery.search || "none"}`);
