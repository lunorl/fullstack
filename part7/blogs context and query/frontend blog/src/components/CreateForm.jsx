import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useMaybeContext } from "./MaybeContext";
import { useWordsContext } from "./WordsContext";
import { useBlogContext } from "./BlogContext";
import Togglable from "./Togglable";
import blogServic from "../services/blogs";
import { useUserContext } from "./UserContext";
const CreateForm = ({ blogService = blogServic, test = false }) => {
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const { maybe, setMaybe } = useMaybeContext();
  const { words, setWords } = useWordsContext();
  const { user, setUser } = useUserContext();
  const { blogs, setBlogs } = useBlogContext();

  const handleCreation = async (event) => {
    event.preventDefault();
    console.log("ho");  
    if (user || test) {
      try {
        console.log("ho");
        console.log("what is the initial user", user);
        await blogService.post({ title, author, url, user });
        blogService.getAll().then((blogs) => setBlogs(blogs));
        setWords(`a new blog ${title} by ${author} added`);
        setMaybe(false);
        setTimeout(() => setWords(null), 5000);
        setTitle("");
        setAuthor("");
        setUrl("");
      } catch {
        setWords("text fields not completed properly");
        setMaybe(true);
        setTimeout(() => setWords(null), 5000);
      }
    } else {
      console.log(user);
    }
  };
  return (
    <Togglable text="new note" text2="cancel">
      <form onSubmit={handleCreation}>
        <div>
          title:
          <input
            name="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
          />
        </div>
        <div>
          author:
          <input
            name="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          />
        </div>
        <div>
          url:
          <input
            name="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
          />
        </div>
        <Button variant="contained" type="submit" placeholder="submit">
          create
        </Button>
      </form>
    </Togglable>
  );
};
export default CreateForm;
