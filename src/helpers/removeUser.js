export const removeUserFromLocalStorage = (name, userArray, callback) => {
  const userToRemove = userArray.filter((item) => item.user !== name);
  // const userToRemove = userArray.find((item) => item.user === name);
  // localStorage.removeItem("")
  callback(userToRemove);
};
