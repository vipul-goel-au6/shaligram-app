import React from "react";
import UserPhoto from "./UserPhoto";

const MapComment = ({ post }) => {console.log(post.comments)
  return (
    <>
      {post.comments.map((comment) => (
        <div style={{display:"flex",alignItems:"center",marginLeft: "20px" ,marginTop:"8px",marginBottom:"8px"}}>
          <UserPhoto
            src={comment.postedby.userDetails.profilePic}
            height= "3vmax" width="3vmax"
          />
          <h6>
            <span
              style={{
                fontWeight: "bold",
                margin: "auto 10px"
              }}
            >
              {comment.postedby.name}
            </span>
            {comment.text}
          </h6>
        </div>
      ))}
    </>
  );
};

export default MapComment;
