import React, { createContext, useContext, useState } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children, initialBlogs = [] }) => {
  const [blogs, setBlogs] = useState(initialBlogs);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};
export const useBlogContext = () => useContext(BlogContext);
