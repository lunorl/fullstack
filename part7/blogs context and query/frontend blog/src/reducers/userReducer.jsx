import { createContext, useReducer } from "react";
export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
  }
};
const userContext = createContext();
export const UserProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);
  return <userContext.Provider value={[user, userDispatch]}>{props.children}</userContext.Provider>;
};
export default userContext;
