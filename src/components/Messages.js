import React, { useContext } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
const Messages = () => {
  const { messages } = useContext(ChatContext);
  return (
    <ScrollToBottom className="overflow-auto flex-auto py-5%">
      {!messages ? (
        <p>No messages to show</p>
      ) : (
        messages.map((message) => {
          return <Message message={message} key={message._id} />;
        })
      )}
    </ScrollToBottom>
  );
};

export default Messages;
