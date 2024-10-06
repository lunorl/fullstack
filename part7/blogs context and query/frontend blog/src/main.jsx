import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./reducers/notificationReducer";
import { BlogsProvider } from "./reducers/blogsReducer";
import { UserProvider } from "./reducers/userReducer";
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
  <BlogsProvider>
  <NotificationContextProvider>
    <App />
  </NotificationContextProvider>
  </BlogsProvider>
  </UserProvider>
);
