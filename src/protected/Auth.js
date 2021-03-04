import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const { authStatus } = useContext(ChatContext);
  console.log(authStatus);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authStatus) {
          return <Component {...props} {...rest} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};
export default ProtectedRoute;
