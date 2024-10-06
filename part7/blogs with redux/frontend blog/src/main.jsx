import ReactDOM from "react-dom/client";
import App from "./App";
import notiReducer from "./reducers/NotificationReducer";
import BlogReducer from "./reducers/BlogsReducer";
import UserReducer from './reducers/UserReducer'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    notifications: notiReducer,
    blogs: BlogReducer,
    users: UserReducer
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
