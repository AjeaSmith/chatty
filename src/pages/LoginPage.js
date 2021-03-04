import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ChatContext } from "../context/ChatContext";
const LoginPage = ({ history }) => {
  const { register, errors, handleSubmit } = useForm({ mode: "onBlur" });
  const { saveUserToLocalStorage, socket } = useContext(ChatContext);
  const onSubmitForm = (formData) => {
    socket.emit("user_connected", {
      name: formData.username,
    });
    saveUserToLocalStorage(formData.username);
    history.push(`/chat/${formData.username}`);
  };
  return (
    <section className="h-screen flex justify-center items-center font-mono rounded-md">
      <div className="flex items-center justify-center flex-col bg-gray-100 w-96 lg:w-auto h-auto p-5 rounded-sm shadow-md">
        <h2 className="mb-3 text-2xl font-medium uppercase text-black tracking-wider">
          Login
        </h2>
        <form
          className="flex flex-col w-80 lg:w-96"
          onSubmit={handleSubmit(onSubmitForm)}>
          {errors.username ? (
            <label
              htmlFor="username"
              className="text-red-700 mb-1 tracking-wide">
              {errors.username.message}
            </label>
          ) : (
            <label htmlFor="username" className="text-black mb-1 tracking-wide">
              Username
            </label>
          )}
          <input
            ref={register({
              required: {
                value: true,
                message: "Please enter username",
              },
              minLength: {
                value: 3,
                message: "Please enter at least 5 characters",
              },
            })}
            id="username"
            type="text"
            name="username"
            placeholder="e.g., John Doe"
            className="p-2 mb-6 rounded-sm shadow border border-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gray-900 text-white p-2 rounded-sm hover:bg-gray-700">
            Log In
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
