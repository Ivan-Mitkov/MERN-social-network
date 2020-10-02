import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostsArray from "./PostsArray";
import PostForm from "./PostForm";
const Posts = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.post, shallowEqual);
  const { posts, loading } = postsState;

  useEffect(() => {
    dispatch(getPosts());
    console.log("useEffect posts");
    //eslint-disable-next-line
  }, [loading]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm />
      <PostsArray posts={posts} />
    </Fragment>
  );
};

export default Posts;
