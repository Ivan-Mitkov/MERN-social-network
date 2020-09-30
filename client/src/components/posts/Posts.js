import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from './PostItem'
const Posts = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.post);
  const { posts, loading } = postsState;
  useEffect(() => {
    dispatch(getPosts());
    // console.log("Use Effect posts");
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      {/* <PostForm /> */}
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

export default Posts;
