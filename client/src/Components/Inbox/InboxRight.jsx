import React from "react";
import "../../styles/Inbox/InboxRight.css";
import UserPhoto from "../Home/Posts/UserPhoto";

const InboxRight = ({
  chats,
  recieverId,
  messages,
  message,
  sendMessage,
  handleChange,
  myId,
}) => {
  return (
    <div className="inbox_right">
     <div className="right-header">
     {chats.map((chat) => chat._id === recieverId && (
          <a
          style={{display:"flex",alignItems:"center",marginLeft:"20px"}}
            key={chat._id}
            className="collection-item"
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
      <div className="chat_container">
        {messages.map((message, index) => {
          if (message.from === myId) {
            return (
              <div className="my_chat_row" key={index}>
                <div className="chip">{message.body}</div>
              </div>
            );
          } else if (message.from === recieverId) {
            return (
              <div className="partner_chat_row" key={index}>
                <div className="chip">{message.body}</div>
              </div>
              
            );
          }
        })}
      </div>
      <form onSubmit={(e) => sendMessage(e)} className="chat_form">
        <input
          value={message}
          onChange={handleChange}
          placeholder="Message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default InboxRight;