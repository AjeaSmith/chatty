import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
const Message = ({ message, key }) => {
  const { currentUser } = useContext(ChatContext);
  return (
    <>
      {message.from === currentUser ? (
        <div className="messageContainer justifyEnd mb-3" key={key}>
          <div className="messageBox backgroundBlue">
            <p className="messageText text-white">{message.message}</p>
          </div>
        </div>
      ) : (
        <div className="messageContainer justifyStart mt-3 mb-3">
          <p className="sentText pr-3">
            <img
              src="https://picsum.photos/30"
              alt="user icon"
              className="rounded-full"
            />
          </p>
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{message.message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
