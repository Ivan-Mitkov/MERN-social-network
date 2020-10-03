import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(postId, { text }));
    setText("");
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment the post"
          value={text}
          onChange={handleChange}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
