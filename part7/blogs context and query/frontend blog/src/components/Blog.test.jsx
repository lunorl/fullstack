import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { BlogProvider, useBlogContext } from "./BlogContext";
import { UserProvider } from "./UserContext";
import { MaybeProvider } from "./MaybeContext";
import { WordsProvider } from "./WordsContext";
import CreateForm from "./CreateForm";
import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { useUserContext } from "./UserContext";
test("blog display title and author but not likes", async () => {
  const bloge = {
    title: "title",
    author: "author",
    url: "url",
    likes: 23,
    user: "66ddfb045ab9cc420655fdf1",
  };
  render(
    <UserProvider>
      <BlogProvider>
        <Blog bloge={bloge} index={1} />
      </BlogProvider>
    </UserProvider>
  );

  const element = screen.getByText("title", { exact: false });
  const element2 = screen.queryByText("url", { exact: false });

  expect(element).toBeDefined();
  expect(element2).toBeNull();
});
test("blog display everything", async () => {
  const user = userEvent.setup();
  const bloge = {
    title: "title",
    author: "author",
    url: "url",
    likes: 23,
    user: "66ddfb045ab9cc420655fdf1",
  };
  render(
    <UserProvider>
      <BlogProvider>
        <Blog bloge={bloge} index={1} />
      </BlogProvider>
    </UserProvider>
  );

  const input = screen.getByPlaceholderText("see");

  await user.click(input);

  const element = screen.getByText("23", { exact: false });
  const element2 = screen.queryByText("url", { exact: false });
  screen.debug();
  expect(element).toBeDefined();
  expect(element2).toBeDefined();
});
test("blog display everything", async () => {
  const user = userEvent.setup();
  const bloge = {
    title: "title",
    author: "author",
    url: "url",
    likes: 23,
    user: "66ddfb045ab9cc420655fdf1",
  };
  render(
    <UserProvider>
      <BlogProvider>
        <Blog bloge={bloge} index={1} />
      </BlogProvider>
    </UserProvider>
  );

  const input = screen.getByPlaceholderText("see");

  await user.click(input);

  const element = screen.getByText("23", { exact: false });
  const element2 = screen.queryByText("url", { exact: false });
  screen.debug();
  expect(element).toBeDefined();
  expect(element2).toBeDefined();
});
const SetupComponent = ({ initialBlogs }) => {
  console.log("s", initialBlogs);
  const { setBlogs } = useBlogContext();
  useEffect(() => {
    setBlogs([initialBlogs]);
  }, [initialBlogs, setBlogs]);

  return null;
};

test("blog likes", async () => {
  const user = userEvent.setup();
  const click = vi.fn();

  const blog = {
    id: "66e5a30fdb29c8958773acf2",
    title: "title",
    author: "author",
    url: "url",
    likes: 23,
    user: "66ddfb045ab9cc420655fdf1",
  };

  const initialBlogs = [blog];

  render(
    <UserProvider>
      <BlogProvider initialBlogs={initialBlogs}>
        <Blog bloge={blog} click={click} index={0} />
      </BlogProvider>
    </UserProvider>
  );
  const see = screen.getByPlaceholderText("see");
  await user.click(see);
  const likeButton = screen.getByPlaceholderText("liking");
  await user.click(likeButton);
  await user.click(likeButton);

  assert(click.mock.calls.length === 2);
});
test("new blog works", async () => {
  const user = userEvent.setup();
  const mockPost = vi.fn();
  const mockGetAll = vi.fn().mockResolvedValue([]);

  const blogService = { post: mockPost, getAll: mockGetAll };
  render(
    <MaybeProvider>
      <WordsProvider>
        <UserProvider>
          <BlogProvider>
            <CreateForm blogService={blogService} test={true} />
          </BlogProvider>
        </UserProvider>
      </WordsProvider>
    </MaybeProvider>
  );
  const newnote = screen.getByText("new note");
  await user.click(newnote);
  const title = screen.getByPlaceholderText("title");
  const url = screen.getByPlaceholderText("url");
  const author = screen.getByPlaceholderText("author");
  const submit = screen.getByText("create");
  await user.type(title, "title");
  await user.type(author, "author");
  await user.type(url, "url");
  await user.click(submit);

  expect(mockPost).toHaveBeenCalledWith({
    title: "title",
    author: "author",
    url: "url",
    user: expect.any(Object),
  });
});
