import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";

import { getPost } from "../../actions/post";

const Post = (props) => {
  // console.log(post, loading);
  // console.log(props)
  const {
    getPost,
    post: { post, loading },
    match,
  } = props;
  useEffect(() => {
    getPost(match.params.id);
    console.log("use effect POST");
  }, [getPost, match.params.id, loading]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
