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
  UPDATE_BLOG,
} from "../Constants/ActionConstant";

export const PostReducer = (
  state = { loading: true, posts: [], error: null },
  action
) => {
  switch (action.type) {
    case BLOG_REQUEST:
      return { loading: true, posts: [] };
    case FETCH_ALL:
      return {
        loading: false,

        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case SEARCH_POST:
      return { loading: false, posts: action.payload };

    case UPDATE_BLOG:
    case LIEKD_COUNT:
      return {
        ...state.posts,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case DELETE_POST:
      return {
        ...state.posts,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };

    case BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const CreatePostReducer = (
  state = { loading: true, posts: [] },
  action
) => {
  switch (action.type) {
    case CREATE_REQUEST:
      return { loading: true, posts: [] };
    case CREATE:
      return { loading: false, ...state.posts, post: action.payload };
    case CREATE_FAIL:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};

export const PostDetailsReducer = (
  state = { loading: true, postDetails: {} },
  action
) => {
  switch (action.type) {
    case DETAILS_REQUEST:
      return { loading: true };
    case BLOG_DETAILS:
      return { loading: false, postDetails: action.payload };
    case BLOG_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const GetMyPostsReducer = (
  state = { loading: true, posts: [], err: null },
  action
) => {
  switch (action.type) {
    case MY_POST_REQUEST:
      return { loading: true, posts: [] };
    case MY_POST:
      return { loading: false, posts: action.payload };
    case MY_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
