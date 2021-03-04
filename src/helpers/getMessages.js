import axios from "axios";
export const getMessages = (from, to, callback) => {
  axios
    .post(
      "https://chatty-end.herokuapp.com/get_messages",
      {
        from: from,
        to: to,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log("the message data", res.data);
      callback(res.data);
      //   setMessages(res.data);
    });
};
