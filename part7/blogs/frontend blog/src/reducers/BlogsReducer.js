import { createSlice } from "@reduxjs/toolkit";

const BlogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      console.log("payl", action.payload);
      return action.payload;
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
    likeBlog(state, action) {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, likes: action.payload.likes + 1 }
          : item
      );
    },
    deleteBlog(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});
export const { setBlogs, addBlog, likeBlog, deleteBlog } = BlogReducer.actions;
export default BlogReducer.reducer;
