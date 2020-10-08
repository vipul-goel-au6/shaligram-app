import React, { useEffect } from "react";
import UserPhoto from "./UserPhoto";
import { DeletePost } from "../../../actions/PostActions/DeletePost";
import "../../../styles/Home.css";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import { EditPost } from "../../../actions/PostActions/EditPost";
const PostHeader = ({ post, setPost, postState, user, setPostState, modal }) => {
  const history = useHistory();
  const postref = useRef(null);
  const editpostref = useRef(null);
  const deletepostref = useRef(null);
  useEffect(() => {
    M.Dropdown.init(postref.current);
    M.Modal.init(editpostref.current);
    M.Modal.init(deletepostref.current);
  }, []);

  const editPost = async (e, postId) => {
    e.preventDefault()
    const updatedPost = await EditPost({postId, caption: e.target.caption.value})
    const newPosts = postState.map((post) => {
      if (post._id === updatedPost._id) {
        return updatedPost;
      } else {
        return post;
      }
    });
    setPost && setPost(updatedPost);
    setPostState(newPosts);
    M.Modal.getInstance(editpostref.current).close();
  }

  const deletePost = async (postId) => {
    const deletedPost = await DeletePost({ postId });
    console.log(deletePost);
    const newPosts = postState.filter((post) => {
      return post._id !== deletedPost._id;
    });
    setPostState(newPosts);
    M.Modal.getInstance(deletepostref.current).close();
    modal && M.Modal.getInstance(modal).close();
  };
  return (
    <div className="post-header">
      <UserPhoto
        height="4vmax"
        width="4vmax"
        marginRight="20px"
        src={post.postedby.userDetails.profilePic}
        onClick={() => {
          modal && M.Modal.getInstance(modal).close();
          history.push(`/profile/${post.postedby.userName}`);
        }}
      />
      <h5
        onClick={() => {
          modal && M.Modal.getInstance(modal).close();
          history.push(`/profile/${post.postedby.userName}`);
        }}
        style={{ marginRight: "5vmax !important" }}
      >
        {post.postedby.userName}
      </h5>
      {post.postedby._id === user._id && (
        <>
          <a style={{ marginLeft: "5vmax" }}>
            <i
              ref={postref}
              data-target="post-dropdown"
              className="material-icons dropdown-trigger"
            >
              more_horiz
            </i>
          </a>
          <ul id="post-dropdown" className="dropdown-content postdrop">
            <li className="modal-trigger" data-target="edit-post">
              Edit post
            </li>
            <li className="modal-trigger" data-target="delete-post">
              Delete post
            </li>
          </ul>
        </>
      )}
      {/* edit post modal */}
      <div
        ref={editpostref}
        id="edit-post"
        className="modal"
        style={{ height: "250px", width: "350px" }}
      >
        <div style={{ width: "80%", margin: "auto" }}>
          <h4 style={{ marginTop: "20px" }}>Edit post</h4>
          <form onSubmit={(e)=>editPost(e, post._id)}>
          <input type="text" placeholder="new caption" required name="caption" />
          <button className="btn waves-effect waves-light auth-button #bbdefb blue lighten-1" type="submit">
            Save Changes
          </button>
          </form>
          <div style={{ marginTop: "10px" }}>
            <button
              className="btn waves-effect waves-light auth-button #bbdefb blue lighten-1"
              onClick={() => {
                M.Modal.getInstance(editpostref.current).close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* delete post modal */}

      <div
        ref={deletepostref}
        id="delete-post"
        className="modal"
        style={{ height: "200px", width: "350px" }}
      >
        <div style={{ width: "80%", margin: "auto" }}>
          <h4 style={{ marginTop: "20px" }}>Delete post</h4>
          <h6>Do you want to delete this post ?</h6>
          <button
            className="btn waves-effect waves-light auth-button #bbdefb blue lighten-1"
            onClick={() => deletePost(post._id)}
          >
            {" "}
            Delete
          </button>
          <div style={{ marginTop: "10px" }}>
            <button
              className="btn waves-effect waves-light auth-button #bbdefb blue lighten-1"
              onClick={() => {
                M.Modal.getInstance(deletepostref.current).close();
              }}
            >
              {" "}
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
