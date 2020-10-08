import React from "react";
import "../styles/PostPopUp.css";
import PostHeader from "./Home/Posts/PostHeader";
import AddComment from "./Home/Posts/AddComment";
import PostLike from "./Home/Posts/PostLike";
import PostFile from "./Home/Posts/PostFile";
import MapComment from "./Home/Posts/MapComment";
import CommentIcon from "./Home/Posts/CommentIcon";

const PostPopUp = ({ post, posts, user, setPosts, setPost, modal }) => {
  return (
    <div className="horizontal">
      <div className="image">
        <PostFile
          post={post}
          postState={posts}
          user={user}
          setPostState={setPosts}
        />
      </div>
      <div className="hor-content">
        <div id="user-details">
          <PostHeader
            post={post}
            postState={posts}
            user={user}
            setPostState={setPosts}
            modal={modal}
          />
          
        </div>
        <div id="mapComment">
          <MapComment
            post={post}
            postState={posts}
            user={user}
            setPostState={setPosts}
          />
        </div>
        <div id="likecomment">
          <div id="likes">
            <PostLike
              post={post}
              postState={posts}
              user={user}
              setPostState={setPosts}
              setPost={setPost}
            />
            <CommentIcon />
          </div>
          <div className="comments">
            <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
              {post.likes.length} likes
            </span>
            <span style={{ fontWeight: "bold", marginLeft: "30px" }}>
              # {post.caption}
            </span>
            
            <AddComment
              post={post}
              postState={posts}
              user={user}
              setPostState={setPosts}
              setPost={setPost}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPopUp;