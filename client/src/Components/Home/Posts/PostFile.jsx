import React, { useContext } from "react";
import "../../../styles/Home.css";
import { LikeUnlikePost } from "../../../actions/PostActions/LikeUnlike";
import { UserContext } from "../../../contexts/userContext";

const PostFile = ({ post, postState, setPostState }) => {
  const { user } = useContext(UserContext);
  const handleLikeUnlike = async (postId, mode) => {
    if (post.likes.includes(user.user._id) && mode === "like") return;
    const updatedPost = await LikeUnlikePost({ postId, mode });
    const newPosts = postState.map((post) => {
      if (post._id === updatedPost._id) {
        return updatedPost;
      } else {
        return post;
      }
    });
    setPostState(newPosts);
  };
  return post.fileUrl.includes(".jpg") || post.fileUrl.includes(".png") ? (
    <div>
    <img
      src={post.fileUrl}
      onDoubleClick={() => handleLikeUnlike(post._id, "like")}
      style={{width:"100%" }}
    />
      <i className="material-icons" style={{position:"absolute",top:"50%",left:"50%",transform: "translate(-50%,-50%) scale(0)"}}>favourite</i>
    </div>
  ) : (
    <div>
      <video style={{ height: "48vh", width: "100%" }} controls>
        <source src={post.fileUrl} />
      </video>
    </div>
  );
};

export default PostFile;
