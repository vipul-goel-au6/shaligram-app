import React from "react";
import { PostComment } from "../../../actions/PostActions/Comments";

const AddComment = ({ post, postState, setPostState }) => {
  const handleComment = async (postId, text) => {
    const updatedPost = await PostComment({ postId, text });
    const newPosts = postState.map((post) => {
      if (post._id === updatedPost._id) {
        return updatedPost;
      } else {
        return post;
      }
    });
    setPostState(newPosts);
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleComment(post._id, e.target[0].value);
        }}
      >
        <input type="text" placeholder="add a comment" />
      </form>
    </div>
  );
};

export default AddComment;
