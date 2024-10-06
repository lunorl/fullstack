import { useState, useEffect, createRef, useContext } from "react";
import { Button, TextField, Link } from '@mui/material'
import blogService from "./services/blogs";
import loginService from "./services/login";
import storage, { getUsers } from "./services/storage";
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
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
const User = (users) => {
  const id = useParams().id;
  console.log(users);
  const user = users["users"].find((one) => one.id === id);
  if (!user) {
    return <p>loading...</p>;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h5>added blogs</h5>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};
const Blogging = ({ notify }) => {
  const [blogs, dispatchBlogs] = useContext(blogContext);
  const [word, setWord] = useState("");
  const [comments, setComments] = useState([]);
  const id = useParams().id;
  const blog = blogs.find((i) => i.id === id);
  useEffect(() => {
    if (blog) {
      setComments(blog.comments);
    }
  }, [blog]);
  console.log("blogg", blog);
  const handleVote = async (blog) => {
    console.log("updating", blog);
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`);
    await dispatchBlogs({ type: "LIKE", payload: blog });
  };
  if (!blog) {
    return <p>loading...</p>;
  }
  const send = async (event) => {
    event.preventDefault();
    await blogService.addComment(blog.id, word);
    setComments(comments.concat(word));
    setWord("");
  };
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes{" "}
        <Button variant="contained" onClick={() => handleVote(blog)}>like</Button>
      </p>
      <p>added by {blog.author.name}</p>
      <h3>comments</h3>
      <form onSubmit={send}>
        <TextField
          value={word}
          onChange={(a) => setWord(a.target.value)}
          name="j"
          size='small'
        ></TextField>
        <Button variant="contained" type="submit">add comment</Button>
      </form>
      <ul>
        {comments.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
};
const Blogs = ({ notify, blogFormRef }) => {
  const [blogs, dispatchBlogs] = useContext(blogContext);
  const handleCreate = async (blog) => {
    const newBlog = await blogService.create(blog);
    await dispatchBlogs({ type: "ADD", payload: newBlog });
    notify(`Blog created: ${newBlog.title}, ${newBlog.author}`);
    blogFormRef.current.toggleVisibility();
  };
  const byLikes = (a, b) => b.likes - a.likes;

  console.log("blogs", blogs);
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      await dispatchBlogs({ type: "REMOVE", payload: blog });
      notify(`Blog ${blog.title}, by ${blog.author} removed`);
    }
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
  return (
    <div>
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
const App = () => {
  const [notification, dispatch] = useContext(notiContext);
  const [blogs, dispatchBlogs] = useContext(blogContext);
  const [user, dispatchUsers] = useContext(userContext);
  const [users, setUsers] = useState([]);
  const blogFormRef = createRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogsers) => dispatchBlogs({ type: "SET", payload: blogsers }));
  }, []);

  useEffect(() => {
    const usere = storage.loadUser();
    if (usere) {
      dispatchUsers({ type: "LOGIN", payload: usere });
    }
  }, []);
  useEffect(() => {
    getUsers().then((guys) => setUsers(guys));
  }, []);

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
      console.log(error);
      notify("Wrong credentials", "error");
    }
  };
  const handleLogout = () => {
    dispatchUsers({ type: "LOGOUT" });
    storage.removeUser();
    notify(`Bye, ${user.name}!`);
  };

  const Users = () => {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                <b>blogs created</b>
              </th>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link href={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
  const Grey = styled.div`
    background: lightgray;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2em;
  `;
  const Background = styled.div`
  background: #d6d6d2; /* Change this to your desired color */
  min-height: 100vh; /* Ensure it covers the full height of the viewport */
  display: flex;
  flex-direction: column; /* Optional: if you want to align items in a column */
`;

  return (
    <Background>
    <Router>
      <Grey>
        <Button variant="contained" href="/" size="small" color="primary">blogs</Button> <Button color="primary" variant="contained" size="small" href="/users">users</Button> {user.name}{" "}
         logged in <Button variant="contained" onClick={handleLogout}>logout</Button>
      </Grey>
      <div>
        <h2>blog app</h2>
        <Notification />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User users={users} />} />
          <Route
            path="/blogs/:id"
            element={<Blogging notify={notify} blogs={blogs} />}
          />
          <Route
            path="/"
            element={
              <Blogs notify={notify} blogFormRef={blogFormRef} blogs={blogs} />
            }
          />
        </Routes>
      </div>
    </Router>
    </Background>
  );
};

export default App;
