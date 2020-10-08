import React, { useContext, useState, useRef, useEffect } from "react";
import "../styles/Inbox/Inbox.css";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import InboxLeft from "../Components/Inbox/InboxLeft";
import InboxRight from "../Components/Inbox/InboxRight";
import { GetChats } from "../actions/socketActions/GetChats";
import { GetActiveChats } from "../actions/socketActions/GetActiveChats";

const Inbox = () => {
  const { user } = useContext(UserContext);

  const [myId, setMyId] = useState();
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef();

  const recieverId = useParams().userId;

  useEffect(() => {
    setMyId(user.user._id);
    socketRef.current = io.connect(`/`, {
      query: `user=${user.user._id}`,
    });
    socketRef.current.on("message", ({ name, _doc, ...rest }) => {
      recievedChats(_doc.name, _doc.userDetails.profilePic, rest.from);
      setMessages((oldmessages) => [...oldmessages, { ...rest }]);
    });
    GetActiveChats().then((chats) => setChats(chats));
    if (recieverId) {
      GetChats(recieverId).then(({ messages, data }) => {
        console.log(messages, data);
        recievedChats(data.name, data.userDetails.profilePic);
        setMessages(messages);
      });
    }
  }, []);

  const recievedChats = (name, profilePic, id = recieverId) => {
    const isOldChat = chats.some((chat) => {
      return chat._id === id;
    });
    if (!isOldChat) {
      setChats((oldChats) => [
        ...oldChats,
        {
          _id: id,
          name: name,
          userDetails: { profilePic },
        },
      ]);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const messageObj = {
      body: message,
      to: recieverId,
      from: myId,
    };
    setMessages((oldmessages) => [...oldmessages, messageObj]);
    setMessage("");
    socketRef.current.emit("send message", messageObj);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  console.log(messages, chats, myId);
  return (
    <div className="inbox_page">
      <div className="inbox_left">
        <InboxLeft chats={chats} />
      </div>

      {!recieverId ? (
        <div className="inbox-right">
          <div className="chat_logo">
            <i className="medium material-icons">send</i>
          </div>
          <h5>Your Messages</h5>
          <span style={{ color: "#8e8e8e" }}>
            Send private messages to a friend
          </span>
        </div>
      ) : (
        <InboxRight
          chats={chats}
          recieverId={recieverId}
          messages={messages}
          message={message}
          sendMessage={sendMessage}
          handleChange={handleChange}
          myId={myId}
        />
      )}
    </div>
  );
};

export default Inbox;