import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/CreatePost.css";
import { CreatePost } from "../actions/PostActions/CreatePost";

const CreatePOST = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [postfile, setPostFile] = useState("");

  const PostDetails = async () => {
    try {
      setIsLoading(true);
      const form_data = new FormData();
      form_data.append("mediafiles", postfile);
      form_data.append("caption", caption);
      await CreatePost(form_data);
      setIsLoading(false);
      !isLoading && history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return !isLoading ? (
    <div className="card input-field post-input create-post">
      <h4>Add a Post</h4>
      <form action="submit" encType="multipart/form-data">
        <div className="input-field">
          <input
            type="text"
            name="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <label className="auth-label" htmlFor="caption">
            Caption
          </label>
        </div>

        <div className="file-field input-field">
          <div className="btn #0288d1 light-blue darken-2">
            <span>Upload</span>
            <input
              type="file"
              name="mediafiles"
              onChange={(e) => setPostFile(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light #0288d1 light-blue darken-2"
          onClick={PostDetails}
        >
          Submit Post
        </button>
      </form>
    </div>
  ) : (
    <>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
      <h5 style={{ textAlign: "center" }}>Uploading, please wait</h5>
    </>
  );
};

export default CreatePOST;
