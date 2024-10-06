import React, { useState } from "react";
import PropTypes from "prop-types";
import storage from "../services/storage";
import { Link } from "react-router-dom";
const Blog = ({ blog }) => {

  const nameOfUser = blog.user ? blog.user.name : "anonymous";

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: "#b2bbc5",
  };

  const canRemove = blog.user ? blog.user.username === storage.me() : true;

  console.log(blog.user, storage.me(), canRemove);

  return (
    <div style={style} className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object,
  }).isRequired,
  handleVote: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
