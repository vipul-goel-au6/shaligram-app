import React, { useState, useRef, useEffect } from "react";
import PostHeader from "./Posts/PostHeader";
import PostFile from "./Posts/PostFile";
import PostLike from "./Posts/PostLike";
import MapComment from "./Posts/MapComment";
import "../../styles/Home.css";
import M from "materialize-css";
import AddComment from "./Posts/AddComment";
import ShowCommentsButton from "./Posts/ShowCommentsButton";
import CommentIcon from "./Posts/CommentIcon";

const Posts = ({ postState, user, setPostState }) => {
  const [showComments, setShowComments] = useState(false);

  const likesRef = useRef(null)

  useEffect(()=>{
    M.Modal.init(likesRef.current)
  },[])

  return (
    <div>
      {postState ? (
        postState.map((post) => (
          <div key={post._id} className="card posts-card">
            <PostHeader
              post={post}
              postState={postState}
              user={user}
              setPostState={setPostState}
            />
            <PostFile
              post={post}
              postState={postState}
              user={user}
              setPostState={setPostState}
            />
            <div className="likecomment">
              <PostLike
                post={post}
                postState={postState}
                user={user}
                setPostState={setPostState}
              />
              <CommentIcon />
            </div>
            <div
              style={{
                marginLeft: "20px",
                display: "flex",
                flexDirection: "column",
                fontWeight: "bold",
              }}
            >
              <span className="modal-trigger" data-target="likes-modal" style={{ fontWeight: "bold", marginLeft: "20px" }}>{post.likes ? post.likes.length : 0} likes</span>
              <span># {post.caption}</span>
            </div>
            {post.comments.length !== 0 && <button
              style={{
                border: "none",
                background: "none",
                color: "#405de6",
                marginLeft: "15px",
              }}
              onClick={() => setShowComments(!showComments)}
            >
              {showComments ? "Hide Comments" : `View all ${post.comments.length} comments`}
            </button>}
            {showComments && (
              <MapComment
                post={post}
                postState={postState}
                user={user}
                setPostState={setPostState}
              />
            )}
            <AddComment
              post={post}
              postState={postState}
              user={user}
              setPostState={setPostState}
            />
          </div>
        ))
      ) : (
        <div>No posts yet</div>
      )}
      <div ref={likesRef} id="likes-modal" className="modal">

      </div>
    </div>
  );
};

export default Posts;
