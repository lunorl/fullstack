import { ALL_AUTHORS } from "../queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_YEAR } from "../mutations";
const Authors = (props) => {
  const [name, setName] = useState("Robert Martin");
  const [born, setBorn] = useState("");
  const [editNumber] = useMutation(EDIT_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const submit = (event) => {
    event.preventDefault();
    editNumber({ variables: { name, setBornTo: Number(born) } });
  };
  let authors = useQuery(ALL_AUTHORS);
  if (!props.show) {
    return null;
  }
  if (authors.loading) {
    return <div>loading...</div>;
  }
  console.log(authors);
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a._id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <select
            value={name}
            name="selectedGuy"
            onChange={({ target }) => setName(target.value)}
          >
            {authors.data.allAuthors.map((author) => (
              <option key={author._id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
