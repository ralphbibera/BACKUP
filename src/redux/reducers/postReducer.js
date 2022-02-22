import * as types from "../types/postTypes";

const initialState = {
  isLoading: true,
  posts: [],
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_LOADING:
      state = { ...state, isLoading: payload };
      return state;
    case types.ADD_POST:
      state = { ...state, posts: [...state.posts, payload] };
      return state;
    case types.SET_POSTS:
      state = { ...state, posts: payload };
      return state;
    case types.RESET_POST:
      state = { initialState };
      return state;

    case type.ADD_COMMENT:
      const findPost = state.posts.find((pst) => pst.postId === payload.postId);
      const comments = findPost.postData.comments;
      comments.push(payload.comment);
      findPost.postData.comments = comments;
      state = {
        ...state,
        posts: state.posts.map((pt) =>
          pt.postId === payload.postId ? findPost : pt
        ),
      };
      return state;
    default:
      return state;
  }
};

export default postReducer;
