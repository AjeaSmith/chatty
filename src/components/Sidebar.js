import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";
import { getMessages } from "../helpers/getMessages";
import { notMe } from "../helpers/notme";
import "../style.css";
const Sidebar = () => {
  const [activeLink, setactiveLink] = useState(null);
  const {
    currentUser,
    logout,
    onlineUsers,
    setSelectedUser,
    setMessages,
  } = useContext(ChatContext);
  const users = notMe(onlineUsers, currentUser);
  const handleActiveLink = (to) => {
    setactiveLink(to);
    setSelectedUser(to);
    getMessages(currentUser, to, setMessages);
  };
  return (
    <section className="sidebar text-black flex flex-col justify-around h-auto w-60">
      <div className="user flex flex-col items-center p-3 text-gray-600">
        <img
          src="https://picsum.photos/50"
          alt="random pic"
          className="rounded-full mb-1"
        />
        <p>{currentUser}</p>
        <span className="flex items-center">
          <div className="w-3 h-3 bg-green-500 mr-1 rounded-full"></div>
          <small>Active</small>
        </span>
      </div>
      <ul className="messages overflow-y-scroll h-60 flex-1 p-0 m-0">
        {!users ? (
          <p className="text-center mt-4">No users</p>
        ) : (
          users.map((item, index) => {
            return (
              <li
                key={index}
                className={`message p-3 text-center ${
                  activeLink === item ? "active" : ""
                }`}
                onClick={() => handleActiveLink(item)}>
                <a>{item}</a>
              </li>
            );
          })
        )}
      </ul>
      <Link
        to="/login"
        onClick={logout}
        className="w-auto bg-gray-800 p-2 text-white text-center font-medium">
        Log out
      </Link>
    </section>
  );
};

export default Sidebar;
