import React from "react";
import "../../../styles/Home.css";

const UserPhoto = ({ onClick, src, ...restProps }) => {
  return (
    <div style={{ ...restProps }} onClick={onClick}>
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: "1px solid grey",
        }}
      ></img>
    </div>
  )
};

export default UserPhoto;
