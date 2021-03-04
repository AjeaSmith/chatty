import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import socketIO from "socket.io-client";
import axios from "axios";

const SOCKET_URL = "https://chatty-end.herokuapp.com/";
export const ChatContext = createContext();
export const socket = socketIO(SOCKET_URL, { transports: ["websocket"] });
const ChatContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage("name", null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [loggedOutUserName, setloggedOutUserName] = useState(null);
  const [authStatus, setauthStatus] = useLocalStorage("status", false);
  const [selectedUser, setSelectedUser] = useState("");
  const [messages, setMessages] = useState(null);
  function saveUserToLocalStorage(username) {
    setCurrentUser(username);
    setauthStatus(true);
  }
  function logout() {
    setCurrentUser(null);
    setauthStatus(false);
    socket.emit("logout", currentUser);
    window.location = "/";
  }
  function sendMessage(data) {
    socket.emit("send_message", data);
    console.log(data);
    setMessages((prev) => [...prev, data]);
  }
  useEffect(() => {
    socket.on("received_username", (data) => {
      setOnlineUsers(Object.keys(data));
    });
    socket.on("user_logged_out", (data) => {
      setloggedOutUserName(data);
    });
    socket.on("message_received", (data) => {
      setMessages((prev) => [...prev, data]);
      console.log(data);
    });
  }, []);
  return (
    <ChatContext.Provider
      value={{
        currentUser,
        saveUserToLocalStorage,
        socket,
        logout,
        authStatus,
        onlineUsers,
        loggedOutUserName,
        setloggedOutUserName,
        setSelectedUser,
        selectedUser,
        sendMessage,
        setMessages,
        messages,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatContextProvider;
