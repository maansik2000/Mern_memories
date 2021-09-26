import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth";

import {
  CreatePostReducer,
  GetMyPostsReducer,
  PostDetailsReducer,
  PostReducer,
} from "./reducers/PostReducer";

const reducers = combineReducers({
  post: PostReducer,
  postDetails: PostDetailsReducer,
  createPost: CreatePostReducer,
  authReducer: authReducer,
  GetMyPost: GetMyPostsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,

  composeEnhancer(applyMiddleware(thunk))
);

export default store;
