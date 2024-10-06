import { useReducer, createContext, useContext } from "react";
export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW":
      return action.payload;
    case "REMOVE":
      return [null, null];
    default:
      return state;
  }
};
export const tempNoti = (dispatch) => (message, type) => {
  dispatch({ type: "NEW", payload: { message, type } });
  setTimeout(() => {
    dispatch({ type: "REMOVE" });
  }, 5000);
};
const notiContext = createContext();
export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );
  return (
    <notiContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </notiContext.Provider>
  );
};
export default notiContext;
