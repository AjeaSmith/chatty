import React, { useContext, Fragment, useState } from "react";
import Messages from "../components/Messages";
import Sidebar from "../components/Sidebar";
import { ChatContext } from "../context/ChatContext";
import { RenderAlertMessage } from "../helpers/renderAlert";
import "../style.css";
const ChatPage = () => {
  const {
    loggedOutUserName,
    setloggedOutUserName,
    currentUser,
    sendMessage,
    selectedUser,
  } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  function handleSendMessage(e) {
    e.preventDefault();
    const data = {
      from: currentUser,
      to: selectedUser,
      message: message,
    };
    sendMessage(data);
    setMessage("");
  }
  return (
    <section className="flex flex-col items-center">
      {RenderAlertMessage(currentUser, loggedOutUserName, setloggedOutUserName)}
      <section className="flex justify-center chat-wrapper rounded-md">
        <Sidebar />
        <div className="p-3 h-auto bg-white flex justify-between flex-col chat-message">
          <Messages />
          <section>
            <form className="flex" onSubmit={handleSendMessage}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                name="message"
                placeholder="Enter Message"
                className="message-input mr-2 flex-1 px-4 py-2 outline-none"
              />
              <button type="submit">Send</button>
            </form>
          </section>
        </div>
      </section>
    </section>
  );
};

export default ChatPage;
