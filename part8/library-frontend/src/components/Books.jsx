import { useEffect, useState } from "react";
import { useQuery, useSubscription, useApolloClient } from "@apollo/client";
import { ALL_BOOKS, GET_GENRES } from "../queries";
import { BOOK_ADDED } from "../mutations";
import { mergeBooks } from "../main";
const Books = (props) => {
  const [filter, setFilter] = useState(null);
  console.log("filter", filter);
  const {
    loading: booksLoading,
    error: booksError,
    data: books,
    refetch,
  } = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  });
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      if (books && books.allBooks) {
        console.log("sd", data);
        const addedBook = data.data.bookAdded;
        console.log("ss", addedBook);
        client.cache.updateQuery({ query: ALL_BOOKS }, (stuff) => {
          const m = books.allBooks;
          console.log(stuff, "stuff");
          window.alert(`book ${addedBook.title} added`);
          return {
            allBooks: mergeBooks(m, addedBook),
          };
        });
      }
      //updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });
  useEffect(() => {
    refetch({ genre: filter });
  }, [filter, refetch]);
  if (booksError) {
    console.log(booksError);
  }
  const genres = useQuery(GET_GENRES);
  if (!props.show) {
    return null;
  }
  if (booksLoading || genres.loading) {
    return <div>loading...</div>;
  }
  console.log("books", books);
  console.log("all books", books);
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.allBooks[0].map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.data.genres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter(null)}>All</button>
    </div>
  );
};

export default Books;
