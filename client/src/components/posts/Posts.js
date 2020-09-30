import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post";
const Posts = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.post);
  const { posts, loading } = postsState;
  useEffect(() => {
    dispatch(getPosts());
    // console.log("Use Effect posts");
  }, [getPosts]);
  return <div>POSTS</div>;
};

export default Posts;
