import React from "react";
import "../../styles/Inbox/InboxLeft.css";
import { useHistory } from "react-router-dom";
import UserPhoto from "../Home/Posts/UserPhoto";

const InboxLeft = ({ chats }) => {
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/chat/${id}`);
  };
  console.log(chats);
  return (
    <div>
      <div className="inbox_header">Direct</div>
      <div className="collection">
        {chats.map((chat) => (
          <a
          style={{display:"flex",alignItems:"center"}}
            key={chat._id}
            className="collection-item"
            onClick={() => handleClick(chat._id)}
          >
            <UserPhoto
              src={chat.userDetails.profilePic}
              alt="profile-pic"
              height="50px"
              width="50px"
            />
            <h6 style={{marginLeft:"20px"}}>{chat.name}</h6>  
          </a>
        ))}
      </div>
    </div>
  );
};

export default InboxLeft;