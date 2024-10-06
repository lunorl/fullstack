import axios from "axios";
const KEY = "blogUserKey";

const saveUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user));
};

const loadUser = () => {
  const user = localStorage.getItem(KEY);
  return user ? JSON.parse(user) : null;
};

const me = () => {
  const user = loadUser();
  return user ? user.username : null;
};
export const getUsers = async () => {
  console.log("mmmmsmdms");
  const users = await axios.get("/api/users");
  console.log("people", users);
  return users.data;
};

const removeUser = () => {
  localStorage.removeItem(KEY);
};

export default { saveUser, loadUser, removeUser, me };
