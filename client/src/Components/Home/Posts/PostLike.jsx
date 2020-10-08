import React from "react";
import "../../../styles/Home.css";
import { LikeUnlikePost } from "../../../actions/PostActions/LikeUnlike";
import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";

const PostLike = ({ post, setPost, postState, setPostState }) => {
  const {user} = useContext(UserContext)
  const handleLikeUnlike = async (postId, mode) => {
    const updatedPost = await LikeUnlikePost({ postId, mode });
    const newPosts = postState.map((post) => {
      if (post._id === updatedPost._id) {
        return updatedPost;
      } else {
        return post;
      }
    });
    setPost && setPost(updatedPost);
    setPostState(newPosts);
  };
  return post.likes.includes(user.user._id) ? (
    <>
      <div className="likes" > 
        <i
          className="material-icons small red-text" 
          onClick={() => handleLikeUnlike(post._id, "unlike")}
        >
          favorite
        </i>
      </div>
    </>
  ) : (
        <i
          className="material-icons small"
          onClick={() => handleLikeUnlike(post._id, "like")}
        >
          favorite_border
        </i>

  );
};

export default PostLike;