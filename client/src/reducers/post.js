import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  // console.log(state);
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        post: { ...state.post, likes: payload.likes },
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload.id),
        loading: false,
      };
    case ADD_COMMENT:
      // payload is the post not the comments;
      return {
        ...state,
        post: {
          ...payload,
        },
        posts: state.posts.map((post) => {
          if (post._id === state.post._id) {
            return {
              ...payload,
            };
            // return ({...post, post.comments : [...state.post.comments, payload]});
          } else {
            return post;
          }
        }),
        loading: false,
      };

    case REMOVE_COMMENT:
      //payload is comments id
      console.log('remove',payload)
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter((comment) => comment._id !== payload),
        },
        posts: state.posts.map((post) => {
          if (post._id === state.post._id) {
            return {
              ...post,
              comments: post.comments.filter(
                (comment) => comment._id !== payload
              ),
            };
          } else {
            return post;
          }
        }),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
