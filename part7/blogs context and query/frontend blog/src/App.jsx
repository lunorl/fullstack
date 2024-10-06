import { useState, useEffect, createRef, useContext } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";
import storage from "./services/storage";
import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import notiContext, {
  NotificationContextProvider,
  tempNoti,
} from "./reducers/notificationReducer";
import blogContext from "./reducers/blogsReducer";
import userContext from "./reducers/userReducer";

const App = () => {
  const [notification, dispatch] = useContext(notiContext);
  const [blogs, dispatchBlogs] = useContext(blogContext);
  const [user, dispatchUsers] = useContext(userContext);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogsers) => dispatchBlogs({ type: "SET", payload: blogsers }));
  }, []);

  useEffect(() => {
    const usere = storage.loadUser();
    if (user) {
      dispatchUsers({ type: "LOGIN", payload: usere });
    }
  }, []);

  const blogFormRef = createRef();

  const notify = (message, type = "success") => {
    const notifunct = tempNoti(dispatch);
    notifunct(message, type);
  };

  const handleLogin = async (credentials) => {
    try {
      const usere = await loginService.login(credentials);
      await dispatchUsers({ type: "LOGIN", payload: usere });
      storage.saveUser(usere);
      notify(`Welcome back, ${usere.name}`);
    } catch (error) {
      console.log(error)
      notify("Wrong credentials", "error");
    }
  };

  const handleCreate = async (blog) => {
    const newBlog = await blogService.create(blog);
    await dispatchBlogs({ type: "ADD", payload: newBlog });
    notify(`Blog created: ${newBlog.title}, ${newBlog.author}`);
    blogFormRef.current.toggleVisibility();
  };

  const handleVote = async (blog) => {
    console.log("updating", blog);
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });

    notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`);
    await dispatchBlogs({ type: "LIKE", payload: blog });
  };

  const handleLogout = () => {
    dispatchUsers({ type: "LOGOUT" });
    storage.removeUser();
    notify(`Bye, ${user.name}!`);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      await dispatchBlogs({ type: "REMOVE", payload: blog });
      notify(`Blog ${blog.title}, by ${blog.author} removed`);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {blogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
