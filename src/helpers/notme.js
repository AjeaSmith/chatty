export const notMe = (data, username) => {
  const notMeUsers = data
    ? data.filter((item) => item !== username)
    : null;
  return notMeUsers;
};
