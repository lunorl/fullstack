import { createContext, useReducer } from "react";
export const blogsReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return state.concat(action.payload);
    case "REMOVE":
      return state.filter((one) => one.id !== action.payload.id);
    case "SET":
      return action.payload;
    case "LIKE":
      return state.map((one) =>
        one.id === action.payload.id ? { ...one, likes: one.likes + 1 } : one
      );
    default:
      return state;
  }
};
export const BlogsProvider = (props) => {
  const [blogs, blogDispatch] = useReducer(blogsReducer, []);
  return <blogContext.Provider value={[blogs, blogDispatch]}>{props.children}</blogContext.Provider>;
};
const blogContext = createContext();
export default blogContext;
