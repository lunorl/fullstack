import { useState } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";
import { ALL_BOOKS } from "./queries";
import { BOOK_ADDED } from "./mutations";
export const updateCache = (cache, query, bookAdded) => {
  console.log(cache, query, bookAdded);
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks } = { allBooks: [] }) => {
    const currentBooks = allBooks || [];
    return {
      allBooks: uniqByName(currentBooks.concat(bookAdded)),
    };
  });
};
const App = () => {
  const client = useApolloClient();
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  const item = localStorage.getItem("guy-token");
  if (item && !token) {
    setToken(item);
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        {token ? (
          <button onClick={() => logout()}>logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
