import axios from "axios";

const API = axios.create({ baseURL: "https://mern-memories-d3xy.vercel.app/" });
const baseURL = "https://mern-memories-d3xy.vercel.app";

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const likePost = (id) => axios.patch(`${baseURL}/posts/${id}/likePost`);
export const fetchPostsBySearch = (searchQuery) =>
  axios.get(
    `${baseURL}/api/posts/search?searchQuery=${searchQuery.search || "none"}`
  );
