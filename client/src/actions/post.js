import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

//Get posts
//@route GET api/posts

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    // console.log(res);
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//@route GET api/posts/:id

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    // console.log(res);
    dispatch({ type: GET_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//PUT api/posts/like/:id
//@route GET api/posts

export const addLikes = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    // console.log(res);
    dispatch({ type: UPDATE_LIKES, payload: { id: postId, likes: res.data } });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//@route PUT api/posts/unlike:id

export const removeLikes = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    // console.log(res);
    dispatch({ type: UPDATE_LIKES, payload: { id: postId, likes: res.data } });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//@route DELETE api/posts/:id
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    //send id so to wnow how to filter into reducer
    dispatch({ type: DELETE_POST, payload: { id: postId } });
    dispatch(setAlert("Post removed", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//@route POST api/posts
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/posts`, formData, config);
    // console.log(res);
    //send id so to wnow how to filter into reducer
    dispatch({ type: ADD_POST, payload: res.data });
    dispatch(setAlert("Post added", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//@route POST api/posts/comment/:id
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    console.log(res.data);
    //send id so to wnow how to filter into reducer
    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(setAlert("Comment added", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//@route DELETE api/posts/comment/:id/:comment_id
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    // console.log(res);
    //send id so to wnow how to filter into reducer
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment deleted", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
